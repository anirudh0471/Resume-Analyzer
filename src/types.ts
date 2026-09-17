export interface CandidateInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary?: string;
  education?: string[];
  certifications?: string[];
}

export interface ScoreCategory {
  score: number;
  max: number;
  explanation: string;
}

export interface ScoreBreakdown {
  keywordAlignment: ScoreCategory;
  skillsMatch: ScoreCategory;
  experienceRelevance: ScoreCategory;
  projectRelevance: ScoreCategory;
  structure: ScoreCategory;
  achievements: ScoreCategory;
  educationCertification: ScoreCategory;
}

export interface SkillsAnalysisData {
  found: string[];
  matched: string[];
  missing: string[];
  valuable: string[];
  jobDescriptionSkillsNotFound: string[];
  categories: Record<string, string[]>;
}

export interface KeywordAnalysisData {
  matched: string[];
  missing: string[];
  importantTerms: string[];
  naturalPhrases: string[];
}

export interface SectionAnalysisItem {
  name: string;
  status: 'Good' | 'Needs Work' | 'Missing';
  strengths: string[];
  issues: string[];
  suggestions: string[];
}

export interface ProjectAnalysisItem {
  name: string;
  technologies: string[];
  demonstrates: string;
  strength: 'Strong' | 'Moderate' | 'Needs Improvement';
  missingMeasurableResults: string;
  suggestedBullets: string[];
}

export interface ExperienceAnalysisItem {
  role: string;
  company: string;
  period?: string;
  relevance: 'High' | 'Medium' | 'Low';
  actionVerbs: string[];
  technicalSkills: string[];
  achievements: string[];
  quantifiableResults: string;
  suggestedBullets: string[];
}

export interface QualityCheckItem {
  id: string;
  title: string;
  status: 'passed' | 'warning' | 'failed';
  detail: string;
}

export interface ImprovementPriority {
  priority: number;
  problem: string;
  whyItMatters: string;
  recommendedAction: string;
}

export interface JobMatchItem {
  item: string;
  reason: string;
}

export interface JobMatchData {
  percentage: number;
  matched: (string | JobMatchItem)[];
  partiallyMatched: (string | JobMatchItem)[];
  missing: (string | JobMatchItem)[];
  recommendations?: string[];
}

export interface InterviewQuestionItem {
  category: 'Resume-Based' | 'Technical' | 'Project' | 'Behavioral' | string;
  question: string;
  whyAsked: string;
  whatToCover: string;
}

export interface ResumeAnalysisResult {
  candidate?: CandidateInfo;
  candidateName?: string;
  targetRole: string;
  companyName?: string;
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  skills: SkillsAnalysisData;
  keywords: KeywordAnalysisData;
  sections?: SectionAnalysisItem[];
  sectionAnalysis?: SectionAnalysisItem[];
  projects?: ProjectAnalysisItem[];
  projectAnalysis?: ProjectAnalysisItem[];
  experience?: ExperienceAnalysisItem[];
  experienceAnalysis?: ExperienceAnalysisItem[];
  qualityChecks?: QualityCheckItem[];
  strengths?: string[];
  weaknesses?: string[];
  improvements?: ImprovementPriority[];
  improvementPriorities?: ImprovementPriority[];
  jobMatch?: JobMatchData;
  interviewQuestions: InterviewQuestionItem[];
  analyzedAt: string;
  isDemo?: boolean;
  resumeFileName?: string;
  fileName?: string;
  rawResumeTextSnippet?: string;
}

export interface StoredAnalysisSummary {
  id: string;
  date: string;
  targetRole: string;
  companyName?: string;
  overallScore: number;
  candidateName: string;
  fileName: string;
}

export interface AnalysisHistoryItem {
  id: string;
  date: string;
  resumeFileName: string;
  targetRole: string;
  companyName?: string;
  score: number;
  result: ResumeAnalysisResult;
}

export interface BulletImprovementRequest {
  bulletText: string;
  sectionType: 'Summary' | 'Experience' | 'Projects' | 'Skills';
  targetRole?: string;
  context?: string;
}

export interface BulletImprovementResponse {
  original: string;
  improved: string;
  whyBetter: string;
  metricPlaceholderNote?: string;
}
