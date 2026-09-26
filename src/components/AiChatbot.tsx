import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  RefreshCw, 
  HelpCircle,
  Compass
} from 'lucide-react';
import { StudentProfile } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AiChatbotProps {
  profile: StudentProfile;
}

const SAMPLE_PROMPTS = [
  'What can I do after Intermediate MPC?',
  'I know Java and SQL. What career paths can I explore?',
  'What should I learn to become a backend developer?',
  'Can I transition from a BCA degree into Artificial Intelligence?',
  'What capstone projects should I build for software engineer placements?'
];

export const AiChatbot: React.FC<AiChatbotProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Hello! I am your AI Career Counselor. I have loaded your current profile (${profile.educationLevel}, interests in ${profile.interests.slice(0, 2).join(', ')}).\n\nAsk me anything about college admissions, learning paths, project ideas, or transitioning between domains!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!res.ok) {
        throw new Error('Failed to get counselor response');
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `For your stage (${profile.educationLevel}), focus on building strong foundational skills in programming, math, or your core stream. Check your personalized roadmap for structured milestones!`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI Career Assistant
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Grounded in your current academic level ({profile.educationLevel}) and career preferences.
        </p>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[580px]">
        
        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-200'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Generating personalized career advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-slate-500 uppercase font-mono shrink-0">Try asking:</span>
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 hover:border-slate-600 transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question (e.g. "What after ${profile.educationLevel}?", "Which skills to learn first?")...`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
