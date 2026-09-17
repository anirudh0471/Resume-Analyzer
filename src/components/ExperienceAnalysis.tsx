import React from 'react';
import { Briefcase, CheckCircle2, TrendingUp, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { ExperienceAnalysisItem } from '../types';

interface ExperienceAnalysisProps {
  experience: ExperienceAnalysisItem[];
  onOpenImprovement?: (initialText: string) => void;
}

export const ExperienceAnalysis: React.FC<ExperienceAnalysisProps> = ({
  experience,
  onOpenImprovement,
}) => {
  const toText = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.bullet || val.improved || val.text || val.after || val.item || JSON.stringify(val);
    }
    return String(val);
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Work History & Internships
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
            {experience?.length || 0} Roles Evaluated
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Experience & Impact Analysis</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate past roles, internships, action verbs, and quantifiable results strictly without fabricating metrics.
        </p>
      </div>

      {experience && experience.length > 0 ? (
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-indigo-200 transition-colors"
            >
              {/* Job / Internship Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{exp.role}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {exp.company} {exp.period ? `• ${exp.period}` : ''}
                    </p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                    exp.relevance === 'High'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : exp.relevance === 'Medium'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {exp.relevance || 'Medium'} Relevance to Target Role
                </span>
              </div>

              {/* Action verbs & Technical skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Action Verbs Identified:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {exp.actionVerbs && exp.actionVerbs.length > 0 ? (
                      exp.actionVerbs.map((verb, vIdx) => (
                        <span
                          key={vIdx}
                          className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium"
                        >
                          {toText(verb)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">No strong action verbs tagged</span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    Technical Skills Highlighted:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {exp.technicalSkills && exp.technicalSkills.length > 0 ? (
                      exp.technicalSkills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium"
                        >
                          {toText(sk)}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 italic">No specific technical tools isolated</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantifiable Results Found */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Quantifiable Evidence Found in Resume:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {toText(exp.quantifiableResults) || 'No specific numerical metrics (e.g. % saved, users impacted, dollars generated) detected in this role description.'}
                </p>
              </div>

              {/* Improved Bullet Suggestions */}
              {exp.suggestedBullets && exp.suggestedBullets.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Improved Bullet Suggestions (Preserving True Facts):
                  </span>
                  <div className="space-y-2">
                    {exp.suggestedBullets.map((bullet, bIdx) => {
                      const bulletStr = toText(bullet);
                      return (
                        <div
                          key={bIdx}
                          className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs hover:border-indigo-200 transition-colors"
                        >
                          <div className="flex items-start gap-2 flex-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{bulletStr}</span>
                          </div>

                          {onOpenImprovement && (
                            <button
                              onClick={() => onOpenImprovement(bulletStr)}
                              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 shrink-0 inline-flex items-center gap-1 self-end sm:self-auto"
                            >
                              <span>Refine</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
          No distinct work experience entries detected in resume.
        </div>
      )}
    </div>
  );
};
