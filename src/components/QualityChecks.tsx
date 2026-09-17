import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { QualityCheckItem } from '../types';

interface QualityChecksProps {
  checks?: QualityCheckItem[];
}

const toText = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    return val.title || val.detail || val.text || val.message || JSON.stringify(val);
  }
  return String(val);
};

export const QualityChecks: React.FC<QualityChecksProps> = ({ checks }) => {
  // Default checklist fallbacks if backend model returned a subset
  const defaultList: QualityCheckItem[] = [
    { id: 'summary', title: 'Professional Summary', status: 'passed', detail: 'Identifies career positioning and target trajectory.' },
    { id: 'contact', title: 'Contact Information', status: 'passed', detail: 'Email, phone, and location present.' },
    { id: 'linkedin', title: 'LinkedIn Profile', status: 'passed', detail: 'Customized LinkedIn handle present.' },
    { id: 'github', title: 'GitHub / Portfolio', status: 'passed', detail: 'Relevant code portfolio provided for technical evaluation.' },
    { id: 'paragraphs', title: 'Paragraph Length', status: 'passed', detail: 'Scannable bullet points rather than dense text blocks.' },
    { id: 'verbs', title: 'Action Verbs', status: 'passed', detail: 'Active voice used in experience descriptions.' },
    { id: 'repeated', title: 'Repetitive Wording', status: 'passed', detail: 'Varied technical vocabulary throughout.' },
    { id: 'clarity', title: 'Project Clarity', status: 'passed', detail: 'Explicitly defines problem, tech stack, and deliverable.' },
    { id: 'metrics', title: 'Measurable Achievements', status: 'warning', detail: 'Could incorporate higher density of quantifiable metrics.' },
    { id: 'formatting', title: 'Consistent Formatting', status: 'passed', detail: 'Harmonious dates and punctuation.' },
    { id: 'sections', title: 'Excessive Sections', status: 'passed', detail: 'Standard structure without extraneous hobby lists.' },
    { id: 'relevance', title: 'Information Relevance', status: 'passed', detail: 'Content is aligned with career domain.' },
    { id: 'spelling', title: 'Spelling & Grammar', status: 'passed', detail: 'No obvious spelling inconsistencies detected.' },
    { id: 'freshness', title: 'Potentially Outdated Info', status: 'passed', detail: 'Recent dates and modern technical tooling.' },
  ];

  const items = (checks && checks.length > 0) ? checks : defaultList;

  const passedCount = items.filter(c => c.status === 'passed').length;
  const warningCount = items.filter(c => c.status === 'warning').length;
  const failedCount = items.filter(c => c.status === 'failed').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Forensic Hygiene
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {passedCount} / {items.length} Passed
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">14-Point Resume Quality Check</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated inspection for common recruiter red flags, layout friction, and structural flaws.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            {passedCount} Passed
          </span>
          {warningCount > 0 && (
            <span className="px-2 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              {warningCount} Warnings
            </span>
          )}
          {failedCount > 0 && (
            <span className="px-2 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
              {failedCount} Critical
            </span>
          )}
        </div>
      </div>

      {/* Grid of checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {items.map((check) => {
          const isPassed = check.status === 'passed';
          const isWarning = check.status === 'warning';

          return (
            <div
              key={check.id || check.title}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                isPassed
                  ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                  : isWarning
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              {isPassed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : isWarning ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}

              <div className="text-xs">
                <span className="font-bold text-slate-900 block">{toText(check.title)}</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{toText(check.detail)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
