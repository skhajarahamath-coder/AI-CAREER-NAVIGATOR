import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Code2, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { CareerItem, StudentProfile } from '../types';

interface ProjectsAndCertsProps {
  career: CareerItem;
  profile: StudentProfile;
  allCareers: CareerItem[];
  onSelectCareer: (careerId: string) => void;
}

export const ProjectsAndCerts: React.FC<ProjectsAndCertsProps> = ({
  career,
  profile,
  allCareers,
  onSelectCareer
}) => {
  const isSchool = profile.educationLevel === '10th' || profile.educationLevel === 'Intermediate / 12th';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
              Applied Experience Hub
            </span>
            <span className="text-xs text-slate-400">
              Domain: {career.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Projects & Recognized Certifications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build real-world portfolio proof and earn verified industry credentials for <strong className="text-white">{career.title}</strong>
          </p>
        </div>

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

      {/* School Student Notice */}
      {isSchool && (
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start space-x-3">
          <GraduationCap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-1">Notice for High School Students ({profile.educationLevel}):</strong>
            You are not expected to build large enterprise microservices yet! The projects below are designed as guided exploration tasks and mini coding exercises to help you discover what engineers do day-to-day.
          </div>
        </div>
      )}

      {/* SECTION: Recommended Projects */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>Recommended Portfolio Projects for {career.title}</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-world project architectures favored by technical interviewers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {career.recommendedProjects.map((proj, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Project #{idx + 1}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    proj.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    proj.difficulty === 'Intermediate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {proj.difficulty} Level
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{proj.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-500 block mb-1 font-mono uppercase">
                  Suggested Technologies
                </span>
                <div className="flex flex-wrap gap-1">
                  {proj.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[11px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: Recommended Certifications */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Targeted Industry Certifications</span>
          </h2>
          <p className="text-xs text-slate-400">
            Verified credential programs from recognized vendors (Oracle, AWS, Google, CompTIA, etc.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {career.recommendedCertifications.map((cert, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {cert.category}
                  </span>
                  <span className="text-[10px] text-amber-400 font-medium">
                    {cert.level}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white">{cert.title}</h3>
                <p className="text-xs text-slate-400">
                  Issued by: <strong className="text-slate-200">{cert.provider}</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Verified Curriculum</span>
                <span className="text-emerald-400 text-xs font-mono">✓ High Value</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
