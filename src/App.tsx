import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadZone } from './components/UploadZone';
import { AnalysisLoader } from './components/AnalysisLoader';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Footer } from './components/Footer';
import { DEMO_ANALYSIS_RESULT } from './data/demoData';
import { ResumeAnalysisResult, StoredAnalysisSummary } from './types';
import {
  saveAnalysisToHistory,
  getStoredAnalysesSummaries,
  getAnalysisById,
  clearAllAnalyses,
  deleteAnalysisById,
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'results'>('home');
  const [activeResult, setActiveResult] = useState<ResumeAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySummaries, setHistorySummaries] = useState<StoredAnalysisSummary[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load history list on startup
  useEffect(() => {
    try {
      const stored = getStoredAnalysesSummaries();
      setHistorySummaries(stored);
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const refreshHistory = () => {
    try {
      const stored = getStoredAnalysesSummaries();
      setHistorySummaries(stored);
    } catch (e) {
      console.error('Failed to refresh history:', e);
    }
  };

  const handleStartAnalysis = () => {
    setCurrentView('upload');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryDemo = () => {
    setActiveResult(DEMO_ANALYSIS_RESULT);
    saveAnalysisToHistory(DEMO_ANALYSIS_RESULT);
    refreshHistory();
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFromHistory = (id: string) => {
    const full = getAnalysisById(id);
    if (full) {
      setActiveResult(full);
      setCurrentView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearHistory = () => {
    clearAllAnalyses();
    refreshHistory();
  };

  const handleDeleteAnalysis = (id: string) => {
    deleteAnalysisById(id);
    refreshHistory();
  };

  const handleAnalyzeResume = async (payload: {
    file?: File;
    resumeText?: string;
    fileName?: string;
    targetRole: string;
    jobDescription: string;
    companyName: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let response: Response;

      if (payload.file) {
        const formData = new FormData();
        formData.append('resumeFile', payload.file);
        formData.append('targetRole', payload.targetRole);
        formData.append('jobDescription', payload.jobDescription);
        formData.append('companyName', payload.companyName);

        response = await fetch('/api/analyze-resume', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/analyze-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resumeText: payload.resumeText,
            fileName: payload.fileName || 'Pasted_Resume.txt',
            targetRole: payload.targetRole,
            jobDescription: payload.jobDescription,
            companyName: payload.companyName,
          }),
        });
      }

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const data: ResumeAnalysisResult = await response.json();
      setActiveResult(data);
      saveAnalysisToHistory(data);
      refreshHistory();
      setCurrentView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      // If server error or offline fallback, provide friendly message
      setErrorMessage(
        err.message || 'Unable to complete resume analysis. Please verify your connection or try the Demo resume.'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={historySummaries.length}
        onTryDemo={handleTryDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isLoading ? (
          <AnalysisLoader />
        ) : currentView === 'home' ? (
          <Hero
            onStartAnalysis={handleStartAnalysis}
            onTryDemo={handleTryDemo}
          />
        ) : currentView === 'upload' ? (
          <UploadZone
            onAnalyze={handleAnalyzeResume}
            onLoadDemoResult={handleTryDemo}
            isLoading={isLoading}
          />
        ) : currentView === 'results' && activeResult ? (
          <ResultsDashboard
            result={activeResult}
            onUploadNew={() => {
              setCurrentView('upload');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <UploadZone
            onAnalyze={handleAnalyzeResume}
            onLoadDemoResult={handleTryDemo}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={historySummaries}
        onSelectAnalysis={handleSelectFromHistory}
        onClearHistory={handleClearHistory}
        onDeleteAnalysis={handleDeleteAnalysis}
      />

      {/* Footer with mandatory ethical disclaimers & privacy note */}
      <Footer onNavigate={(view) => setCurrentView(view)} />
    </div>
  );
}
