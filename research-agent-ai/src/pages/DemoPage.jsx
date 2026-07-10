import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, BookOpen, Quote, TrendingUp, FileText, Bot, User, Loader2 } from 'lucide-react';
import { aiResponses } from '../data/sampleData';

const quickActions = [
  { label: 'Summarize', key: 'summarize', icon: BookOpen, color: '#2563EB' },
  { label: 'Find Papers', key: 'findPapers', icon: FileText, color: '#06B6D4' },
  { label: 'Generate References', key: 'references', icon: Quote, color: '#8B5CF6' },
  { label: 'Predict Trends', key: 'predictTrends', icon: TrendingUp, color: '#22C55E' },
  { label: 'Literature Review', key: 'literatureReview', icon: Sparkles, color: '#F59E0B' },
];

function TypingMessage({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [text]);

  // Simple markdown-like rendering
  const renderText = (t) => t.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} className="text-white font-bold text-base mt-3 mb-1">{line.slice(3)}</h3>;
    if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="text-white">{line.slice(2, -2)}</strong>;
    const bold = line.replace(/\*\*(.+?)\*\*/g, '<span class="font-semibold text-blue-300">$1</span>');
    return <p key={i} className="text-[#94A3B8] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />;
  });

  return <div className="space-y-1">{renderText(displayed)}</div>;
}

export default function DemoPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm Research Agent AI, powered by IBM Watsonx and Granite models. I can help you summarize papers, find citations, generate literature reviews, and predict research trends. What would you like to explore?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text, key) => {
    if (!text.trim() && !key) return;
    const query = text || `${key} my research`;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const response = key ? aiResponses[key] : aiResponses.summarize;
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="tag inline-block mb-4">Live Demo</div>
          <h1 className="text-4xl font-bold text-white mb-3">Ask Your Research Agent</h1>
          <p className="text-[#94A3B8]">Powered by IBM Watsonx Granite · RAG Pipeline · Multi-Agent Orchestration</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Quick Action Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-6 justify-center">
            {quickActions.map(({ label, key, icon: Icon, color }) => (
              <button
                key={key}
                onClick={() => sendMessage('', key)}
                disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-medium transition-all hover:scale-105 disabled:opacity-50"
                style={{ borderColor: color + '40', color, background: color + '12' }}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </motion.div>

          {/* Chat Window */}
          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Research Agent AI</div>
                <div className="text-[#94A3B8] text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  IBM Watsonx Granite · Active
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white'
                      : 'bg-white/3 border border-white/8'
                  }`}>
                    {msg.role === 'ai' && i === messages.length - 1 && !loading
                      ? <TypingMessage text={msg.text} />
                      : <div className="text-[#94A3B8] text-sm whitespace-pre-line">{msg.text}</div>
                    }
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={12} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-xl p-3 flex items-center gap-2">
                    <Loader2 size={14} className="text-blue-400 animate-spin" />
                    <span className="text-[#94A3B8] text-xs">IBM Granite is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-3">
                <input
                  className="input-dark flex-1"
                  placeholder="Ask anything about your research..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input, null)}
                />
                <button
                  onClick={() => sendMessage(input, null)}
                  disabled={!input.trim() || loading}
                  className="btn-primary !px-4 !py-2.5 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[#475569] text-xs mt-2">Powered by IBM Watsonx Granite · Connect IBM_API_KEY for live responses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
