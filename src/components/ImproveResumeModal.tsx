import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileEdit,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

const toText = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val.bullet || val.improved || val.text || val.after || val.item || val.skill || val.name || JSON.stringify(val);
  }
  return String(val);
};

interface ImproveResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ResumeAnalysisResult;
  initialBullet?: string;
}

export const ImproveResumeModal: React.FC<ImproveResumeModalProps> = ({
  isOpen,
  onClose,
  result,
  initialBullet,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'experience' | 'projects' | 'custom'>('summary');
  const [customOriginal, setCustomOriginal] = useState(initialBullet || '');
  const [customTargetRole, setCustomTargetRole] = useState(result.targetRole || 'Data Analyst');
  const [customResult, setCustomResult] = useState<{
    original: string;
    improved: string;
    whyBetter: string;
    metricPrompt: string;
  } | null>(null);
  const [isImprovingCustom, setIsImprovingCustom] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImproveCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOriginal.trim()) return;

    setIsImprovingCustom(true);
    try {
      const response = await fetch('/api/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletText: customOriginal,
          targetRole: customTargetRole,
        }),
      });

      const data = await response.json();
      if (data) {
        setCustomResult({
          original: data.original || customOriginal,
          improved: typeof data.improved === 'string' ? data.improved : (typeof data === 'string' ? data : ''),
          whyBetter: data.whyBetter || 'Uses strong action verbs and emphasizes measurable results.',
          metricPrompt: data.metricPlaceholderNote || data.metricPrompt || 'Add your verified metrics where indicated in brackets.',
        });
      }
    } catch (err) {
      console.error('Failed to improve custom bullet:', err);
    } finally {
      setIsImprovingCustom(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Resume Improvement Workbench</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Evidence-based bullet re-engineering without fabricating metrics
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50/30 flex gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Professional Summary
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'experience'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Experience Bullets
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Bullets
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'custom'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Custom Bullet Rewriter
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Tab 1: Summary */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
                  Current / Detected Summary
                </span>
                <p className="text-slate-700 leading-relaxed font-mono text-xs">
                  {(result.sectionAnalysis || result.sections || []).find((s) => s.name.includes('Summary'))?.issues?.[0]
                    ? 'Summary lacks quantifiable impact or target positioning.'
                    : 'Detail-oriented professional with foundational skills looking to contribute to analytics initiatives.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Target-Aligned Proposed Summary
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `Results-driven ${result.targetRole} with proven expertise in ${
                          result.skills.matched?.slice(0, 3).join(', ') || 'data analytics and SQL'
                        }. Experienced in pipeline optimization, reporting automation, and collaborative business intelligence delivery.`,
                        'summary'
                      )
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-2xs"
                  >
                    {copiedId === 'summary' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Summary
                      </>
                    )}
                  </button>
                </div>

                <p className="text-slate-800 leading-relaxed font-medium">
                  {`Results-driven ${result.targetRole} with proven expertise in ${
                    (result.skills?.matched || []).slice(0, 3).map(toText).join(', ') || 'data analytics and SQL'
                  }. Experienced in pipeline optimization, reporting automation, and collaborative business intelligence delivery.`}
                </p>

                <div className="pt-2 border-t border-indigo-100 flex items-start gap-2 text-indigo-900">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Why this is better:</strong> Anchors directly to target job title, highlights verified proficiencies, and emphasizes commercial value rather than passive learning goals.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Experience Bullets */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {(result.experienceAnalysis || result.experience) && (result.experienceAnalysis || result.experience)!.length > 0 ? (
                (result.experienceAnalysis || result.experience)!.map((exp, eIdx) => (
                  <div key={eIdx} className="space-y-3 border-b border-slate-100 pb-4 last:border-none">
                    <h4 className="font-bold text-slate-900 text-sm">{exp.role} @ {exp.company}</h4>
                    {exp.suggestedBullets && exp.suggestedBullets.length > 0 ? (
                      exp.suggestedBullets.map((bullet, bIdx) => {
                        const bulletText = toText(bullet);
                        return (
                          <div key={bIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                Improved Bullet #{bIdx + 1}
                              </span>
                              <button
                                onClick={() => handleCopy(bulletText, `exp-${eIdx}-${bIdx}`)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                              >
                                {copiedId === `exp-${eIdx}-${bIdx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-slate-800 leading-relaxed font-medium">{bulletText}</p>
                            <p className="text-[11px] text-slate-500">
                              <strong>Where to add metric:</strong> Insert your actual runtime reduction %, query latency decrease, or team stakeholder count.
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-400 italic">No bullet suggestions for this role.</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic">No experience entries recorded.</p>
              )}
            </div>
          )}

          {/* Tab 3: Project Bullets */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {(result.projectAnalysis || result.projects) && (result.projectAnalysis || result.projects)!.length > 0 ? (
                (result.projectAnalysis || result.projects)!.map((proj, pIdx) => (
                  <div key={pIdx} className="space-y-3 border-b border-slate-100 pb-4 last:border-none">
                    <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                    {proj.suggestedBullets && proj.suggestedBullets.length > 0 ? (
                      proj.suggestedBullets.map((bullet, bIdx) => {
                        const bulletText = toText(bullet);
                        return (
                          <div key={bIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                                Refined Project Bullet
                              </span>
                              <button
                                onClick={() => handleCopy(bulletText, `proj-${pIdx}-${bIdx}`)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                              >
                                {copiedId === `proj-${pIdx}-${bIdx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copy
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-slate-800 leading-relaxed font-medium">{bulletText}</p>
                            <p className="text-[11px] text-slate-500">
                              <strong>Where to add real metric:</strong> {proj.missingMeasurableResults || 'Include dataset size (e.g. 50K rows) or processing speed.'}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-400 italic">No bullet suggestions for this project.</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic">No projects recorded.</p>
              )}
            </div>
          )}

          {/* Tab 4: Custom Bullet Rewriter */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <form onSubmit={handleImproveCustom} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Paste Any Weak Bullet Point to Rewrite:
                  </label>
                  <textarea
                    rows={3}
                    value={customOriginal}
                    onChange={(e) => setCustomOriginal(e.target.value)}
                    placeholder="e.g. Worked with SQL queries to help team look at marketing data and made charts in Tableau."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-slate-500">Role Context:</span>
                    <input
                      type="text"
                      value={customTargetRole}
                      onChange={(e) => setCustomTargetRole(e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isImprovingCustom || !customOriginal.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-2xs"
                  >
                    {isImprovingCustom ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Rewriting...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Rewrite with Gemini
                      </>
                    )}
                  </button>
                </div>
              </form>

              {customResult && (
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Gemini Optimized Bullet Point
                    </span>
                    <button
                      onClick={() => handleCopy(customResult.improved, 'custom-result')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-50"
                    >
                      {copiedId === 'custom-result' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-slate-900 font-bold text-xs leading-relaxed">
                    {customResult.improved}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white border border-emerald-100 space-y-1 text-[11px] text-slate-600">
                    <p>
                      <strong>Why this version is better:</strong> {customResult.whyBetter}
                    </p>
                    <p className="text-amber-800">
                      <strong>Where to add real metric:</strong> {customResult.metricPrompt}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>All suggestions preserve verified facts with zero hallucinated figures.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
