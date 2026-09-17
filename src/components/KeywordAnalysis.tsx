import React from 'react';
import { KeyRound, CheckCircle2, AlertCircle, Sparkles, ShieldAlert, FileText } from 'lucide-react';
import { KeywordAnalysisData } from '../types';

interface KeywordAnalysisProps {
  keywords: KeywordAnalysisData;
}

export const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keywords }) => {
  const formatKeywordText = (t: any): string => {
    if (!t) return '';
    if (typeof t === 'string') return t;
    if (typeof t === 'object') {
      return t.term || t.keyword || t.item || t.name || JSON.stringify(t);
    }
    return String(t);
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Search Term Optimization
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
            {keywords.matched?.length || 0} Matched / {keywords.missing?.length || 0} Missing
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Keyword Match & Semantic Analysis</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate keyword alignment between your resume and the target role description to optimize natural recruiter search discovery.
        </p>
      </div>

      {/* Ethical Guidance Banner */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Anti-Keyword Stuffing Policy:</span> Modern Applicant Tracking Systems and hiring managers heavily penalize unnatural keyword repetition, invisible font hacks, and generic lists. Always integrate keywords naturally inside accomplishment bullets describing actual work.
        </div>
      </div>

      {/* Grid: Matched & Missing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-900">Matched Target Keywords</h4>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
              {keywords.matched?.length || 0} Found
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Key search terms and technical descriptors verified in your resume.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.matched && keywords.matched.length > 0 ? (
              keywords.matched.map((term, tIdx) => {
                const label = formatKeywordText(term);
                return (
                  <span
                    key={tIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200 shadow-2xs font-medium inline-flex items-center gap-1"
                  >
                    <KeyRound className="w-3 h-3 text-emerald-600" />
                    {label}
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">No matched keywords detected.</span>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <h4 className="text-sm font-bold text-slate-900">Missing High-Value Keywords</h4>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-200">
              {keywords.missing?.length || 0} Missing
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Frequent keywords in target role requirements absent from your resume.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.missing && keywords.missing.length > 0 ? (
              keywords.missing.map((term, tIdx) => {
                const label = formatKeywordText(term);
                return (
                  <span
                    key={tIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white text-rose-800 border border-rose-200 shadow-2xs font-medium inline-flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {label}
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">Great job! All primary target keywords found.</span>
            )}
          </div>
        </div>
      </div>

      {/* Frequently occurring job terms & natural phrases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Frequently Occurring Terms */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-slate-600" />
            <h4 className="text-sm font-bold text-slate-900">Frequently Occurring Role Terms</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Core concepts appearing prominently across the target job requirements.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {keywords.importantTerms && keywords.importantTerms.length > 0 ? (
              keywords.importantTerms.map((phrase, pIdx) => {
                const label = formatKeywordText(phrase);
                return (
                  <span
                    key={pIdx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 font-medium"
                  >
                    {label}
                  </span>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">None extracted.</span>
            )}
          </div>
        </div>

        {/* Natural Incorporation Phrases */}
        <div className="p-5 rounded-xl bg-indigo-50/40 border border-indigo-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">Natural Phrasing Suggestions</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            How to seamlessly weave keywords into active achievement statements.
          </p>
          <div className="space-y-2">
            {keywords.naturalPhrases && keywords.naturalPhrases.length > 0 ? (
              keywords.naturalPhrases.map((phrase, idx) => {
                const phraseText = formatKeywordText(phrase);
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white text-xs text-slate-800 border border-indigo-100 flex items-start gap-2 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span className="italic">"{phraseText}"</span>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">None generated.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
