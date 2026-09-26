import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  GitBranch, 
  Clock, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { CareerItem, StudentProfile, RoadmapStageItem } from '../types';

interface RoadmapViewProps {
  career: CareerItem;
  profile: StudentProfile;
  stages: RoadmapStageItem[];
  allCareers: CareerItem[];
  onSelectCareer: (careerId: string) => void;
  onNavigateToSkillGap: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  career,
  profile,
  stages,
  allCareers,
  onSelectCareer,
  onNavigateToSkillGap
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);

  const toggleStep = (stageNum: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / Math.max(1, stages.length)) * 100);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Career Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
              Personalized for {profile.educationLevel}
            </span>
            <span className="text-xs text-slate-400">
              Target: {career.entryLevelRoles[0] || career.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            {career.title} Learning Roadmap
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic stage progression generated specifically for your starting point: <strong className="text-white">{profile.educationLevel}</strong>
          </p>
        </div>

        {/* Quick Career Selector Dropdown */}
        <div className="flex items-center space-x-2 shrink-0">
          <label className="text-xs text-slate-400">Switch Target:</label>
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

      {/* Progress Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-semibold text-white">Your Milestone Completion</h3>
          <p className="text-xs text-slate-400">
            Check off stages as you master curriculum topics and build portfolio projects
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-36 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="font-mono text-sm font-bold text-white">
            {completedCount}/{stages.length} ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* MULTIPLE ROUTES ACCORDION / TABS */}
      {career.alternativeRoutes && career.alternativeRoutes.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">
                Multiple Routes to Becoming a {career.title}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Select route to preview</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {career.alternativeRoutes.map((route, rIdx) => (
              <button
                key={rIdx}
                onClick={() => setActiveRouteIndex(rIdx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeRouteIndex === rIdx
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">
                  {route.routeCode}
                </span>
                <span className="text-xs font-semibold block mt-0.5">{route.title}</span>
                <span className="text-[10px] text-slate-400 mt-1 block truncate">
                  Audience: {route.targetAudience}
                </span>
              </button>
            ))}
          </div>

          {/* Active Route Step Sequence Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                {career.alternativeRoutes[activeRouteIndex].title} Overview:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {career.alternativeRoutes[activeRouteIndex].targetAudience}
              </span>
            </div>
            <p className="text-xs text-slate-300/90 leading-relaxed">
              {career.alternativeRoutes[activeRouteIndex].description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {career.alternativeRoutes[activeRouteIndex].steps.map((st, i) => (
                <React.Fragment key={i}>
                  <span className="text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-medium">
                    {st}
                  </span>
                  {i < career.alternativeRoutes[activeRouteIndex].steps.length - 1 && (
                    <span className="text-slate-600 text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADAPTIVE STAGES TIMELINE */}
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Detailed Stage-by-Stage Curriculum
          </h2>
          <p className="text-xs text-slate-400">
            Tailored specifically for students starting at {profile.educationLevel}
          </p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
          {stages.map((stage) => {
            const isDone = !!completedSteps[stage.stageNumber];

            return (
              <div key={stage.stageNumber} className="relative group">
                
                {/* Timeline Dot Indicator */}
                <div 
                  onClick={() => toggleStep(stage.stageNumber)}
                  className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center ${
                    isDone 
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30' 
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-indigo-400'
                  }`}
                  title="Click to toggle completed stage"
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-mono">{stage.stageNumber}</span>}
                </div>

                {/* Stage Content Card */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  isDone 
                    ? 'bg-emerald-950/20 border-emerald-500/30' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-400 font-mono">
                        STAGE {stage.stageNumber}
                      </span>
                      <h3 className="font-bold text-base text-white">{stage.stageTitle}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="font-mono">{stage.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-medium mb-3">
                    <strong className="text-indigo-300">Core Focus:</strong> {stage.focus}
                  </p>

                  {/* Topics to Learn */}
                  <div className="space-y-2 mb-3">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Curriculum Topics to Master:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.topics.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-800/90 text-slate-200 text-xs border border-slate-700/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Practical Deliverables & Actions:
                    </span>
                    <ul className="space-y-1">
                      {stage.actionItems.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                          <span className="text-indigo-400">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Toggle button */}
                  <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={() => toggleStep(stage.stageNumber)}
                      className={`text-xs font-semibold flex items-center space-x-1.5 ${
                        isDone ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Marked as Complete</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5" />
                          <span>Mark Stage Complete</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={onNavigateToSkillGap}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      Check skill gap for this career →
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
