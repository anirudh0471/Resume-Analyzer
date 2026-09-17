import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Tag,
  Code,
  Database,
  Cloud,
  Cpu,
  Wrench,
  Users,
  LineChart,
  Binary,
} from 'lucide-react';
import { SkillsAnalysisData } from '../types';

interface SkillsAnalysisProps {
  skills: SkillsAnalysisData;
}

export const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ skills }) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'alignment' | 'categories'>('alignment');

  const categoryIcons: Record<string, any> = {
    'Programming': Code,
    'Data/Analytics': LineChart,
    'Machine Learning': Binary,
    'AI': Cpu,
    'Frameworks/Libraries': Code,
    'Databases': Database,
    'Cloud/DevOps': Cloud,
    'Tools': Wrench,
    'Soft Skills': Users,
  };

  const categories = Object.keys(skills.categories || {});

  const formatSkillText = (s: any): string => {
    if (!s) return '';
    if (typeof s === 'string') return s;
    if (typeof s === 'object') {
      return s.skill || s.name || s.item || s.title || JSON.stringify(s);
    }
    return String(s);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header with toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Taxonomy & Match
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
              {skills.found?.length || 0} Skills Detected
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Skills Alignment</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare candidate proficiencies against job role expectations across 9 technical and soft skill categories.
          </p>
        </div>

        {/* View toggle */}
        <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode('alignment')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'alignment'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Role Alignment
          </button>
          <button
            onClick={() => setViewMode('categories')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'categories'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Category Taxonomy
          </button>
        </div>
      </div>

      {viewMode === 'alignment' ? (
        /* Alignment View: Matched, Missing, Valuable, Found */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matched Skills */}
          <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900">Skills Relevant & Matched to Job</h4>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                {skills.matched?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Skills explicitly identified in your resume that fulfill target role requirements.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.matched && skills.matched.length > 0 ? (
                skills.matched.map((skill, sIdx) => {
                  const label = formatSkillText(skill);
                  return (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200 shadow-2xs font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400 italic">No exact matched skills detected yet.</span>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h4 className="text-sm font-bold text-slate-900">Important Skills Missing</h4>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                {skills.missing?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Essential or common requirements from the target role not found in the resume.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.missing && skills.missing.length > 0 ? (
                skills.missing.map((skill, sIdx) => {
                  const label = formatSkillText(skill);
                  return (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white text-rose-800 border border-rose-200 shadow-2xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400 italic">No critical missing skills detected!</span>
              )}
            </div>
          </div>

          {/* Potentially Valuable Skills */}
          <div className="p-5 rounded-xl bg-indigo-50/40 border border-indigo-200/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">Potentially Valuable Skills to Acquire</h4>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200">
                {skills.valuable?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Complementary proficiencies that could distinguish your application for this career track.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.valuable && skills.valuable.length > 0 ? (
                skills.valuable.map((skill, sIdx) => {
                  const label = formatSkillText(skill);
                  return (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white text-indigo-800 border border-indigo-200 shadow-2xs font-medium"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400 italic">None specified.</span>
              )}
            </div>
          </div>

          {/* All Skills Found */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-600" />
                <h4 className="text-sm font-bold text-slate-900">All Candidate Skills Found in Resume</h4>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {skills.found?.length || 0}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Verbatim extraction of technologies, tools, and methods listed in your resume.
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {skills.found && skills.found.length > 0 ? (
                skills.found.map((skill, sIdx) => {
                  const label = formatSkillText(skill);
                  return (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs font-medium"
                    >
                      {label}
                    </span>
                  );
                })
              ) : (
                <span className="text-xs text-slate-400 italic">No skills extracted.</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Categorized Taxonomy View */
        <div className="space-y-4">
          {/* Category filter pills */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
            <button
              onClick={() => setActiveCategoryTab('All')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeCategoryTab === 'All'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryTab(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeCategoryTab === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} ({(skills.categories[cat] || []).length})
              </button>
            ))}
          </div>

          {/* Grid of categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              .filter((cat) => activeCategoryTab === 'All' || activeCategoryTab === cat)
              .map((cat) => {
                const IconComponent = categoryIcons[cat] || Tag;
                const items = skills.categories[cat] || [];

                return (
                  <div
                    key={cat}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 truncate">{cat}</h5>
                      <span className="ml-auto text-[10px] font-bold text-slate-500 bg-slate-200/80 px-1.5 py-0.2 rounded">
                        {items.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {items.length > 0 ? (
                        items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium"
                          >
                            {formatSkillText(item)}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">None listed</span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
