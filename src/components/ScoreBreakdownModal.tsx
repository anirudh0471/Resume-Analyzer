import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';
import { ScoreBreakdown } from '../types';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore: number;
  breakdown: ScoreBreakdown;
  targetRole: string;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  isOpen,
  onClose,
  overallScore,
  breakdown,
  targetRole,
}) => {
  if (!isOpen) return null;

  const rows = [
    {
      name: 'Keyword Alignment',
      category: breakdown.keywordAlignment,
      description: 'Matches specific keywords, terminologies, and industry phrases from the job description.',
    },
    {
      name: 'Required Skills Match',
      category: breakdown.skillsMatch,
      description: 'Presence of required technical tools, libraries, concepts, and domain competencies.',
    },
    {
      name: 'Experience Relevance',
      category: breakdown.experienceRelevance,
      description: 'Alignment of past job titles, duties, and responsibilities with the target role.',
    },
    {
      name: 'Projects Relevance',
      category: breakdown.projectRelevance,
      description: 'Relevance and technical depth of listed academic or personal portfolio projects.',
    },
    {
      name: 'Resume Structure & Readability',
      category: breakdown.structure,
      description: 'Reverse-chronological clarity, section demarcation, bullet density, and formatting hygiene.',
    },
    {
      name: 'Achievement & Result Evidence',
      category: breakdown.achievements,
      description: 'Presence of verifiable metrics, percentages, time-savings, or measurable business impact.',
    },
    {
      name: 'Education & Certification Relevance',
      category: breakdown.educationCertification,
      description: 'Direct applicability of academic degree, completed coursework, and industry certifications.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">ATS-Style Compatibility Rubric</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                100 Point Scale
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent, non-blackbox breakdown for target role: <strong className="text-slate-700">{targetRole}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Important Transparency Note:</span> This is an AI-generated compatibility estimate based on our defined rubric, NOT an official guarantee of passing any employer's proprietary Applicant Tracking System.
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Evaluation Category</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-3 text-center">Max</th>
                  <th className="py-3 px-4">Rubric Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const score = row.category?.score ?? 0;
                  const max = row.category?.max ?? 0;
                  const percentage = max > 0 ? Math.round((score / max) * 100) : 0;

                  return (
                    <tr key={row.name} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{row.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{row.description}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">
                        <span className={`inline-block px-2 py-0.5 rounded-md ${
                          percentage >= 80
                            ? 'bg-emerald-50 text-emerald-700'
                            : percentage >= 60
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {score}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center text-slate-500 font-medium">
                        {max}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-xs leading-relaxed">
                        {row.category?.explanation || 'Evaluated against candidate resume content.'}
                      </td>
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="bg-indigo-50/60 font-bold text-slate-900 border-t-2 border-indigo-200">
                  <td className="py-3 px-4 text-indigo-900">
                    Total ATS-Style Compatibility Score
                  </td>
                  <td className="py-3 px-3 text-center text-indigo-700 text-sm">
                    {overallScore}
                  </td>
                  <td className="py-3 px-3 text-center text-indigo-700 text-sm">
                    100
                  </td>
                  <td className="py-3 px-4 text-indigo-800 text-xs font-normal">
                    Calculated strictly as the sum of all 7 weighted dimensions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Defined 7-point algorithmic weight distribution</span>
          </div>
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
