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
  Mail,
  MapPin,
  Linkedin,
  Github,
  Phone,
  Check,
  AlertCircle,
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

  const passedChecksCount = result.qualityChecks?.filter((q) => q.status === 'passed').length ?? 0;
  const totalChecksCount = result.qualityChecks?.length ?? 14;

  const navTabs = [
    { id: 'overview', label: 'Score & Overview', icon: Target },
    { id: 'skills', label: 'Skills Alignment', icon: Layers, count: result.skills?.found?.length },
    { id: 'keywords', label: 'Keywords', icon: KeyRound, count: result.keywords?.matched?.length },
    { id: 'sections', label: 'Section Audit', icon: FileCheck, count: (result.sectionAnalysis || result.sections || []).length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: (result.projectAnalysis || result.projects || []).length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: (result.experienceAnalysis || result.experience || []).length },
    { id: 'quality', label: 'Quality Checks', icon: CheckCircle2, count: `${passedChecksCount}/${totalChecksCount}` },
    { id: 'priorities', label: 'Top Priorities', icon: Rocket, count: (result.improvementPriorities || result.improvements || []).length },
    { id: 'jobmatch', label: 'Job Match', icon: Target, count: `${result.jobMatch?.percentage ?? 78}%` },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare, count: (result.interviewQuestions || []).length },
  ];

  const candidate = result.candidate;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Candidate & Role Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                AUDIT REPORT
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formattedDate}
              </span>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-200 pl-2">
                Gemini 3.8 Flash
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <span>{result.candidateName || candidate?.name || 'Candidate Profile'}</span>
              </h2>
            </div>

            {/* Target Role & Document Metadata */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Target Role: <strong className="text-slate-900">{result.targetRole}</strong>
              </span>

              {result.companyName && (
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  Target Company: <strong className="text-slate-900">{result.companyName}</strong>
                </span>
              )}

              <span className="flex items-center gap-1.5 text-slate-400">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {result.fileName || 'Uploaded Resume'}
              </span>
            </div>

            {/* Candidate Contact Strip if extracted */}
            {candidate && (candidate.email || candidate.location || candidate.linkedin || candidate.github || candidate.phone) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {candidate.email && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {candidate.email}
                  </span>
                )}
                {candidate.location && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {candidate.location}
                  </span>
                )}
                {candidate.phone && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {candidate.phone}
                  </span>
                )}
                {candidate.linkedin && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono truncate max-w-xs">
                    <Linkedin className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span className="truncate">{candidate.linkedin}</span>
                  </span>
                )}
                {candidate.github && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-mono truncate max-w-xs">
                    <Github className="w-3 h-3 text-slate-900 shrink-0" />
                    <span className="truncate">{candidate.github}</span>
                  </span>
                )}
              </div>
            )}
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-2xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Improve My Resume</span>
            </button>

            <button
              id="btn-reanalyze-new"
              onClick={onUploadNew}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Upload another resume"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Upload New</span>
            </button>
          </div>
        </div>

        {/* Quick Executive Takeaway Strip */}
        {((result.strengths && result.strengths.length > 0) || (result.weaknesses && result.weaknesses.length > 0)) && (
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {result.strengths && result.strengths.length > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs mb-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Observed Strengths</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.strengths.slice(0, 3).map((st, i) => (
                    <span key={i} className="text-[11px] bg-white text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.weaknesses && result.weaknesses.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs mb-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Primary Competency Gaps</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.weaknesses.slice(0, 3).map((w, i) => (
                    <span key={i} className="text-[11px] bg-white text-amber-800 px-2 py-0.5 rounded-md border border-amber-200 font-medium">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
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
