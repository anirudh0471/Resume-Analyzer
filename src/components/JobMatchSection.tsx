import React from 'react';
import { Target, CheckCircle2, AlertTriangle, HelpCircle, Sparkles, Building, ArrowRight } from 'lucide-react';
import { JobMatchData } from '../types';

interface JobMatchSectionProps {
  jobMatch: JobMatchData;
  targetRole: string;
  companyName?: string;
}

export const JobMatchSection: React.FC<JobMatchSectionProps> = ({
  jobMatch,
  targetRole,
  companyName,
}) => {
  const matchPct = jobMatch?.percentage ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Role Specification Match
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
              {targetRole} {companyName ? `@ ${companyName}` : ''}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Job Requirements Alignment</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct comparison between candidate qualifications and explicit job posting criteria.
          </p>
        </div>

        {/* Big percentage pill */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-50 border border-slate-200 p-3 rounded-xl">
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Match Fit
            </span>
            <span className="text-2xl font-black text-indigo-600">
              {matchPct}%
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tri-column breakdown: Matched, Partially Matched, Missing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Matched Requirements */}
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fully Matched ({jobMatch.matched?.length || 0})</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">Criteria clearly fulfilled in resume text.</p>
          <div className="space-y-1.5">
            {jobMatch.matched && jobMatch.matched.length > 0 ? (
              jobMatch.matched.map((item, idx) => {
                const title = typeof item === 'object' && item !== null ? (item.item || '') : String(item || '');
                const reason = typeof item === 'object' && item !== null ? (item.reason || '') : '';

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white border border-emerald-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div className="leading-relaxed flex-1 space-y-0.5">
                      <span className="font-semibold text-slate-900 block">{title}</span>
                      {reason && <p className="text-[11px] text-slate-500 font-normal">{reason}</p>}
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">None tagged.</span>
            )}
          </div>
        </div>

        {/* Partially Matched Requirements */}
        <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Partially Matched ({jobMatch.partiallyMatched?.length || 0})</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">Related knowledge hinted but lacking explicit evidence.</p>
          <div className="space-y-1.5">
            {jobMatch.partiallyMatched && jobMatch.partiallyMatched.length > 0 ? (
              jobMatch.partiallyMatched.map((item, idx) => {
                const title = typeof item === 'object' && item !== null ? (item.item || '') : String(item || '');
                const reason = typeof item === 'object' && item !== null ? (item.reason || '') : '';

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white border border-amber-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div className="leading-relaxed flex-1 space-y-0.5">
                      <span className="font-semibold text-slate-900 block">{title}</span>
                      {reason && <p className="text-[11px] text-slate-500 font-normal">{reason}</p>}
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">None tagged.</span>
            )}
          </div>
        </div>

        {/* Missing Requirements */}
        <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Missing Criteria ({jobMatch.missing?.length || 0})</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">Required qualifications absent from resume.</p>
          <div className="space-y-1.5">
            {jobMatch.missing && jobMatch.missing.length > 0 ? (
              jobMatch.missing.map((item, idx) => {
                const title = typeof item === 'object' && item !== null ? (item.item || '') : String(item || '');
                const reason = typeof item === 'object' && item !== null ? (item.reason || '') : '';

                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white border border-rose-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <div className="leading-relaxed flex-1 space-y-0.5">
                      <span className="font-semibold text-slate-900 block">{title}</span>
                      {reason && <p className="text-[11px] text-slate-500 font-normal">{reason}</p>}
                    </div>
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-slate-400 italic">No major missing requirements!</span>
            )}
          </div>
        </div>
      </div>

      {/* Alignment Recommendations */}
      {jobMatch.recommendations && jobMatch.recommendations.length > 0 && (
        <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Recommendations for Aligning With This Role
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {jobMatch.recommendations.map((rec, rIdx) => {
              const recText =
                typeof rec === 'object' && rec !== null
                  ? ((rec as any).item || (rec as any).recommendation || (rec as any).action || (rec as any).reason || JSON.stringify(rec))
                  : String(rec || '');

              return (
                <li key={rIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{recText}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
