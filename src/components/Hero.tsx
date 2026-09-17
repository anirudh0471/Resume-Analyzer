import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileSearch,
  Target,
  MessageSquare,
  Upload,
  Cpu,
  TrendingUp,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
} from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
  onTryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onTryDemo }) => {
  const rubricWeights = [
    { label: 'Keyword Alignment', weight: '25%', desc: 'Exact & semantic phrase match' },
    { label: 'Skills Coverage', weight: '25%', desc: 'Required technical & domain tools' },
    { label: 'Experience Alignment', weight: '15%', desc: 'Role duties & scope relevance' },
    { label: 'Project Depth', weight: '10%', desc: 'Complexity & architectural impact' },
    { label: 'Structural Hygiene', weight: '10%', desc: 'Formatting, headers & bullet density' },
    { label: 'Measurable Impact', weight: '10%', desc: 'Quantified metrics & business results' },
    { label: 'Education & Certs', weight: '5%', desc: 'Accreditation & relevant coursework' },
  ];

  return (
    <div className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification & System Architecture Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-slate-800">NLP Evaluation Engine</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-mono">Gemini 3.8 Flash</span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
            Zero Hallucination Policy
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] max-w-4xl mx-auto">
          Evidence-Based Resume Analysis & Career Intelligence
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Evaluate technical resumes against targeted job descriptions using strict 7-dimensional rubric evaluation, keyword frequency analysis, and actionable bullet optimization.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-analyze-btn"
            onClick={onStartAnalysis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-try-demo-btn"
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Load Sample (Junior Data Analyst)</span>
          </button>
        </div>

        {/* Engineering Guarantees */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            PDF, DOCX & Plain Text Parser
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Strict Factual Fidelity
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Deterministic 100-pt Weighted Rubric
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Ephemeral In-Memory Processing
          </span>
        </div>
      </div>

      {/* Technical Architecture & 7-Dimension Rubric Model */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Scoring Model Specification
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Transparent 7-Factor Rubric Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md md:text-right">
              Unlike blackbox score generators, our pipeline calculates candidate fit using a calibrated 100-point multi-attribute distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
            {rubricWeights.map((rw) => (
              <div
                key={rw.label}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{rw.label}</span>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {rw.weight}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">{rw.desc}</p>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Cumulative Total
                </span>
                <span className="text-2xl font-extrabold text-white">100 Points</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                Normalized score with verified evidence mapping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Resume Forensic Audit */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
              <FileSearch className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Section-by-Section Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Detailed breakdown of Summary, Experience, Projects, and Education. Flags weak passive phrasing and identifies missed opportunities to highlight impact.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>14-Point Quality Inspection</span>
              <span className="text-emerald-700 font-semibold">Pass / Warn</span>
            </div>
          </div>

          {/* Card 2: Semantic Alignment */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
              <Target className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Job Match & Skill Coverage</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Extracts required skills from job postings and maps them to verified resume bullet points. Highlights missing prerequisites and natural integration strategies.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>9-Category Skill Taxonomy</span>
              <span className="text-indigo-700 font-semibold">Matched vs Missing</span>
            </div>
          </div>

          {/* Card 3: Interview Question Generator */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Technical Interview Prep</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Generates 20 tailored interview questions derived specifically from your resume's claimed technical stacks and project experiences with recruiter evaluation criteria.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>20 Tailored Prompts</span>
              <span className="text-slate-800 font-semibold">STAR Framework</span>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Pipeline Steps */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-slate-200/80">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            System Workflow
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
            End-to-End Analysis Pipeline
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
            From binary document ingestion to verified evidence extraction in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              01
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Document Ingestion</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Text extraction from PDF, DOCX, or direct string input with layout hygiene sanitization.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              02
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Role Alignment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tokenization of requirements, technical taxonomy parsing, and domain categorization.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              03
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Rubric Evaluation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Execution of 7-dimension scoring logic and 14-point structural verification checks.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-3">
              04
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Actionable Output</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generates prioritized bullet rewrites, STAR interview answers, and exportable PDF report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
