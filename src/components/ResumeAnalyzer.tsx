import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  RefreshCw,
  Copy
} from 'lucide-react';
import { CareerItem } from '../types';

interface ResumeAnalyzerProps {
  careers: CareerItem[];
  defaultCareerId?: string;
}

const SAMPLE_RESUME_TEXT = `John Doe
Email: john.doe@example.com | Phone: +91 9876543210 | Bangalore, India
GitHub: github.com/johndoe | LinkedIn: linkedin.com/in/johndoe

EDUCATION
B.Tech in Computer Science and Engineering (2021 - 2025)
ABC Institute of Technology, CGPA: 8.4 / 10

TECHNICAL SKILLS
Languages: Java, SQL, Python (Basics), HTML, CSS, JavaScript
Frameworks & Tools: Spring Boot, Git, Postman, MySQL, Maven
Concepts: Data Structures & Algorithms, Object-Oriented Programming, Database Management

PROJECTS
1. Online Banking Transaction System
- Architected RESTful APIs using Spring Boot and Java 21 for secure inter-account fund transfers.
- Integrated Spring Security with JWT tokens and validated input with Hibernate Validator.
- Configured MySQL database with indexed transactions and ACID compliance.

2. Student Management Portal
- Developed full-stack CRUD web application with Java, Spring Data JPA, and Thymeleaf.
- Implemented search filters and automated PDF report generation.

CERTIFICATIONS
- Oracle Certified Associate, Java SE 8 Programmer`;

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  careers,
  defaultCareerId = 'c1'
}) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [selectedCareerId, setSelectedCareerId] = useState(defaultCareerId);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    detectedSkills: string[];
    detectedEducation: string;
    strengths: string[];
    gaps: string[];
    suggestions: string[];
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const targetCareer = careers.find((c) => c.id === selectedCareerId) || careers[0];

  const handleAnalyze = async () => {
    if (!resumeText.trim() || resumeText.trim().length < 20) {
      setErrorMsg('Please paste your resume text (at least 20 characters).');
      return;
    }

    setErrorMsg(null);
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/resume-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetCareerTitle: targetCareer.title
        })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while analyzing resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = () => {
    setResumeText(SAMPLE_RESUME_TEXT);
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI-Powered Resume Gap Analyzer
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Paste your resume text to extract skills, compare against your target career, and receive concrete enhancement suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white">Target Career Path</label>
              <button 
                onClick={loadSample}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline"
              >
                Load Sample Resume
              </button>
            </div>

            <select
              value={selectedCareerId}
              onChange={(e) => setSelectedCareerId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-white">Resume Text</label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {resumeText.length} characters
                </span>
              </div>
              <textarea
                rows={14}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              ></textarea>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing Resume Against {targetCareer.title}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Analyze Resume with AI</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Output Report */}
        <div className="lg:col-span-6 space-y-4">
          {analysisResult ? (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 animate-in fade-in duration-300">
              
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    Analysis Completed
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    Resume vs {targetCareer.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Edu: {analysisResult.detectedEducation}
                </span>
              </div>

              {/* Detected Skills */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Detected Key Competencies ({analysisResult.detectedSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.detectedSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile Strengths</span>
                </span>
                <ul className="space-y-1.5">
                  {analysisResult.strengths.map((str, i) => (
                    <li key={i} className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      {str}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Areas to Bolster for {targetCareer.title}</span>
                </span>
                <ul className="space-y-1.5">
                  {analysisResult.gaps.map((gap, i) => (
                    <li key={i} className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actionable Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-indigo-300 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Actionable Enhancement Suggestions</span>
                </span>
                <ul className="space-y-1.5">
                  {analysisResult.suggestions.map((sug, i) => (
                    <li key={i} className="text-xs text-slate-200 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20">
                      ▸ {sug}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[360px] p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">No Resume Analyzed Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Paste your resume on the left and click <strong>"Analyze Resume with AI"</strong> to see parsed skills, competitive gaps, and improvement suggestions.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
