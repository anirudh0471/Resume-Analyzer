import React from 'react';
import { FolderGit2, Cpu, CheckCircle2, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';
import { ProjectAnalysisItem } from '../types';

interface ProjectAnalysisProps {
  projects: ProjectAnalysisItem[];
  onOpenImprovement?: (initialText: string) => void;
}

export const ProjectAnalysis: React.FC<ProjectAnalysisProps> = ({
  projects,
  onOpenImprovement,
}) => {
  const toText = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.bullet || val.improved || val.text || val.tech || val.item || JSON.stringify(val);
    }
    return String(val);
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Portfolio & Technical Depth
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
            {projects?.length || 0} Projects Evaluated
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Project Deep-Dive Analysis</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate whether your projects demonstrate architectural ownership, problem-solving, and measurable business or technical outcomes.
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((proj, idx) => {
            const isStrong = proj.strength === 'Strong';
            const isModerate = proj.strength === 'Moderate';

            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-indigo-200 transition-colors"
              >
                {/* Project Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{proj.name}</h4>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      isStrong
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : isModerate
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {proj.strength || 'Moderate'} Impact Rating
                  </span>
                </div>

                {/* Tech stack pills & What it demonstrates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5">Technologies Identified:</span>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies && proj.technologies.length > 0 ? (
                        proj.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium"
                          >
                            {toText(tech)}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">No specific technologies tagged</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1">What This Demonstrates:</span>
                    <p className="text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                      {toText(proj.demonstrates) || 'Demonstrates applied hands-on execution in problem solving.'}
                    </p>
                  </div>
                </div>

                {/* Missing Measurable Results Note */}
                {proj.missingMeasurableResults && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Missing Measurable Results Guidance:</span>{' '}
                      {toText(proj.missingMeasurableResults)}
                      <p className="mt-1 text-[11px] text-amber-800 font-medium">
                        *Note: We never invent numbers for you. Insert your verified dataset size, speed improvement, or user count.
                      </p>
                    </div>
                  </div>
                )}

                {/* Suggested Improved Bullets */}
                {proj.suggestedBullets && proj.suggestedBullets.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                        Suggested High-Impact Bullet Points (Fact-Preserved)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {proj.suggestedBullets.map((bullet, bIdx) => {
                        const bulletStr = toText(bullet);
                        return (
                          <div
                            key={bIdx}
                            className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs hover:border-indigo-200 transition-colors"
                          >
                            <div className="flex items-start gap-2 flex-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
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
            );
          })}
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
          No distinct project section was extracted from the provided resume text.
        </div>
      )}
    </div>
  );
};
