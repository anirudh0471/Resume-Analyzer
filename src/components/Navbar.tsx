import React from 'react';
import { FileText, Sparkles, History, ArrowRight } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            id="nav-brand-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">ResumeAI</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  AI Analyzer
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5">Evidence-Based Career Intelligence</p>
            </div>
          </button>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home-link"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 bg-indigo-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Home
            </button>
            <button
              id="nav-analyze-link"
              onClick={() => onNavigate('upload')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'upload'
                  ? 'text-indigo-600 bg-indigo-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
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
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-colors"
            >
              How It Works
            </a>
            <a
              id="nav-about-link"
              href="#about"
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              id="nav-history-btn"
              onClick={onOpenHistory}
              title="View analysis history"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">History</span>
              {historyCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>

            <button
              id="nav-try-demo-btn"
              onClick={onTryDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Try Demo
            </button>

            <button
              id="nav-cta-upload-btn"
              onClick={() => onNavigate('upload')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all hover:shadow"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
