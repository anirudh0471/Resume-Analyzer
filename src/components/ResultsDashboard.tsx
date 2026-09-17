import React, { useState } from 'react';
import {
  Download,
  Sparkles,
  RefreshCw,
  Calendar,
  FileText,
  User,
  Briefcase,
  Building,
  Target,
  Layers,
  KeyRound,
  FileCheck,
  FolderGit2,
  CheckCircle2,
  Rocket,
  MessageSquare,
  ArrowUpRight,
  Printer,
} from 'lucide-react';
import { ResumeAnalysisResult } from '../types';
import { ScoreCard } from './ScoreCard';
import { SkillsAnalysis } from './SkillsAnalysis';
import { KeywordAnalysis } from './KeywordAnalysis';
import { SectionAnalysis } from './SectionAnalysis';
import { ProjectAnalysis } from './ProjectAnalysis';
import { ExperienceAnalysis } from './ExperienceAnalysis';
import { QualityChecks } from './QualityChecks';
import { ImprovementPlan } from './ImprovementPlan';
import { JobMatchSection } from './JobMatchSection';
import { InterviewQuestions } from './InterviewQuestions';
import { ImproveResumeModal } from './ImproveResumeModal';
import { generatePdfReport as generateResumePdfReport } from '../utils/pdfGenerator';

interface ResultsDashboardProps {
  result: ResumeAnalysisResult;
  onUploadNew: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onUploadNew,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isImproveModalOpen, setIsImproveModalOpen] = useState(false);
  const [customBulletToRefine, setCustomBulletToRefine] = useState<string | undefined>(undefined);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const formattedDate = new Date(result.analyzedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      generateResumePdfReport(result);
    } catch (err) {
      console.error('Failed to generate PDF report:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleOpenImprovementForBullet = (bullet: string) => {
    setCustomBulletToRefine(bullet);
    setIsImproveModalOpen(true);
  };

  const navTabs = [
    { id: 'overview', label: 'Score & Overview', icon: Target },
    { id: 'skills', label: 'Skills Alignment', icon: Layers },
    { id: 'keywords', label: 'Keywords', icon: KeyRound },
    { id: 'sections', label: 'Section Audit', icon: FileCheck },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'quality', label: 'Quality Checks', icon: CheckCircle2 },
    { id: 'priorities', label: 'Top Priorities', icon: Rocket },
    { id: 'jobmatch', label: 'Job Match', icon: Target },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Candidate & Role Profile */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                Evaluation Report
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{result.candidateName || 'Candidate Profile'}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                Target Role: <strong className="text-slate-900">{result.targetRole}</strong>
              </span>

              {result.companyName && (
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  Target Company: <strong className="text-slate-900">{result.companyName}</strong>
                </span>
              )}

              <span className="flex items-center gap-1.5 text-slate-400">
                <FileText className="w-3.5 h-3.5" />
                {result.fileName}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="btn-download-pdf-report"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors hover:border-slate-400"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Report'}</span>
            </button>

            <button
              id="btn-open-improve-modal"
              onClick={() => {
                setCustomBulletToRefine(undefined);
                setIsImproveModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs shadow-indigo-200 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Improve My Resume</span>
            </button>

            <button
              id="btn-reanalyze-new"
              onClick={onUploadNew}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Upload another resume"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Upload New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto flex gap-1">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Always visible or Tab 1: Score & Overview */}
        {(activeTab === 'overview' || activeTab === 'all') && (
          <div className="space-y-8 animate-in fade-in">
            <ScoreCard result={result} />

            {/* Quick Two-Column Highlights on Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <JobMatchSection
                jobMatch={result.jobMatch || { percentage: 78, matched: [], partiallyMatched: [], missing: [] }}
                targetRole={result.targetRole}
                companyName={result.companyName}
              />
              <ImprovementPlan
                improvements={result.improvementPriorities || result.improvements || []}
                onOpenImprovementWorkbench={() => setIsImproveModalOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Skills Alignment */}
        {activeTab === 'skills' && (
          <div className="animate-in fade-in">
            <SkillsAnalysis skills={result.skills} />
          </div>
        )}

        {/* Tab 3: Keywords */}
        {activeTab === 'keywords' && (
          <div className="animate-in fade-in">
            <KeywordAnalysis keywords={result.keywords} />
          </div>
        )}

        {/* Tab 4: Section-by-Section Audit */}
        {activeTab === 'sections' && (
          <div className="animate-in fade-in">
            <SectionAnalysis sections={result.sectionAnalysis || result.sections || []} />
          </div>
        )}

        {/* Tab 5: Projects Deep-Dive */}
        {activeTab === 'projects' && (
          <div className="animate-in fade-in">
            <ProjectAnalysis
              projects={result.projectAnalysis || result.projects || []}
              onOpenImprovement={handleOpenImprovementForBullet}
            />
          </div>
        )}

        {/* Tab 6: Experience Analysis */}
        {activeTab === 'experience' && (
          <div className="animate-in fade-in">
            <ExperienceAnalysis
              experience={result.experienceAnalysis || result.experience || []}
              onOpenImprovement={handleOpenImprovementForBullet}
            />
          </div>
        )}

        {/* Tab 7: 14-Point Quality Checks */}
        {activeTab === 'quality' && (
          <div className="animate-in fade-in">
            <QualityChecks checks={result.qualityChecks} />
          </div>
        )}

        {/* Tab 8: Top Priorities */}
        {activeTab === 'priorities' && (
          <div className="animate-in fade-in">
            <ImprovementPlan
              improvements={result.improvementPriorities || result.improvements || []}
              onOpenImprovementWorkbench={() => setIsImproveModalOpen(true)}
            />
          </div>
        )}

        {/* Tab 9: Job Match */}
        {activeTab === 'jobmatch' && (
          <div className="animate-in fade-in">
            <JobMatchSection
              jobMatch={result.jobMatch || { percentage: 78, matched: [], partiallyMatched: [], missing: [] }}
              targetRole={result.targetRole}
              companyName={result.companyName}
            />
          </div>
        )}

        {/* Tab 10: Interview Questions */}
        {activeTab === 'interview' && (
          <div className="animate-in fade-in">
            <InterviewQuestions questions={result.interviewQuestions} />
          </div>
        )}
      </div>

      {/* Improvement Modal */}
      <ImproveResumeModal
        isOpen={isImproveModalOpen}
        onClose={() => setIsImproveModalOpen(false)}
        result={result}
        initialBullet={customBulletToRefine}
      />
    </div>
  );
};
