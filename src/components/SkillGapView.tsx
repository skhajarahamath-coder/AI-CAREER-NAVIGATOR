import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  GraduationCap,
  Layers,
  Code2
} from 'lucide-react';
import { CareerItem, StudentProfile, SkillGapResult } from '../types';

interface SkillGapViewProps {
  career: CareerItem;
  profile: StudentProfile;
  report: SkillGapResult;
  allCareers: CareerItem[];
  onSelectCareer: (careerId: string) => void;
  onNavigateToProjects: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  career,
  profile,
  report,
  allCareers,
  onSelectCareer,
  onNavigateToProjects
}) => {
  const isSchool = report.isSchoolStudent;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Career Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              Skill Alignment Analysis
            </span>
            <span className="text-xs text-slate-400">
              Target Career: {career.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Skill Gap & Learning Sequence
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparing your current abilities against industry prerequisites for <strong className="text-white">{career.title}</strong>
          </p>
        </div>

        {/* Quick Career Selector Dropdown */}
        <div className="flex items-center space-x-2 shrink-0">
          <label className="text-xs text-slate-400">Target Career:</label>
          <select
            value={career.id}
            onChange={(e) => onSelectCareer(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {allCareers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Readiness Meter */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-xs font-mono uppercase text-indigo-400 font-semibold">
            {isSchool ? 'Foundation Readiness Score' : 'Technical Skill Coverage'}
          </span>
          <h2 className="text-xl font-bold text-white">
            {isSchool ? (
              <span>Foundations Aligned for Long-Term Mastery</span>
            ) : (
              <span>
                You currently possess {report.matchedSkills.length} of {career.requiredSkills.length} industry skills
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-300/90 leading-relaxed">
            {isSchool
              ? 'As a school student, our recommendation engine evaluates your analytical curiosity and academic strengths rather than requiring professional tools.'
              : 'Our Java gap engine analyzed your profile skills against verified job descriptions to sequence your optimal next learning steps.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-[150px]">
          <span className="text-3xl font-black font-mono text-emerald-400">
            {report.readinessPercentage}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1 uppercase tracking-wider font-mono">
            {isSchool ? 'Readiness Score' : 'Skill Coverage'}
          </span>
        </div>
      </div>

      {/* SCHOOL STUDENT FLOW: "Skills to develop later" without penalty */}
      {isSchool ? (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300/90 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-1">Adaptive Guidance for {profile.educationLevel}:</strong>
              We do not show missing professional enterprise tools (like Spring Boot, Git, or Docker) for school students because those are learned during higher education. Instead, here are the core cognitive foundations you should cultivate now, followed by skills to develop later.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foundational Skills for School */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Immediate Foundations to Build Now (School Stage)</span>
              </h3>
              <ul className="space-y-2 text-xs">
                {report.learningSequence.map((item, i) => (
                  <li key={i} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-200 flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills to Develop Later */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Professional Skills to Develop Later in College</span>
              </h3>
              <p className="text-xs text-slate-400">
                You will master these technologies during your future undergraduate degree (B.Tech / BCA):
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {report.skillsToDevelopLater.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* COLLEGE STUDENT FLOW: Current vs Required Skills + Sequenced Order */
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Possessed / Matched Skills */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Skills You Currently Possess ({report.matchedSkills.length})</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  Verified In Profile
                </span>
              </div>

              {report.matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {report.matchedSkills.map((s, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1"
                    >
                      <span>✓</span>
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No overlapping skills currently listed. Add more technical skills in the questionnaire or review the missing skills below!
                </p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Identified Missing Competencies ({report.missingSkills.length})</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                  Industry Gap
                </span>
              </div>

              {report.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {report.missingSkills.map((s, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center space-x-1"
                    >
                      <span>+</span>
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300">
                  🎉 Fantastic! You possess all primary technical skills required for this career!
                </div>
              )}
            </div>

          </div>

          {/* Recommended Learning Sequence */}
          {report.learningSequence.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Step-by-Step Learning Priority Order</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The Java engine sequenced these missing competencies in logical dependency order: Core Foundations → Frameworks → Databases & Cloud.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {report.learningSequence.map((skill, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/30">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{skill}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {idx === 0 ? 'Highest priority foundation' : `Milestone #${idx + 1} to build toward`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onNavigateToProjects}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/20"
                >
                  <span>Explore Capstone Projects to Master These Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
