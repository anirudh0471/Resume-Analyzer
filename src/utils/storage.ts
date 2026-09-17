import { AnalysisHistoryItem, ResumeAnalysisResult, StoredAnalysisSummary } from '../types';

const STORAGE_KEY = 'resumeai_analysis_history_v1';

export function getAnalysisHistory(): AnalysisHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read analysis history from localStorage', err);
    return [];
  }
}

export function getStoredAnalysesSummaries(): StoredAnalysisSummary[] {
  const history = getAnalysisHistory();
  return history.map((item) => ({
    id: item.id,
    date: item.date,
    targetRole: item.targetRole,
    companyName: item.companyName,
    overallScore: item.score,
    candidateName: item.result?.candidateName || item.result?.candidate?.name || 'Candidate',
    fileName: item.resumeFileName || item.result?.fileName || 'Resume.pdf',
  }));
}

export function getAnalysisById(id: string): ResumeAnalysisResult | null {
  const history = getAnalysisHistory();
  const found = history.find((item) => item.id === id);
  return found ? found.result : null;
}

export function saveAnalysisToHistory(result: ResumeAnalysisResult): AnalysisHistoryItem {
  try {
    const history = getAnalysisHistory();
    const newItem: AnalysisHistoryItem = {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: result.analyzedAt || new Date().toISOString(),
      resumeFileName: result.fileName || (result.candidateName ? `${result.candidateName}_Resume.pdf` : 'Resume_Analysis.pdf'),
      targetRole: result.targetRole || 'Candidate',
      companyName: result.companyName,
      score: result.overallScore,
      result,
    };

    // Keep most recent 20 items
    const updated = [newItem, ...history.filter(h => h.id !== newItem.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newItem;
  } catch (err) {
    console.error('Failed to save analysis to history', err);
    return {
      id: `fallback_${Date.now()}`,
      date: new Date().toISOString(),
      resumeFileName: result.fileName || 'Resume.pdf',
      targetRole: result.targetRole,
      score: result.overallScore,
      result,
    };
  }
}

export function deleteAnalysisById(id: string): void {
  deleteHistoryItem(id);
}

export function deleteHistoryItem(id: string): AnalysisHistoryItem[] {
  try {
    const history = getAnalysisHistory().filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return history;
  } catch (err) {
    console.error('Failed to delete history item', err);
    return [];
  }
}

export function clearAllAnalyses(): void {
  clearAnalysisHistory();
}

export function clearAnalysisHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear history', err);
  }
}
