import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  X, 
  FileCode, 
  Copy, 
  Check, 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  Layers,
  Sparkles
} from 'lucide-react';

interface JavaCodeFile {
  path: string;
  title: string;
  lang: string;
  content: string;
}

interface JavaArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaArchitectureModal: React.FC<JavaArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [files, setFiles] = useState<JavaCodeFile[]>([]);
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/java-code')
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching java code:', err);
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (files[selectedFileIdx]?.content) {
      navigator.clipboard.writeText(files[selectedFileIdx].content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeFile = files[selectedFileIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white">
                  Java 21 & Spring Boot 3 Backend Architecture
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Maximum Java
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inspect complete production Spring Boot files from <span className="text-slate-300 font-mono">/backend-java</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Architecture Badges Strip */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-300 overflow-x-auto">
          <div className="flex items-center space-x-1 font-mono text-[11px] text-amber-400">
            <Server className="w-3.5 h-3.5" />
            <span>Java 21 + Spring Boot 3.3.x</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1 font-mono text-[11px] text-indigo-400">
            <Database className="w-3.5 h-3.5" />
            <span>Spring Data JPA + Hibernate + MySQL</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center space-x-1 font-mono text-[11px] text-emerald-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Pure Java Weighted Matching Engine (100% Score)</span>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* File Selector Sidebar */}
          <div className="w-full md:w-72 bg-slate-950/60 border-r border-slate-800 p-3 overflow-y-auto space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500 px-3 py-1 block">
              Java Backend Files
            </span>
            {files.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setSelectedFileIdx(idx)}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start space-x-2 ${
                  selectedFileIdx === idx
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${selectedFileIdx === idx ? 'text-indigo-400' : 'text-slate-500'}`} />
                <div className="truncate">
                  <span className="block font-medium truncate">{file.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono block truncate">{file.path}</span>
                </div>
              </button>
            ))}

            {/* Run Commands Info Box */}
            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block flex items-center space-x-1">
                <Terminal className="w-3 h-3" />
                <span>Maven Execution</span>
              </span>
              <pre className="p-2 rounded bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto">
                cd backend-java{"\n"}mvn spring-boot:run
              </pre>
            </div>
          </div>

          {/* Code Viewer Pane */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* File Path & Copy Bar */}
            <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 truncate">
                {activeFile?.path || 'Loading...'}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy File'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-5 overflow-auto font-mono text-xs text-slate-200 leading-relaxed scrollbar-thin">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Loading Java codebase...
                </div>
              ) : (
                <pre className="text-[12px] leading-6 select-text whitespace-pre font-mono">
                  {activeFile?.content || '// File not found'}
                </pre>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>All files reside in <strong className="text-white">/backend-java</strong> in the workspace.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
