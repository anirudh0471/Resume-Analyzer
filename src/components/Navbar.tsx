import React from 'react';
import { FileText, Sparkles, History, ArrowRight, Cpu } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'upload' | 'results';
  onNavigate: (view: 'home' | 'upload' | 'results') => void;
  onOpenHistory: () => void;
  historyCount: number;
  onTryDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenHistory,
  historyCount,
  onTryDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Model Indicator */}
          <div className="flex items-center gap-4">
            <button
              id="nav-brand-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold tracking-tight shadow-xs group-hover:bg-indigo-600 transition-colors">
                <FileText className="w-4 h-4 text-indigo-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tracking-tight text-slate-900 font-sans">
                    ResumeAI
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-slate-100 text-slate-700 border border-slate-200">
                    AIML v2.4
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal">Evidence-Based Career Intelligence</p>
              </div>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-[11px] font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Gemini 3.8 Flash • Online</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
            <button
              id="nav-home-link"
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentView === 'home'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              id="nav-analyze-link"
              onClick={() => onNavigate('upload')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                currentView === 'upload'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Analyze Resume
            </button>
            <a
              id="nav-how-it-works-link"
              href="#how-it-works"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
            >
              Architecture & Rubric
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              id="nav-history-btn"
              onClick={onOpenHistory}
              title="View analysis history"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">History</span>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              id="nav-try-demo-btn"
              onClick={onTryDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sample Resume</span>
            </button>

            <button
              id="nav-cta-upload-btn"
              onClick={() => onNavigate('upload')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs hover:shadow-sm"
            >
              <span>Evaluate Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
