import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Cpu, Terminal, Shield } from 'lucide-react';

const STEPS = [
  { code: 'INGESTION', label: 'Extracting document text & layout structure...', desc: 'Parsing sections, dates, and contact metadata' },
  { code: 'ENTITIES', label: 'Tokenizing skills & technical terminology...', desc: 'Mapping against 9-category engineering taxonomy' },
  { code: 'ALIGNMENT', label: 'Cross-referencing target job description...', desc: 'Calculating exact and semantic keyword frequency' },
  { code: 'RUBRIC_EVAL', label: 'Computing 7-dimension ATS-style rubric...', desc: 'Evaluating evidence across calibrated weights' },
  { code: 'REWRITE_GEN', label: 'Generating prioritized bullet rewrites...', desc: 'Synthesizing STAR-framework optimizations' },
  { code: 'FINALIZING', label: 'Compiling structured executive report...', desc: 'Preparing dashboard view and PDF exports' },
];

export const AnalysisLoader: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => +(prev + 0.1).toFixed(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1900);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="max-w-lg mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 sm:p-8">
        {/* Header with Technical Status */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Cpu className="w-4 h-4 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Forensic Analysis In Progress
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Gemini 3.8 Flash • Inference Pipeline</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {elapsedSeconds.toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Progress Bar with Numerical Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-500">PIPELINE_PROGRESS</span>
            <span className="font-bold text-slate-900">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/80">
            <div
              className="h-full bg-slate-900 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step-by-Step Execution Log */}
        <div className="space-y-3.5">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isUpcoming = idx > currentStepIndex;

            return (
              <div
                key={step.code}
                className={`p-3 rounded-xl border transition-all text-left ${
                  isCurrent
                    ? 'bg-slate-50/90 border-slate-300 shadow-2xs'
                    : isCompleted
                    ? 'bg-white border-slate-100 opacity-90'
                    : 'bg-white/40 border-slate-100 opacity-40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${isCurrent ? 'text-slate-900' : 'text-slate-700'}`}>
                        {step.label}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        {step.code}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Verification Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Transient in-memory execution</span>
          </div>
          <span className="font-mono text-[10px]">NON-PERSISTENT</span>
        </div>
      </div>
    </div>
  );
};
