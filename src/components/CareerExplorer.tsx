import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Map, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  GitBranch, 
  Tag, 
  X,
  BookOpen
} from 'lucide-react';
import { CareerItem, StudentProfile } from '../types';

interface CareerExplorerProps {
  careers: CareerItem[];
  profile: StudentProfile;
  onSelectCareerForRoadmap: (careerId: string) => void;
  onSelectCareerForSkillGap: (careerId: string) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({
  careers,
  profile,
  onSelectCareerForRoadmap,
  onSelectCareerForSkillGap
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeCareerDetail, setActiveCareerDetail] = useState<CareerItem | null>(null);

  const categories = ['All', ...Array.from(new Set(careers.map((c) => c.category)))];

  const filtered = careers.filter((career) => {
    const matchesSearch = 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      career.relatedInterests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesDiff = selectedDifficulty === 'All' || career.beginnerDifficulty === selectedDifficulty;

    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Career Pathways Explorer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore all {careers.length} career options across modern technology, core engineering, design, data, and public services.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search by career title, skill (e.g. Java, Python, SQL), or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Learning Curves</option>
            <option value="Easy">Easy / Accessible</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Grid of Careers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((career) => (
          <div
            key={career.id}
            className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 p-5 flex flex-col justify-between space-y-4 hover:-translate-y-0.5 transition-all shadow-md group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {career.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                  career.beginnerDifficulty === 'Easy' ? 'text-emerald-400' :
                  career.beginnerDifficulty === 'Moderate' ? 'text-indigo-400' : 'text-amber-400'
                }`}>
                  {career.beginnerDifficulty}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {career.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {career.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {career.requiredSkills.slice(0, 4).map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                    {s}
                  </span>
                ))}
                {career.requiredSkills.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px]">
                    +{career.requiredSkills.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Approx. Pay Range</span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ₹{career.approxSalaryMinLpa} - ₹{career.approxSalaryMaxLpa} LPA
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setActiveCareerDetail(career)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                >
                  Details
                </button>
                <button
                  onClick={() => onSelectCareerForRoadmap(career.id)}
                  className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                  title="Generate Roadmap"
                >
                  <Map className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
          <p className="text-sm">No career matches found for your filter criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="mt-2 text-xs text-indigo-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Career Detail Drawer / Modal */}
      {activeCareerDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                    {activeCareerDetail.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Curve: {activeCareerDetail.beginnerDifficulty}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  {activeCareerDetail.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCareerDetail(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Domain Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCareerDetail.description}
                </p>
              </div>

              {/* Multiple Routes Section */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Multiple Routes to This Career</span>
                </h4>
                <div className="space-y-3">
                  {activeCareerDetail.alternativeRoutes.map((route, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-400 font-mono">
                          {route.routeCode}: {route.title}
                        </span>
                        <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900">
                          {route.targetAudience}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300/90">{route.description}</p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {route.steps.map((step, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-indigo-300 font-medium">
                              {step}
                            </span>
                            {sIdx < route.steps.length - 1 && (
                              <span className="text-slate-600 text-xs">→</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Degrees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-white">Required Technical Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareerDetail.requiredSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-medium text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-semibold text-white">Compatible Degrees & Branches</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCareerDetail.compatibleDegrees.map((d) => (
                      <span key={d} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roles & Reference Compensation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-semibold text-white mb-1">Career Hierarchy Progression</h4>
                  <p className="text-slate-400 mb-1">Entry Level Roles:</p>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {activeCareerDetail.entryLevelRoles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <p className="text-slate-400 mt-2 mb-1">Advanced / Senior Roles:</p>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {activeCareerDetail.advancedRoles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-1">Reference Salary (India Tech Average)</h4>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 mt-2">
                    <span className="text-lg font-mono font-bold text-emerald-400 block">
                      ₹{activeCareerDetail.approxSalaryMinLpa} - ₹{activeCareerDetail.approxSalaryMaxLpa} LPA
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Source: {activeCareerDetail.salaryReferenceSource}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 italic">
                      Note: Actual compensation depends on skill proficiency, interview performance, and company tier.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectCareerForSkillGap(activeCareerDetail.id);
                  setActiveCareerDetail(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Analyze Skill Gap
              </button>

              <button
                onClick={() => {
                  onSelectCareerForRoadmap(activeCareerDetail.id);
                  setActiveCareerDetail(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Generate Roadmap for My Stage ({profile.educationLevel})</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
