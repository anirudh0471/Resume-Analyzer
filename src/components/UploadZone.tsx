import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  AlertCircle,
  Briefcase,
  Building,
  ArrowRight,
  Shield,
  FileCode,
  CheckCircle,
} from 'lucide-react';
import { DEMO_RESUME_TEXT, DEMO_JOB_DESCRIPTION } from '../data/demoData';

interface UploadZoneProps {
  onAnalyze: (payload: {
    file?: File;
    resumeText?: string;
    fileName?: string;
    targetRole: string;
    jobDescription: string;
    companyName: string;
  }) => Promise<void>;
  onLoadDemoResult: () => void;
  isLoading: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onAnalyze,
  onLoadDemoResult,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('upload');
  const [pastedResumeText, setPastedResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('Data Analyst');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const roleSuggestions = [
    'Data Analyst',
    'Software Engineer',
    'Machine Learning Engineer',
    'Full Stack Developer',
    'Product Manager',
    'Data Scientist',
  ];

  const handleFileSelection = (file: File) => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    const isValidExt = validExtensions.includes(ext);

    if (!isValidExt) {
      setErrorMessage(`Unsupported file format (${ext}). Please upload a PDF (.pdf) or Word document (.docx).`);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File exceeds the 10MB maximum size limit. Please upload a smaller resume.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadDemoResumeData = () => {
    setInputMode('paste');
    setPastedResumeText(DEMO_RESUME_TEXT);
    setTargetRole('Junior Data Analyst');
    setCompanyName('Horizon Tech Solutions');
    setJobDescription(DEMO_JOB_DESCRIPTION);
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (inputMode === 'upload' && !selectedFile) {
      setErrorMessage('Please select a PDF or DOCX resume to analyze, or switch to paste text.');
      return;
    }

    if (inputMode === 'paste' && (!pastedResumeText || pastedResumeText.trim().length < 40)) {
      setErrorMessage('Please paste the complete text of your resume (at least 40 characters).');
      return;
    }

    try {
      if (inputMode === 'upload' && selectedFile) {
        await onAnalyze({
          file: selectedFile,
          targetRole,
          jobDescription,
          companyName,
        });
      } else {
        await onAnalyze({
          resumeText: pastedResumeText,
          fileName: 'Pasted_Resume.txt',
          targetRole,
          jobDescription,
          companyName,
        });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while uploading. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Title & Quick Demo CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Analyze Your Resume
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload your resume document and optionally specify your target role for evidence-based compatibility analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="quick-demo-view-btn"
            onClick={onLoadDemoResult}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Preview</span>
          </button>
        </div>
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-800 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Notice</p>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Mode Selector */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 1: Provide Resume <span className="text-red-500">*</span>
            </label>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-100 text-xs font-medium">
              <button
                type="button"
                id="tab-upload-file"
                onClick={() => {
                  setInputMode('upload');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  inputMode === 'upload'
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upload File (PDF / DOCX)
              </button>
              <button
                type="button"
                id="tab-paste-text"
                onClick={() => {
                  setInputMode('paste');
                  setErrorMessage(null);
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  inputMode === 'paste'
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {inputMode === 'upload' ? (
            /* Drag and drop zone */
            <div
              id="file-drop-zone"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-indigo-500 bg-indigo-50/60 scale-[0.99]'
                  : selectedFile
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-indigo-400 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                id="resume-file-input"
                accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileSelection(e.target.files[0]);
                  }
                }}
              />

              {selectedFile ? (
                /* Selected File Card */
                <div
                  className="max-w-md mx-auto bg-white rounded-xl p-4 border border-emerald-200 shadow-2xs flex items-center justify-between text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.name.endsWith('.pdf') ? 'PDF Document' : 'Word Document'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3" /> Ready
                    </span>
                    <button
                      type="button"
                      id="remove-selected-file-btn"
                      onClick={handleRemoveFile}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Prompt */
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-3.5 shadow-2xs">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Drag and drop your resume here, or <span className="text-indigo-600 underline underline-offset-2">browse</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports PDF (.pdf) and Microsoft Word (.docx, .doc) up to 10MB
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      id="load-demo-resume-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadDemoResumeData();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Load Demo Resume Text (Alex Johnson)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Paste text mode */
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>Paste raw resume content (summary, experience, education, skills):</span>
                <span>{pastedResumeText.length} characters</span>
              </div>
              <textarea
                id="resume-text-input"
                rows={8}
                value={pastedResumeText}
                onChange={(e) => setPastedResumeText(e.target.value)}
                placeholder="Paste your full resume text here..."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
              />
              <div className="mt-2 flex items-center justify-end">
                <button
                  type="button"
                  id="fill-demo-text-btn"
                  onClick={handleLoadDemoResumeData}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Load Alex Johnson Demo Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Target Role & Optional Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label htmlFor="target-role-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Target Job Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="target-role-input"
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Data Analyst"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                required
              />
            </div>
            {/* Quick role pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {roleSuggestions.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                    targetRole.toLowerCase() === role.toLowerCase()
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="company-name-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Company Name <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="company-name-input"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Horizon Tech / Stripe / Google"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Helps tailor interview questions and corporate culture alignment.
            </p>
          </div>
        </div>

        {/* Step 3: Job Description Textarea */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="job-description-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Job Description <span className="text-slate-400 font-normal normal-case">(Recommended for ATS alignment)</span>
            </label>
            <span className="text-xs text-slate-400">
              {jobDescription ? `${jobDescription.length} characters` : 'Optional'}
            </span>
          </div>
          <textarea
            id="job-description-input"
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job posting / duties / required qualifications here for precise keyword and skill matching..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            If omitted, Gemini will analyze your resume against standard industry benchmarks for "{targetRole || 'the role'}".
          </p>
        </div>

        {/* Submit CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted in memory • Zero permanent storage</span>
          </div>

          <button
            type="submit"
            id="submit-analyze-btn"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-200 transition-all hover:shadow-md"
          >
            <span>{isLoading ? 'Analyzing Resume...' : 'Analyze Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Mandatory Privacy Notice Card */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Privacy Notice:</strong> Your resume contains personal information. Avoid uploading documents containing information you do not want processed. Resume data should not be stored permanently without user consent. Documents are processed transiently in server memory during your session.
        </p>
      </div>
    </div>
  );
};
