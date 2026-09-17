import express, { Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import mammoth from 'mammoth';
// @ts-ignore
import * as pdfParseModule from 'pdf-parse';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { DEMO_ANALYSIS_RESULT } from './src/data/demoData';

dotenv.config();

const app = express();
const PORT = 3000;

// Configure body parser for JSON requests (up to 15mb for text/data)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Multer memory storage (never permanently persists uploaded resumes to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'application/octet-stream',
    ];

    if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF or DOCX file.'));
    }
  },
});

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured. Please add it to Settings > Secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper: Extract text from file buffer
async function extractTextFromFile(file: Express.Multer.File): Promise<string> {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === '.pdf' || file.mimetype === 'application/pdf') {
    try {
      const PDFParser = (pdfParseModule as any).PDFParse || (pdfParseModule as any).default?.PDFParse;
      if (PDFParser) {
        const parser = new PDFParser({ data: file.buffer });
        try {
          const res = await parser.getText();
          if (res?.text && res.text.trim().length > 0) {
            return res.text;
          }
        } finally {
          await parser.destroy();
        }
      } else if (typeof (pdfParseModule as any).default === 'function') {
        const parsed = await (pdfParseModule as any).default(file.buffer);
        if (parsed?.text && parsed.text.trim().length > 0) {
          return parsed.text;
        }
      } else if (typeof pdfParseModule === 'function') {
        const parsed = await (pdfParseModule as any)(file.buffer);
        if (parsed?.text && parsed.text.trim().length > 0) {
          return parsed.text;
        }
      }
    } catch (err: any) {
      console.warn('pdf-parse error, attempting raw string fallback extraction:', err.message);
    }

    // Fallback: extract ascii/utf8 strings from buffer
    const raw = file.buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    if (raw.trim().length > 50) {
      return raw;
    }
    throw new Error('Could not parse text from this PDF file. Please ensure it is not password-protected or paste the text directly into the text tab.');
  }

  if (
    ext === '.docx' ||
    ext === '.doc' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'application/msword'
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      if (result.value && result.value.trim().length > 0) {
        return result.value;
      }
    } catch (err: any) {
      console.error('mammoth docx extraction error:', err.message);
      throw new Error('Could not extract text from this DOCX document. Please ensure it is not corrupted.');
    }
  }

  // Plain text
  return file.buffer.toString('utf-8');
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// Resume analysis prompt builder
function buildAnalysisPrompt(resumeText: string, targetRole: string, jobDescription?: string, companyName?: string): string {
  return `You are a world-class, objective, evidence-based AI Resume Analyst and Career Coach.
Analyze the following candidate resume and target role information.

CRITICAL INSTRUCTIONS & ETHICAL BOUNDARIES:
1. Do NOT invent or fabricate candidate information, metrics, accomplishments, numbers, percentages, users, revenue, or dates.
2. Only analyze information actually present in the resume and job description.
3. Clearly distinguish between information found in the resume and AI-generated suggestions.
4. Calculate an "ATS-style compatibility score" out of 100 using this EXACT rubric:
   - keywordAlignment: max 25 points (match of relevant keywords from job description/role)
   - skillsMatch: max 25 points (presence of required & preferred technical and soft skills)
   - experienceRelevance: max 15 points (alignment of past roles, internships, or duties with the target role)
   - projectRelevance: max 10 points (alignment and depth of technical/academic projects)
   - structure: max 10 points (readability, logical reverse-chronology, scannability, clear section demarcations)
   - achievements: max 10 points (evidence of results, impact, metrics, action verbs; penalize lack of evidence)
   - educationCertification: max 5 points (relevance of degree, coursework, or verified certifications)
   Total overall score MUST equal the sum of these 7 category scores.
5. Do NOT recommend keyword stuffing under any circumstances. Emphasize natural, context-rich integration.
6. In Project & Experience analyses: If measurable metrics are missing, DO NOT invent fake metrics. Explicitly suggest WHERE and HOW the candidate could add their own real metrics (e.g. "[insert percentage or user count]").
7. Categorize all skills found into these 9 categories:
   - Programming
   - Data/Analytics
   - Machine Learning
   - AI
   - Frameworks/Libraries
   - Databases
   - Cloud/DevOps
   - Tools
   - Soft Skills
8. Generate 20 insightful interview preparation questions:
   - 5 resume-based questions
   - 5 technical questions based on the target role
   - 5 project questions
   - 5 behavioral questions
   For each question provide: question, whyAsked, whatToCover. Do NOT generate fake candidate answers.
9. Provide quality checks on:
   - missing professional summary
   - missing contact information
   - missing LinkedIn
   - missing GitHub/portfolio where relevant
   - long paragraphs
   - weak action verbs
   - repeated words
   - unclear project descriptions
   - lack of measurable achievements
   - inconsistent formatting
   - excessive sections
   - irrelevant information
   - spelling/grammar issues
   - potentially outdated information
10. Top 5 improvement priorities: Problem, Why it matters, Recommended action.

Target Role: ${targetRole || 'Not specified (infer most appropriate title from resume)'}
Company Name: ${companyName || 'Not specified'}
Target Job Description:
${jobDescription ? jobDescription.trim() : 'No specific job description provided. Evaluate against industry standard expectations for the target role.'}

CANDIDATE RESUME TEXT:
"""
${resumeText}
"""

Return valid JSON adhering strictly to the required schema. Ensure all fields are filled with precise, thoughtful analysis.`;
}

