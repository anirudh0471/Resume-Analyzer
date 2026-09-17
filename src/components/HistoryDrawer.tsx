import React from 'react';
import { X, History, Trash2, ArrowRight, Calendar, Target, Award } from 'lucide-react';
import { StoredAnalysisSummary } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: StoredAnalysisSummary[];
  onSelectAnalysis: (id: string) => void;
  onClearHistory: () => void;
  onDeleteAnalysis: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectAnalysis,
  onClearHistory,
  onDeleteAnalysis,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Analysis History</h3>
              <p className="text-xs text-slate-500">Locally saved resume evaluations ({history.length})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {history && history.length > 0 ? (
            history.map((item) => {
              const formattedDate = new Date(item.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all space-y-2.5 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                        <Target className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{item.targetRole}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.candidateName} • {item.fileName}
                      </p>
                    </div>

                    {/* Score Badge */}
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {item.overallScore}/100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDeleteAnalysis(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onSelectAnalysis(item.id);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <span>View Report</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-xs text-slate-400">
              <History className="w-10 h-10 mx-auto text-slate-300 mb-2 stroke-1" />
              <p className="font-semibold text-slate-600">No past evaluations yet</p>
              <p className="mt-1">Run an analysis to keep track of your progress over time.</p>
            </div>
          )}
        </div>

        {/* Footer with Clear All */}
        {history && history.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
