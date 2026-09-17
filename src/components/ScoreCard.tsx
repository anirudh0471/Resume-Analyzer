import React, { useState } from 'react';
import {
  HelpCircle,
  TrendingUp,
  Target,
  FileCheck,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';
import { ScoreBreakdownModal } from './ScoreBreakdownModal';

interface ScoreCardProps {
  result: ResumeAnalysisResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result }) => {
  const [showModal, setShowModal] = useState(false);
  const { overallScore, scoreBreakdown, targetRole } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { ring: 'text-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Strong Fit' };
    if (score >= 65) return { ring: 'text-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'Good Potential' };
    if (score >= 50) return { ring: 'text-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Needs Optimization' };
    return { ring: 'text-rose-500', bg: 'bg-rose-50', text: 'text-rose-700', label: 'Significant Gaps' };
  };

  const status = getScoreColor(overallScore);

  const categories = [
    {
      label: 'Keyword Match',
      score: scoreBreakdown.keywordAlignment?.score ?? 0,
      max: 25,
      icon: Target,
      color: 'bg-indigo-500',
    },
    {
      label: 'Skills Match',
      score: scoreBreakdown.skillsMatch?.score ?? 0,
      max: 25,
      icon: Layers,
      color: 'bg-blue-500',
    },
    {
      label: 'Experience Relevance',
      score: scoreBreakdown.experienceRelevance?.score ?? 0,
      max: 15,
      icon: Briefcase,
      color: 'bg-sky-500',
    },
    {
      label: 'Project Relevance',
      score: scoreBreakdown.projectRelevance?.score ?? 0,
      max: 10,
      icon: FileCheck,
      color: 'bg-emerald-500',
    },
    {
      label: 'Resume Structure',
      score: scoreBreakdown.structure?.score ?? 0,
      max: 10,
      icon: TrendingUp,
      color: 'bg-violet-500',
    },
    {
      label: 'Achievement Evidence',
      score: scoreBreakdown.achievements?.score ?? 0,
      max: 10,
      icon: Award,
      color: 'bg-amber-500',
    },
    {
      label: 'Education Relevance',
      score: scoreBreakdown.educationCertification?.score ?? 0,
      max: 5,
      icon: BookOpen,
      color: 'bg-pink-500',
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-6">
            {/* Circular score dial */}
            <button
              onClick={() => setShowModal(true)}
              className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 transition-all group focus:outline-none"
              title="Click to view full scoring rubric breakdown"
            >
              <div className="text-center">
                <span className="block text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {overallScore}
                </span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  / 100
                </span>
              </div>
              <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-700 shadow-2xs">
                {status.label}
              </div>
            </button>

            {/* Score Title & Context */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  ATS-Style Compatibility
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                  title="View rubric explanation"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Overall Compatibility Score
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
                AI-generated compatibility estimate calculated transparently across 7 standard hiring dimensions.
              </p>
            </div>
          </div>

          {/* Rubric Breakdown Trigger Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="view-rubric-breakdown-btn"
              onClick={() => setShowModal(true)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
            >
              <span>View Full Rubric Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7 Category Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {categories.map((cat) => {
            const pct = Math.round((cat.score / cat.max) * 100);
            const Icon = cat.icon;

            return (
              <div
                key={cat.label}
                onClick={() => setShowModal(true)}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {cat.score}
                    <span className="text-slate-400 font-normal text-[10px]">/{cat.max}</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ScoreBreakdownModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        overallScore={overallScore}
        breakdown={scoreBreakdown}
        targetRole={targetRole}
      />
    </>
  );
};
