import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Loader2, FileText, BrainCircuit } from 'lucide-react';

const STEPS = [
  'Reading resume...',
  'Extracting information...',
  'Comparing skills...',
  'Analyzing job description...',
  'Generating recommendations...',
  'Preparing your report...',
];

export const AnalysisLoader: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="max-w-md mx-auto my-16 px-4 text-center">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {/* Animated Icon */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-indigo-100 animate-ping opacity-40" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <BrainCircuit className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
          Evaluating Your Resume
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Gemini 3.8 Flash is inspecting text evidence & calculating rubric compatibility
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6 p-0.5 border border-slate-200/60">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Dynamic Step List */}
        <div className="space-y-3 text-left">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isUpcoming = idx > currentStepIndex;

            return (
              <div
                key={step}
                className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'text-indigo-700 font-semibold scale-102 pl-1'
                    : isCompleted
                    ? 'text-slate-700 font-medium'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {/* Reassuring note */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Factual fidelity check: strictly no invented candidate details</span>
        </div>
      </div>
    </div>
  );
};
