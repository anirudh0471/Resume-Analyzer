import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, FileSearch, Target, MessageSquare, Upload, Cpu, TrendingUp } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
  onTryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onTryDemo }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/70 via-blue-50/40 to-transparent pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification / Security Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">Powered by Gemini 3.8 Flash</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-medium">Server-Side & Evidence-Based</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Turn Your Resume Into a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">
            Stronger Job Application
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload your resume, add a job description, and get AI-powered insights on skills, keywords, projects, experience, and improvement opportunities.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="hero-analyze-btn"
            onClick={onStartAnalysis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-try-demo-btn"
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all hover:border-slate-400"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Try Demo (Data Analyst)</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            PDF & DOCX Support
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Zero Invented Metrics
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Transparent 100-pt ATS Rubric
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            In-Memory Processing Only
          </span>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Comprehensive Evaluation</h2>
          <p className="mt-1 text-2xl font-bold text-slate-900">Engineered for Students, Fresh Grads & Job Seekers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Resume Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Resume Analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Forensic inspection of your summary, education, experience, projects, and contact info. Evaluates structural readability and measurable outcome evidence.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Evidence-based action verb review
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                14-point quality inspection
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Project and experience breakdown
              </li>
            </ul>
          </div>

          {/* Card 2: Job Match */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Job Match</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Compare your resume against your target job description. Detect exact matched keywords, critical skill omissions, and natural incorporation strategies.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                9-category skill taxonomy
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Zero keyword-stuffing guidance
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                ATS-style compatibility scoring
              </li>
            </ul>
          </div>

          {/* Card 3: Interview Preparation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Interview Preparation</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Generate 20 tailored interview questions derived specifically from your resume bullets and role requirements, complete with recruiter rationales.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                5 resume-based deep dives
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                5 technical & 5 project questions
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                5 role-relevant behavioral questions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-slate-200/80">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Simple 4-Step Process</h2>
          <p className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">How ResumeAI Works</p>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
            From raw document to an actionable, evidence-based optimization plan in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3">
              1
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Upload className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Upload Resume</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag and drop your PDF or DOCX resume. All file text is parsed in memory safely without permanent disk storage.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3">
              2
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Add Target Job</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specify your target role and paste the job posting to enable precise keyword alignment and skill matching.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3">
              3
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Analyze with Gemini</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini evaluates your resume against our transparent 100-point rubric with strict factual fidelity.
            </p>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/80 relative">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3">
              4
            </div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-slate-900 text-sm">Improve Resume</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Review top improvement priorities, rewrite weak bullets, practice interview questions, and download the report.
            </p>
          </div>
        </div>
      </div>

      {/* About & Trust / Ethics Section */}
      <div id="about" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-slate-200/80">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">About ResumeAI's Evidence-Based Standard</h3>
              <p className="text-xs text-slate-500">Ethical AI practices for genuine career advancement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">✓ No Invented Metrics</span>
              We will never hallucinate fake user numbers, percentages, team sizes, or accomplishments. When metrics are missing, we guide you on where to insert your verified data.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">✓ ATS-Style Compatibility Estimate</span>
              We calculate a transparent 100-point compatibility score based on our defined rubric, clearly distinguishing it as an AI estimate rather than a company's internal ATS algorithm.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">✓ Strict Server-Side Security</span>
              All Gemini intelligence operations run on a secure Node.js backend. Your API credentials never touch browser bundles.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">✓ Privacy-First Architecture</span>
              Uploaded documents are read in memory for analysis and are not permanently stored in a database without your explicit consent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
