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
    if (score >= 80) return { stroke: '#059669', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700', label: 'Strong Fit' };
    if (score >= 65) return { stroke: '#2563eb', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700', label: 'Good Potential' };
    if (score >= 50) return { stroke: '#d97706', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', label: 'Needs Optimization' };
    return { stroke: '#e11d48', badgeBg: 'bg-rose-50', badgeText: 'text-rose-700', label: 'Significant Gaps' };
  };

  const status = getScoreColor(overallScore);

  // SVG circular gauge math
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, overallScore)) / 100) * circumference;

  const categories = [
    {
      label: 'Keyword Alignment',
      score: scoreBreakdown.keywordAlignment?.score ?? 0,
      max: 25,
      icon: Target,
      color: 'bg-slate-900',
    },
    {
      label: 'Skills Match',
      score: scoreBreakdown.skillsMatch?.score ?? 0,
      max: 25,
      icon: Layers,
      color: 'bg-indigo-600',
    },
    {
      label: 'Experience Relevance',
      score: scoreBreakdown.experienceRelevance?.score ?? 0,
      max: 15,
      icon: Briefcase,
      color: 'bg-slate-700',
    },
    {
      label: 'Project Relevance',
      score: scoreBreakdown.projectRelevance?.score ?? 0,
      max: 10,
      icon: FileCheck,
      color: 'bg-emerald-600',
    },
    {
      label: 'Resume Structure',
      score: scoreBreakdown.structure?.score ?? 0,
      max: 10,
      icon: TrendingUp,
      color: 'bg-slate-800',
    },
    {
      label: 'Achievement Evidence',
      score: scoreBreakdown.achievements?.score ?? 0,
      max: 10,
      icon: Award,
      color: 'bg-amber-600',
    },
    {
      label: 'Education & Certs',
      score: scoreBreakdown.educationCertification?.score ?? 0,
      max: 5,
      icon: BookOpen,
      color: 'bg-slate-600',
    },
  ];

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-6">
            {/* Radial score gauge dial */}
            <button
              onClick={() => setShowModal(true)}
              className="relative w-28 h-28 shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-400 transition-all group focus:outline-none"
              title="Click to view full scoring rubric breakdown"
            >
              <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 108 108">
                <circle
                  cx="54"
                  cy="54"
                  r={radius}
                  className="stroke-slate-200"
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="54"
                  cy="54"
                  r={radius}
                  stroke={status.stroke}
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="block text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {overallScore}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  /100
                </span>
              </div>

              <div className={`absolute -bottom-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-slate-200 shadow-2xs ${status.badgeBg} ${status.badgeText}`}>
                {status.label}
              </div>
            </button>

            {/* Score Title & Context */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  ATS Compatibility Index
                </span>
                <button
                  onClick={() => setShowModal(true)}
                  className="text-slate-400 hover:text-slate-700 transition-colors"
                  title="View rubric explanation"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Overall Compatibility Score
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
                Empirically calibrated across 7 critical hiring dimensions with zero simulated data.
              </p>
            </div>
          </div>

          {/* Rubric Breakdown Trigger Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="view-rubric-breakdown-btn"
              onClick={() => setShowModal(true)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
            >
              <span>View Full Rubric Breakdown</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 7 Category Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 mt-6">
          {categories.map((cat) => {
            const pct = Math.round((cat.score / cat.max) * 100);
            const Icon = cat.icon;

            return (
              <div
                key={cat.label}
                onClick={() => setShowModal(true)}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-slate-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-slate-900 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {cat.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">
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
