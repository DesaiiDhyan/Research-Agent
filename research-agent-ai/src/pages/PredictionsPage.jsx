import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, AlertCircle, BookOpen, Clock, Sparkles } from 'lucide-react';
import { emergingTopics } from '../data/sampleData';

const researchGaps = [
  {
    title: 'Quantum ML + Transformers',
    description: 'Only 234 papers exist at the intersection of quantum computing and transformer architectures. High opportunity area.',
    citations: 234,
    severity: 'high',
    opportunity: 'Quantum attention mechanisms for exponential speedup',
  },
  {
    title: 'Energy-Efficient Foundation Models',
    description: 'Growing concern about environmental impact of large models. Only 12% of papers address energy efficiency.',
    citations: 680,
    severity: 'high',
    opportunity: 'Model compression and sparse architectures',
  },
  {
    title: 'Neuromorphic AI Integration',
    description: 'Brain-inspired computing integrated with deep learning remains largely unexplored.',
    citations: 89,
    severity: 'medium',
    opportunity: 'Hybrid spike neural networks with LLMs',
  },
  {
    title: 'Cross-Lingual RAG Systems',
    description: 'RAG systems for low-resource languages lack adequate research coverage.',
    citations: 156,
    severity: 'medium',
    opportunity: 'Multilingual vector embeddings and retrieval',
  },
];

const futurePapers = [
  {
    title: 'Agentic AI for Scientific Discovery: A Systematic Review',
    confidence: 92,
    domain: 'AI Agents',
    year: 2025,
    reason: 'High citation velocity in agent papers, gap in comprehensive reviews',
  },
  {
    title: 'IBM Granite in Academic Research Workflows',
    confidence: 88,
    domain: 'Enterprise AI',
    year: 2025,
    reason: 'Growing adoption of IBM AI in academic settings',
  },
  {
    title: 'RAG vs Fine-Tuning: A Comprehensive Benchmark Study',
    confidence: 85,
    domain: 'NLP',
    year: 2025,
    reason: 'Community seeking definitive comparison between approaches',
  },
  {
    title: 'Multimodal Knowledge Graphs for Research Navigation',
    confidence: 79,
    domain: 'Knowledge Graphs',
    year: 2026,
    reason: 'Convergence of vision + language + graph technologies',
  },
];

function ConfidenceBar({ value, color = '#2563EB' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-white/5 rounded-full h-1.5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <span className="text-white text-xs font-medium w-8">{value}%</span>
    </div>
  );
}

export default function PredictionsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="tag inline-block mb-3">AI Prediction</div>
          <h1 className="text-4xl font-bold text-white mb-2">Future Research Predictions</h1>
          <p className="text-[#94A3B8]">IBM Granite-powered research gap detection, trend forecasting, and future topic suggestions.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Research Gaps */}
          <div>
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400" /> Research Gap Detection
            </h2>
            <div className="space-y-3">
              {researchGaps.map((gap, i) => (
                <motion.div
                  key={gap.title}
                  className="glass-card p-5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-medium text-sm">{gap.title}</h3>
                    <span className={`tag text-[10px] flex-shrink-0 ${gap.severity === 'high' ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'tag-cyan'}`}>
                      {gap.severity === 'high' ? 'High Gap' : 'Medium Gap'}
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">{gap.description}</p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <BookOpen size={11} />
                      <span>{gap.citations} papers</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-green-500/5 border border-green-500/15">
                    <div className="flex items-center gap-1.5 text-green-400 text-xs">
                      <Lightbulb size={11} />
                      <span className="font-medium">Opportunity:</span>
                      <span className="text-[#94A3B8]">{gap.opportunity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emerging Topics */}
          <div>
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-400" /> Emerging Topics (2025–2030)
            </h2>
            <div className="glass-card p-5 mb-4">
              <div className="space-y-4">
                {emergingTopics.map((item, i) => (
                  <motion.div key={item.topic} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-white text-sm font-medium">{item.topic}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock size={10} className="text-[#94A3B8]" />
                          <span className="text-[#94A3B8] text-[10px]">{item.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <ConfidenceBar value={item.confidence} color={item.confidence > 90 ? '#2563EB' : item.confidence > 85 ? '#06B6D4' : '#8B5CF6'} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline Prediction Visual */}
            <div className="glass-card p-5">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Clock size={14} className="text-purple-400" /> Research Timeline Forecast
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                {[
                  { year: '2025', event: 'Agent AI dominates publications', color: '#2563EB' },
                  { year: '2026', event: 'Federated + Foundation model convergence', color: '#06B6D4' },
                  { year: '2027', event: 'Neuro-symbolic mainstream adoption', color: '#8B5CF6' },
                  { year: '2028', event: 'Quantum ML early breakthroughs', color: '#F59E0B' },
                  { year: '2030', event: 'AGI research safety frameworks established', color: '#22C55E' },
                ].map(({ year, event, color }, i) => (
                  <motion.div
                    key={year}
                    className="flex items-start gap-4 mb-4 pl-10 relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="absolute left-2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: color, background: color + '20' }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color }}>{year}</div>
                      <div className="text-[#94A3B8] text-xs mt-0.5">{event}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Future Papers */}
        <div>
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" /> AI-Recommended Future Research Topics
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {futurePapers.map((paper, i) => (
              <motion.div
                key={paper.title}
                className="glass-card p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-medium text-sm leading-snug">{paper.title}</h3>
                  <span className="tag text-[10px] flex-shrink-0">{paper.year}</span>
                </div>
                <div className="mb-2">
                  <span className="text-[#94A3B8] text-xs mr-2">Confidence:</span>
                  <ConfidenceBar value={paper.confidence} />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="tag-cyan tag text-[10px]">{paper.domain}</span>
                  <span className="text-[#94A3B8] text-[10px]">{paper.reason}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
