import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Map, 
  ExternalLink, 
  HelpCircle, 
  Layers, 
  Code2, 
  BarChart3,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { StudentProfile, ScoredCareerResult } from '../types';

interface DashboardProps {
  profile: StudentProfile;
  matches: ScoredCareerResult[];
  onSelectCareerForRoadmap: (careerId: string) => void;
  onSelectCareerForSkillGap: (careerId: string) => void;
  onNavigateToTab: (tab: string) => void;
  onOpenAiExplainer: (careerId: string, breakdown: any) => void;
  onRetakeOnboarding: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  matches,
  onSelectCareerForRoadmap,
  onSelectCareerForSkillGap,
  onNavigateToTab,
  onOpenAiExplainer,
  onRetakeOnboarding
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(matches[0]?.career.id || null);

  const topMatches = matches.slice(0, 5);

  const isSchoolStudent = profile.educationLevel === '10th' || profile.educationLevel === 'Intermediate / 12th';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero / Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-Factor Recommendation Engine Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Adaptive Career Trajectory for <span className="bg-gradient-to-r from-indigo-400 to-amber-300 bg-clip-text text-transparent">{profile.educationLevel}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
              Based on your academic performance, stated interests in <strong className="text-indigo-300">{profile.interests.slice(0, 3).join(', ')}</strong>, and goals, the Java rule engine evaluated <strong className="text-white">{matches.length}</strong> possible career options.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                Tier: {profile.stream || profile.branch || profile.degreeSpecialization || profile.educationLevel}
              </span>
              {profile.currentYear && (
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  Year: {profile.currentYear}
                </span>
              )}
              {profile.cgpaPercentage && (
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  CGPA: {profile.cgpaPercentage} / 10
                </span>
              )}
              <button 
                onClick={onRetakeOnboarding}
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 ml-1"
              >
                Change details
              </button>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-row md:flex-col gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 min-w-[140px] text-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Top Match</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {topMatches[0]?.breakdown.totalMatchScore || 90}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Profile Match</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 min-w-[140px] text-center">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Paths Analyzed</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {matches.length}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Viable Trajectories</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Product Principle Notice */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Product Transparency Principle:</strong> We never tell you <em>"You must become X"</em>. Instead, our transparent Java matching engine analyzes your chosen interests, current eligibility, goals, and academic performance to highlight paths with the highest historical and practical alignment. You are always in control of exploring alternative routes.
        </div>
      </div>

      {/* SECTION: Top Career Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Recommended Career Paths
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Top 5 of {matches.length}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ranked strictly by the calculated Profile Match Score from the Java recommendation engine
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('careers')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
          >
            <span>Explore all {matches.length} careers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Career Cards List */}
        <div className="space-y-3.5">
          {topMatches.map((item, idx) => {
            const { career, breakdown } = item;
            const isExpanded = expandedCardId === career.id;

            return (
              <div
                key={career.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedCardId(isExpanded ? null : career.id)}
                  className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-base text-white hover:text-indigo-300 transition-colors">
                          {career.title}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {career.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          career.beginnerDifficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                          career.beginnerDifficulty === 'Moderate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {career.beginnerDifficulty} Learning Curve
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-2xl">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  {/* Score Badge and Toggle */}
                  <div className="flex items-center space-x-4 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="flex items-baseline justify-end space-x-1">
                        <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                          {breakdown.totalMatchScore}%
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide block">
                        Profile Match Score
                      </span>
                    </div>
                    <div className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details & Transparent Factor Breakdown */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-5 bg-slate-950/40">
                    
                    {/* Transparent Factor Score Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Transparent Java Weighted Score Calculation:</span>
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">Total: {breakdown.totalMatchScore} / 100</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Interest Match</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.interestScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 30</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.interestScore / 30) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Education Match</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.educationScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 20</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.educationScore / 20) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Skill Match</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.skillScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 20</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.skillScore / 20) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Goal Match</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.goalScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 10</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.goalScore / 10) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Academic Match</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.academicScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 10</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.academicScore / 10) * 100}%` }}></div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Experience / Projects</span>
                          <div className="flex items-baseline space-x-1">
                            <span className="font-mono font-bold text-sm text-indigo-300">{breakdown.experienceScore}</span>
                            <span className="text-[10px] text-slate-500 font-mono">/ 10</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${(breakdown.experienceScore / 10) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights from the Engine */}
                    {breakdown.highlights.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/90">
                        <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                          Why this matches your specific inputs:
                        </span>
                        <ul className="space-y-1">
                          {breakdown.highlights.map((h, i) => (
                            <li key={i} className="text-xs text-slate-300/90 flex items-start space-x-2">
                              <span className="text-emerald-400 shrink-0">✓</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 block mb-1 font-medium">Core Skills Required</span>
                        <div className="flex flex-wrap gap-1">
                          {career.requiredSkills.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 block mb-1 font-medium">Approximate Reference Compensation</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono font-bold text-emerald-400">
                            ₹{career.approxSalaryMinLpa} - ₹{career.approxSalaryMaxLpa} LPA
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {career.salaryReferenceSource}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => onSelectCareerForRoadmap(career.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm shadow-indigo-500/20"
                        >
                          <Map className="w-3.5 h-3.5" />
                          <span>View Personalized Roadmap</span>
                        </button>

                        <button
                          onClick={() => onSelectCareerForSkillGap(career.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 border border-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Skill Gap Analysis</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onOpenAiExplainer(career.id, breakdown)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Ask Gemini Counselor</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div 
          onClick={() => onNavigateToTab('comparison')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all hover:-translate-y-0.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
            Career Comparison Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Compare 2 to 4 careers side-by-side: education, entry roles, learning curves, and progression.
          </p>
        </div>

        <div 
          onClick={() => onNavigateToTab('projects')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all hover:-translate-y-0.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
            Projects & Certifications
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Curated, real-world portfolio project architectures and verified certification tracks tailored to your goals.
          </p>
        </div>

        <div 
          onClick={() => onNavigateToTab('resume')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all hover:-translate-y-0.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
            Resume Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Analyze your resume text against your target career to uncover missing competencies and high-impact tweaks.
          </p>
        </div>
      </div>

    </div>
  );
};
