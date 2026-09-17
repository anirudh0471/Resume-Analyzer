import React from 'react';
import { FileText, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'upload') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">ResumeAI</span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              AI-powered resume analyzer for students, fresh graduates, and ambitious job seekers. Evidence-based evaluation powered by Gemini 3.8 Flash without fabricated metrics.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>In-memory document processing • Server-side API key security</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('upload')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Analyze Resume
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  About ResumeAI
                </a>
              </li>
            </ul>
          </div>

          {/* Ethics & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Compliance & Ethics</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Zero fabricated metrics policy</li>
              <li>ATS-style compatibility estimation</li>
              <li>No permanent document retention</li>
              <li>Transparent 7-factor scoring</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimers Banner */}
        <div className="pt-6 space-y-2 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-600">Disclaimer:</strong> This tool provides suggestions based on available resume and job description information. It is not an official hiring guarantee or a real company Applicant Tracking System. Scores are compatibility estimates calculated using our published transparent rubric.
          </p>
          <p>
            <strong className="text-slate-600">Privacy Note:</strong> Resume information is processed securely in server memory for analysis purposes and is not stored permanently without user consent.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400 border-t border-slate-100">
            <span>© {new Date().getFullYear()} ResumeAI. All rights reserved.</span>
            <span>Built with Google Gemini & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
