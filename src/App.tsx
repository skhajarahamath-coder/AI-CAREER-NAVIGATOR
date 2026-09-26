import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CareerExplorer } from './components/CareerExplorer';
import { CareerComparison } from './components/CareerComparison';
import { RoadmapView } from './components/RoadmapView';
import { SkillGapView } from './components/SkillGapView';
import { ProjectsAndCerts } from './components/ProjectsAndCerts';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { AiChatbot } from './components/AiChatbot';
import { OnboardingModal } from './components/OnboardingModal';
import { JavaArchitectureModal } from './components/JavaArchitectureModal';
import { 
  StudentProfile, 
  CareerItem, 
  ScoredCareerResult, 
  RoadmapStageItem, 
  SkillGapResult 
} from './types';
import { Sparkles, X, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isJavaModalOpen, setIsJavaModalOpen] = useState<boolean>(false);

  // Profile State
  const [profile, setProfile] = useState<StudentProfile>({
    educationLevel: 'B.Tech / B.E',
    branch: 'Computer Science and Engineering',
    currentYear: '3rd Year',
    cgpaPercentage: 8.4,
    backlogs: 0,
    academicPerformance: 'Good',
    mathPerformance: 'Strong',
    sciencePerformance: 'Strong',
    englishPerformance: 'Strong',
    favoriteSubjects: ['Mathematics', 'Computer Science'],
    interests: ['Coding', 'Problem Solving', 'Cloud', 'Algorithms'],
    personalityTraits: ['Analytical', 'Practical/hands-on work'],
    careerGoals: ['High Salary', 'MNC Placements', 'Remote Work'],
    technicalSkills: ['Java', 'SQL', 'Git', 'HTML & CSS'],
    projectCount: 2,
    workEnvironmentPref: 'Hybrid',
    higherEdPref: 'Immediate Job',
    govtPrivatePref: 'Private MNC'
  });

  // Data States
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [matches, setMatches] = useState<ScoredCareerResult[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('c1');
  const [roadmapStages, setRoadmapStages] = useState<RoadmapStageItem[]>([]);
  const [skillGapReport, setSkillGapReport] = useState<SkillGapResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // AI Counselor Explainer Modal state
  const [aiExplanationCareer, setAiExplanationCareer] = useState<CareerItem | null>(null);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);
  const [aiExplanationLoading, setAiExplanationLoading] = useState<boolean>(false);

  // Initial Data Fetch
  useEffect(() => {
    fetchInitialData(profile);
  }, []);

  const fetchInitialData = async (activeProfile: StudentProfile) => {
    setLoading(true);
    try {
      // 1. Fetch all careers
      const careersRes = await fetch('/api/careers');
      const careersData: CareerItem[] = await careersRes.json();
      setCareers(careersData);

      // 2. Evaluate matches using Java Recommendation Engine
      const recRes = await fetch('/api/recommendations/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: activeProfile, limit: 10 })
      });
      const recData = await recRes.json();
      setMatches(recData.allMatches || []);

      const initialCareerId = recData.allMatches[0]?.career.id || careersData[0]?.id || 'c1';
      setSelectedCareerId(initialCareerId);

      // 3. Fetch initial roadmap & skill gap
      await fetchRoadmapAndSkillGap(initialCareerId, activeProfile);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoadmapAndSkillGap = async (careerId: string, currentProfile: StudentProfile) => {
    try {
      const [roadRes, gapRes] = await Promise.all([
        fetch(`/api/recommendations/roadmap/${careerId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: currentProfile })
        }),
        fetch(`/api/recommendations/skill-gap/${careerId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: currentProfile })
        })
      ]);

      if (roadRes.ok) {
        const roadData = await roadRes.json();
        setRoadmapStages(roadData.stages || []);
      }
      if (gapRes.ok) {
        const gapData = await gapRes.json();
        setSkillGapReport(gapData.report || null);
      }
    } catch (err) {
      console.error('Error fetching roadmap or skill gap:', err);
    }
  };

  const handleSaveProfile = async (newProfile: StudentProfile) => {
    setProfile(newProfile);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
      await fetchInitialData(newProfile);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleSelectCareerForRoadmap = (careerId: string) => {
    setSelectedCareerId(careerId);
    fetchRoadmapAndSkillGap(careerId, profile);
    setActiveTab('roadmap');
  };

  const handleSelectCareerForSkillGap = (careerId: string) => {
    setSelectedCareerId(careerId);
    fetchRoadmapAndSkillGap(careerId, profile);
    setActiveTab('skills');
  };

  const handleOpenAiExplainer = async (careerId: string, breakdown: any) => {
    const career = careers.find((c) => c.id === careerId);
    if (!career) return;

    setAiExplanationCareer(career);
    setAiExplanationLoading(true);
    setAiExplanationText(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId,
          profile,
          breakdown
        })
      });
      const data = await res.json();
      setAiExplanationText(data.explanation);
    } catch (err) {
      setAiExplanationText(
        `Based on your stated background (${profile.educationLevel}) and interests (${profile.interests.slice(0, 3).join(', ')}), ${career.title} demonstrates strong domain alignment. Focus on mastering the key roadmap milestones.`
      );
    } finally {
      setAiExplanationLoading(false);
    }
  };

  const activeCareer = careers.find((c) => c.id === selectedCareerId) || careers[0] || ({} as CareerItem);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onRetakeOnboarding={() => setIsOnboardingOpen(true)}
        onOpenJavaModal={() => setIsJavaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Running Java Career Recommendation Engine...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                profile={profile}
                matches={matches}
                onSelectCareerForRoadmap={handleSelectCareerForRoadmap}
                onSelectCareerForSkillGap={handleSelectCareerForSkillGap}
                onNavigateToTab={(tab) => setActiveTab(tab)}
                onOpenAiExplainer={handleOpenAiExplainer}
                onRetakeOnboarding={() => setIsOnboardingOpen(true)}
              />
            )}

            {activeTab === 'careers' && (
              <CareerExplorer
                careers={careers}
                profile={profile}
                onSelectCareerForRoadmap={handleSelectCareerForRoadmap}
                onSelectCareerForSkillGap={handleSelectCareerForSkillGap}
              />
            )}

            {activeTab === 'comparison' && (
              <CareerComparison
                careers={careers}
                defaultSelectedIds={[matches[0]?.career.id || 'c1', matches[1]?.career.id || 'c2']}
                onSelectForRoadmap={handleSelectCareerForRoadmap}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapView
                career={activeCareer}
                profile={profile}
                stages={roadmapStages}
                allCareers={careers}
                onSelectCareer={(id) => {
                  setSelectedCareerId(id);
                  fetchRoadmapAndSkillGap(id, profile);
                }}
                onNavigateToSkillGap={() => setActiveTab('skills')}
              />
            )}

            {activeTab === 'skills' && skillGapReport && (
              <SkillGapView
                career={activeCareer}
                profile={profile}
                report={skillGapReport}
                allCareers={careers}
                onSelectCareer={(id) => {
                  setSelectedCareerId(id);
                  fetchRoadmapAndSkillGap(id, profile);
                }}
                onNavigateToProjects={() => setActiveTab('projects')}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsAndCerts
                career={activeCareer}
                profile={profile}
                allCareers={careers}
                onSelectCareer={(id) => {
                  setSelectedCareerId(id);
                  fetchRoadmapAndSkillGap(id, profile);
                }}
              />
            )}

            {activeTab === 'resume' && (
              <ResumeAnalyzer
                careers={careers}
                defaultCareerId={selectedCareerId}
              />
            )}

            {activeTab === 'chat' && (
              <AiChatbot profile={profile} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">AI Career Navigator</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
              Java 21 + Spring Boot 3 + MySQL
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Adaptive Guidance • Rule/Weighted Recommendation Engine • Gemini AI Guidance
          </p>
          <button
            onClick={() => setIsJavaModalOpen(true)}
            className="text-xs text-amber-400 hover:text-amber-300 font-mono underline"
          >
            View Spring Boot Codebase
          </button>
        </div>
      </footer>

      {/* Adaptive Onboarding Modal */}
      <OnboardingModal
        initialProfile={profile}
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      {/* Java Architecture Modal */}
      <JavaArchitectureModal
        isOpen={isJavaModalOpen}
        onClose={() => setIsJavaModalOpen(false)}
      />

      {/* AI Counselor Explanation Dialog */}
      {aiExplanationCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    AI Career Counselor Analysis
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Why {aiExplanationCareer.title} matches your profile
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAiExplanationCareer(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto">
              {aiExplanationLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-2 text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
                  <span>Synthesizing counselor insights with Gemini...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  {aiExplanationText}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setAiExplanationCareer(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
