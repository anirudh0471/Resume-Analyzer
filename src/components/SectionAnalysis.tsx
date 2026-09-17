import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Lightbulb,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SectionAnalysisItem } from '../types';

interface SectionAnalysisProps {
  sections: SectionAnalysisItem[];
}

export const SectionAnalysis: React.FC<SectionAnalysisProps> = ({ sections }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const formatText = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.item || val.text || val.suggestion || val.issue || val.strength || val.reason || JSON.stringify(val);
    }
    return String(val);
  };

  const getStatusBadge = (status: SectionAnalysisItem['status']) => {
    switch (status) {
      case 'Good':
        return {
          icon: CheckCircle2,
          text: 'Good Standing',
          classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'Needs Work':
        return {
          icon: AlertTriangle,
          text: 'Needs Work',
          classes: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'Missing':
        return {
          icon: XCircle,
          text: 'Missing Section',
          classes: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      default:
        return {
          icon: HelpCircle,
          text: 'Evaluated',
          classes: 'bg-slate-50 text-slate-700 border-slate-200',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Document Architecture
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
            {sections?.length || 0} Sections Audited
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-0.5">Section-by-Section Quality Audit</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Detailed inspection across standard resume sections evaluating clarity, impact, omissions, and formatting.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {sections && sections.length > 0 ? (
          sections.map((section, idx) => {
            const isExpanded = expandedIndex === idx;
            const statusInfo = getStatusBadge(section.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={section.name}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all hover:border-indigo-200"
              >
                {/* Accordion Bar */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{section.name}</h4>
                      <p className="text-[11px] text-slate-400">
                        {section.strengths?.length || 0} strengths • {section.issues?.length || 0} issues noted
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.classes}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.text}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Strengths */}
                    <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Strengths</span>
                      </div>
                      {section.strengths && section.strengths.length > 0 ? (
                        <ul className="space-y-1.5 text-slate-700">
                          {section.strengths.map((str, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span>{formatText(str)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">No specific strengths documented.</p>
                      )}
                    </div>

                    {/* Issues */}
                    <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Issues & Deficiencies</span>
                      </div>
                      {section.issues && section.issues.length > 0 ? (
                        <ul className="space-y-1.5 text-slate-700">
                          {section.issues.map((iss, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                              <span>{formatText(iss)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">No notable issues detected.</p>
                      )}
                    </div>

                    {/* Suggestions */}
                    <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-800 mb-2">
                        <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Actionable Suggestions</span>
                      </div>
                      {section.suggestions && section.suggestions.length > 0 ? (
                        <ul className="space-y-1.5 text-slate-700">
                          {section.suggestions.map((sug, suIdx) => (
                            <li key={suIdx} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                              <span>{formatText(sug)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">Section meets baseline requirements.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 italic">No section analysis available.</p>
        )}
      </div>
    </div>
  );
};