// API: Analyze Resume
app.post('/api/analyze-resume', upload.single('resumeFile'), async (req: Request, res: Response) => {
  try {
    let resumeText = '';
    let fileName = 'Uploaded_Resume.pdf';

    if (req.file) {
      fileName = req.file.originalname;
      resumeText = await extractTextFromFile(req.file);
    } else if (req.body.resumeText && typeof req.body.resumeText === 'string') {
      resumeText = req.body.resumeText.trim();
      fileName = req.body.fileName || 'Pasted_Resume.txt';
    }

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        error: 'The uploaded resume appears to be empty or contains insufficient text. Please ensure the document contains readable text.',
      });
    }

    const targetRole = (req.body.targetRole || '').trim() || 'Software Engineer / Professional';
    const jobDescription = (req.body.jobDescription || '').trim();
    const companyName = (req.body.companyName || '').trim();

    // Check if Gemini API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Returning demo analysis result with candidate notice.');
      // Return demo data with banner explanation so preview works seamlessly
      const fallbackResult = {
        ...DEMO_ANALYSIS_RESULT,
        targetRole: targetRole || DEMO_ANALYSIS_RESULT.targetRole,
        companyName: companyName || DEMO_ANALYSIS_RESULT.companyName,
        resumeFileName: fileName,
        isDemo: true,
        notice: 'Note: GEMINI_API_KEY was not configured in environment, so a demonstration analysis report is presented. To run live AI analysis on your custom resume, set your key in Settings > Secrets.',
      };
      return res.json(fallbackResult);
    }

    const ai = getGeminiClient();
    const prompt = buildAnalysisPrompt(resumeText, targetRole, jobDescription, companyName);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a rigorous, truthful, and helpful AI Resume Analyzer. You return structured JSON with transparent scoring according to the exact rubric. Never invent candidate data. Always preserve truthfulness.',
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for factual precision and rubric consistency
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini API.');
    }

    let parsedResult: any;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseErr: any) {
      console.error('Failed to parse Gemini JSON response:', responseText.slice(0, 500));
      throw new Error('Could not parse structured analysis from AI response. Please try again.');
    }

    // Ensure score calculations match rubric
    if (parsedResult.scoreBreakdown) {
      const breakdown = parsedResult.scoreBreakdown;
      const calculatedSum =
        (breakdown.keywordAlignment?.score || 0) +
        (breakdown.skillsMatch?.score || 0) +
        (breakdown.experienceRelevance?.score || 0) +
        (breakdown.projectRelevance?.score || 0) +
        (breakdown.structure?.score || 0) +
        (breakdown.achievements?.score || 0) +
        (breakdown.educationCertification?.score || 0);

      parsedResult.overallScore = Math.min(100, Math.max(0, Math.round(calculatedSum)));
    }

    parsedResult.targetRole = targetRole;
    parsedResult.companyName = companyName;
    parsedResult.resumeFileName = fileName;
    parsedResult.analyzedAt = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    parsedResult.isDemo = false;

    return res.json(parsedResult);
  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred while analyzing the resume.',
    });
  }
});

// API: Improve Resume Bullet or Section
app.post('/api/improve-bullet', async (req: Request, res: Response) => {
  try {
    const { bulletText, sectionType, targetRole, context } = req.body;

    if (!bulletText || typeof bulletText !== 'string' || bulletText.trim().length === 0) {
      return res.status(400).json({ error: 'Original text is required for improvement.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        original: bulletText,
        improved: `Engineered and executed ${bulletText.replace(/^[•\-\*\s]+/, '')} utilizing industry-standard practices to enhance operational efficiency [insert quantifiable outcome e.g. 20% latency reduction].`,
        whyBetter: 'Starts with an active verb, eliminates passive filler words, and highlights where to place a measurable metric.',
        metricPlaceholderNote: 'Original text contained no metrics. Insert your actual verified performance number in the bracketed area.',
      });
    }

    const ai = getGeminiClient();
    const prompt = `You are an expert resume editor and career writer.
Rewrite the following resume entry (${sectionType || 'Experience bullet'} for a target role of "${targetRole || 'Professional'}"):

Original:
"${bulletText}"

Additional Context (if any):
"${context || 'None provided'}"

CRITICAL RULES:
1. Never invent fake metrics, numbers, percentages, team sizes, dollar amounts, or claims not present in the original.
2. Preserve the factual foundation of what the user actually did.
3. Start with a strong action verb (e.g., "Architected", "Spearheaded", "Analyzed", "Streamlined", "Engineered").
4. Make the language punchy, active, and concise.
5. If the original lacks quantifiable impact, insert an explicit bracketed placeholder (e.g. "[insert percentage or time saved]") indicating exactly what real metric the candidate should fill in.
6. Explain specifically why your revised version is more compelling to hiring managers.

Return JSON with:
{
  "original": string,
  "improved": string,
  "whyBetter": string,
  "metricPlaceholderNote": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error improving bullet:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate improvement suggestion.',
    });
  }
});

// Vite Integration & Static Fallback
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ResumeAI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
