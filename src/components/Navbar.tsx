import React from 'react';
import { 
  Compass, 
  Layers, 
  GitCompare, 
  Map, 
  FileText, 
  MessageSquare, 
  Code2, 
  CheckCircle2, 
  UserCheck,
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: StudentProfile;
  onRetakeOnboarding: () => void;
  onOpenJavaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onRetakeOnboarding,
  onOpenJavaModal
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'careers', label: 'Careers', icon: Layers },
    { id: 'comparison', label: 'Compare', icon: GitCompare },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'skills', label: 'Skill Gap', icon: CheckCircle2 },
    { id: 'projects', label: 'Projects & Certs', icon: BookOpen },
    { id: 'resume', label: 'Resume Analyzer', icon: FileText },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  AI Career Navigator
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Java 21 Core
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Adaptive Career Guidance & Weighted Matching Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Java Code Inspector Trigger */}
            <button
              onClick={onOpenJavaModal}
              title="Inspect Java 21 Spring Boot Codebase"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-sm"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Java Engine</span>
            </button>

            {/* Current Profile Education Badge */}
            <div 
              onClick={onRetakeOnboarding}
              className="group flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
              title="Click to change education level or update profile"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] block text-slate-400 leading-none">Education Tier</span>
                <span className="text-xs font-semibold text-white leading-none group-hover:text-indigo-300 transition-colors">
                  {profile.educationLevel}
                </span>
              </div>
              <RotateCcw className="w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Scroll */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-900 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
