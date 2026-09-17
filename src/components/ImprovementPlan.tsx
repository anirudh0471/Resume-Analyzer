import React from 'react';
import { Rocket, AlertCircle, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImprovementPriority } from '../types';

const toText = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val.problem || val.action || val.recommendedAction || val.whyItMatters || val.text || val.item || JSON.stringify(val);
  }
  return String(val);
};

interface ImprovementPlanProps {
  improvements: ImprovementPriority[];
  onOpenImprovementWorkbench?: () => void;
}

export const ImprovementPlan: React.FC<ImprovementPlanProps> = ({
  improvements,
  onOpenImprovementWorkbench,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Strategic Roadmap
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
              Top 5 Action Priorities
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">High-Leverage Improvement Plan</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Prioritized by estimated impact on recruiter screening pass rates and ATS qualification.
          </p>
        </div>

        {onOpenImprovementWorkbench && (
          <button
            onClick={onOpenImprovementWorkbench}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-colors self-start sm:self-auto"
          >
            <span>Launch Bullet Rewriter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Priority Cards */}
      <div className="space-y-4">
        {improvements && improvements.length > 0 ? (
          improvements.map((imp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all space-y-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {imp.priority || idx + 1}
                </div>

                <div className="flex-1 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {toText(imp.problem)}
                  </h4>

                  {/* Why it matters */}
                  <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Why this matters to recruiters:</span>{' '}
                      {toText(imp.whyItMatters)}
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Recommended Action:</span>{' '}
                      {toText(imp.recommendedAction)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-400 italic">No specific improvement plan available.</p>
        )}
      </div>
    </div>
  );
};
