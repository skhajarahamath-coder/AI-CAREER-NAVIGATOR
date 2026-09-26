import React, { useState } from 'react';
import { 
  GitCompare, 
  Plus, 
  X, 
  Check, 
  AlertCircle, 
  Layers, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Briefcase 
} from 'lucide-react';
import { CareerItem } from '../types';

interface CareerComparisonProps {
  careers: CareerItem[];
  defaultSelectedIds?: string[];
  onSelectForRoadmap: (careerId: string) => void;
}

export const CareerComparison: React.FC<CareerComparisonProps> = ({
  careers,
  defaultSelectedIds = ['c1', 'c2'],
  onSelectForRoadmap
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    defaultSelectedIds.length > 0 ? defaultSelectedIds.slice(0, 3) : ['c1', 'c2']
  );

  const selectedCareers = careers.filter((c) => selectedIds.includes(c.id));

  const handleAddCareer = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveCareer = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((cid) => cid !== id));
    }
  };

  const remainingCareers = careers.filter((c) => !selectedIds.includes(c.id));

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <GitCompare className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Side-by-Side Career Comparison
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Objective evaluation of requirements, learning curves, technical skills, project scopes, and career trajectories.
        </p>
      </div>

      {/* Select careers bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Comparing ({selectedCareers.length}/4):</span>
          {selectedCareers.map((c) => (
            <span 
              key={c.id}
              className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
            >
              <span className="font-medium">{c.title}</span>
              {selectedCareers.length > 1 && (
                <button
                  onClick={() => handleRemoveCareer(c.id)}
                  className="hover:text-red-400 ml-1.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>

        {selectedIds.length < 4 && remainingCareers.length > 0 && (
          <div className="flex items-center space-x-2">
            <select
              onChange={(e) => {
                if (e.target.value) handleAddCareer(e.target.value);
                e.target.value = '';
              }}
              defaultValue=""
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="" disabled>+ Add career to compare...</option>
              {remainingCareers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th className="p-4 text-xs font-mono uppercase text-slate-400 w-48 shrink-0">
                Evaluation Factor
              </th>
              {selectedCareers.map((c) => (
                <th key={c.id} className="p-4 min-w-[260px] border-l border-slate-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                      {c.category}
                    </span>
                    {selectedCareers.length > 1 && (
                      <button 
                        onClick={() => handleRemoveCareer(c.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-white">{c.title}</h3>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-xs">
            
            {/* Beginner Difficulty */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Beginner Difficulty & Curve
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    c.beginnerDifficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    c.beginnerDifficulty === 'Moderate' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {c.beginnerDifficulty}
                  </span>
                </td>
              ))}
            </tr>

            {/* Core Required Skills */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Core Technical Skills
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {c.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Education Eligibility & Degrees */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Compatible Degrees
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80 text-slate-300">
                  <ul className="list-disc list-inside space-y-0.5">
                    {c.compatibleDegrees.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Important Academic Subjects */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Key Academic Subjects
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80 text-slate-300">
                  {c.importantAcademicSubjects.join(', ')}
                </td>
              ))}
            </tr>

            {/* Entry Level Roles */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Possible Entry-Level Roles
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80 text-slate-300">
                  <ul className="list-disc list-inside space-y-0.5">
                    {c.entryLevelRoles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Long-Term Career Progression */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Long-Term Advanced Roles
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80 text-slate-300">
                  <ul className="list-disc list-inside space-y-0.5 text-amber-300/90">
                    {c.advancedRoles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Typical Project Types */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Typical Portfolio Project
              </td>
              {selectedCareers.map((c) => {
                const sampleProj = c.recommendedProjects[0];
                return (
                  <td key={c.id} className="p-4 border-l border-slate-800/80">
                    {sampleProj ? (
                      <div className="space-y-1">
                        <span className="font-bold text-white block">{sampleProj.title}</span>
                        <p className="text-slate-400 text-[11px] leading-tight">{sampleProj.description}</p>
                        <span className="text-[10px] text-indigo-400 font-mono block">
                          Stack: {sampleProj.technologies.join(', ')}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-500">Standard domain projects</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Certifications */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Recognized Certification
              </td>
              {selectedCareers.map((c) => {
                const sampleCert = c.recommendedCertifications[0];
                return (
                  <td key={c.id} className="p-4 border-l border-slate-800/80 text-slate-300">
                    {sampleCert ? (
                      <div>
                        <span className="font-semibold text-white block">{sampleCert.title}</span>
                        <span className="text-slate-400 text-[11px]">By {sampleCert.provider} ({sampleCert.level})</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">Standard credentials</span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Approximate Compensation Reference */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Approximate Reference Pay
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80">
                  <span className="text-sm font-mono font-bold text-emerald-400 block">
                    ₹{c.approxSalaryMinLpa} - ₹{c.approxSalaryMaxLpa} LPA
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {c.salaryReferenceSource}
                  </span>
                </td>
              ))}
            </tr>

            {/* Action Row */}
            <tr>
              <td className="p-4 font-semibold text-slate-300 bg-slate-950/40">
                Action
              </td>
              {selectedCareers.map((c) => (
                <td key={c.id} className="p-4 border-l border-slate-800/80">
                  <button
                    onClick={() => onSelectForRoadmap(c.id)}
                    className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
                  >
                    View Roadmap
                  </button>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Notice on Compensation Data:</strong> Salaries quoted are approximate reference ranges sourced from published tech industry reports (2024). Actual offers vary significantly by individual technical mastery, coding interviews, and geographic location.
        </p>
      </div>

    </div>
  );
};
