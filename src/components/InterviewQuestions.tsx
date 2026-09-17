import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Briefcase,
  Code,
  FolderGit2,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { InterviewQuestionItem } from '../types';

const toText = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val.question || val.whyAsked || val.whatToCover || val.text || JSON.stringify(val);
  }
  return String(val);
};

interface InterviewQuestionsProps {
  questions: InterviewQuestionItem[];
}

export const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({ questions }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Resume-Based', value: 'Resume-based' },
    { label: 'Technical', value: 'Technical' },
    { label: 'Project', value: 'Project' },
    { label: 'Behavioral', value: 'Behavioral' },
  ];

  const getCategoryBadge = (category: string) => {
    const norm = String(category || '').toLowerCase();
    if (norm.includes('resume')) {
      return { icon: Briefcase, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    }
    if (norm.includes('tech') || norm.includes('code')) {
      return { icon: Code, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    if (norm.includes('proj')) {
      return { icon: FolderGit2, color: 'text-purple-700 bg-purple-50 border-purple-200' };
    }
    if (norm.includes('behav')) {
      return { icon: Users, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    return { icon: MessageSquare, color: 'text-slate-700 bg-slate-100 border-slate-200' };
  };

  const filteredQuestions =
    activeFilter === 'All'
      ? (questions || [])
      : (questions || []).filter((q) =>
          String(q.category || '').toLowerCase().includes(activeFilter.toLowerCase().replace(/[-_]/g, '')) ||
          String(q.category || '').toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Interview Readiness
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
            {questions?.length || 20} Tailored Questions
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">20 Tailored Interview Questions & Strategies</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Derived from your actual resume and target role. We guide you on what to emphasize without prescribing artificial answers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setActiveFilter(cat.value);
              setExpandedIndex(0);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === cat.value
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Question Accordion List */}
      <div className="space-y-3">
        {filteredQuestions && filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedIndex === idx;
            const badge = getCategoryBadge(q.category);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50/60 hover:bg-slate-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {toText(q.question)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span
                      className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {toText(q.category) || 'General'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 bg-white space-y-4 text-xs">
                    {/* Why recruiter asks this */}
                    <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-blue-900 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">Why the interviewer asks this:</span>
                        <p className="leading-relaxed">{toText(q.whyAsked)}</p>
                      </div>
                    </div>

                    {/* What candidate should cover */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-indigo-950 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block mb-0.5">What you should cover (How to structure your answer):</span>
                        <p className="leading-relaxed">{toText(q.whatToCover)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 italic">No interview questions loaded.</p>
        )}
      </div>
    </div>
  );
};
