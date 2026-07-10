import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Brain, Database, Upload, TrendingUp, Network, ArrowRight, Zap,
  BookOpen, Quote, Star, CheckCircle, Play, Search, FileText,
  BarChart2, Globe, Cpu, Server, Code, ChevronRight, Sparkles,
  Activity, Target, Lightbulb, Layers, Shield
} from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';
import AnimatedCounter from '../components/ui/AnimatedCounter';

// ===================== HERO SECTION =====================
function HeroSection() {
  const floatingCards = [
    { icon: FileText, label: 'Transformer Paper', sub: '87K citations', color: '#2563EB', delay: 0 },
    { icon: Quote, label: 'Auto-Citations', sub: 'APA · MLA · IEEE', color: '#06B6D4', delay: 0.3 },
    { icon: Network, label: 'Knowledge Graph', sub: '2.4K nodes mapped', color: '#8B5CF6', delay: 0.6 },
    { icon: TrendingUp, label: 'Trend Prediction', sub: '94% confidence', color: '#22C55E', delay: 0.9 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleBackground />

      {/* Gradient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/30 text-xs text-blue-300 font-medium mb-6">
              <Sparkles size={12} className="text-blue-400" />
              Powered by IBM Watsonx · Granite · Langflow
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse ml-1" />
            </div>

            <h1 className="text-5xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Research</span>
              <br />
              <span className="gradient-text">Agent AI</span>
            </h1>

            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8 max-w-xl">
              An Agentic AI platform that <span className="text-blue-300 font-medium">collects</span>,{' '}
              <span className="text-cyan-300 font-medium">analyzes</span>,{' '}
              <span className="text-purple-300 font-medium">summarizes</span>,{' '}
              <span className="text-green-300 font-medium">predicts</span>, and{' '}
              <span className="text-yellow-300 font-medium">visualizes</span> academic research using IBM AI technologies.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/dashboard" className="btn-primary flex items-center gap-2 !text-sm">
                <Zap size={14} />
                Start Research
                <ArrowRight size={14} />
              </Link>
              <Link to="/demo" className="btn-secondary flex items-center gap-2 !text-sm">
                <Play size={14} />
                View Demo
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: 50, suffix: 'K+', label: 'Papers Indexed' },
                { value: 2.4, suffix: 'M', label: 'Citations Analyzed' },
                { value: 98, suffix: '%', label: 'Accuracy Rate' },
              ].map(({ value, suffix, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-[#94A3B8]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — AI Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[520px] flex items-center justify-center"
          >
            {/* Central AI Brain Visualization */}
            <div className="relative">
              {/* Outer ring */}
              <div className="w-64 h-64 rounded-full border border-blue-500/20 flex items-center justify-center animate-spin-slow">
                <div className="w-52 h-52 rounded-full border border-cyan-500/20 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/40 flex items-center justify-center glow-blue">
                    <Brain size={52} className="text-blue-400 animate-pulse-glow" />
                  </div>
                </div>
              </div>

              {/* IBM Tag in center ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10">
                <div className="text-[10px] font-bold text-blue-300 tracking-widest">IBM WATSONX</div>
              </div>

              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-blue-400"
                  style={{
                    top: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 46 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.6 + i * 0.05,
                  }}
                />
              ))}
            </div>

            {/* Floating Cards */}
            {floatingCards.map(({ icon: Icon, label, sub, color, delay }, i) => {
              const positions = [
                { top: '5%', right: '-10%' },
                { top: '30%', left: '-15%' },
                { bottom: '25%', right: '-12%' },
                { bottom: '5%', left: '-10%' },
              ];
              return (
                <motion.div
                  key={label}
                  className="absolute glass-card p-3 min-w-[160px]"
                  style={positions[i]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                  transition={{ delay, duration: 3 + i, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: color + '22', border: `1px solid ${color}44` }}>
                      <Icon size={14} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">{label}</div>
                      <div className="text-[#94A3B8] text-[10px]">{sub}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===================== FEATURES SECTION =====================
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Database,
      title: 'Fuse Academic Sources',
      description: 'Aggregate papers from IEEE, arXiv, Google Scholar, ACM, PubMed, and institutional repositories into a unified knowledge base.',
      color: '#2563EB',
      tags: ['IEEE', 'arXiv', 'Scholar'],
    },
    {
      icon: Upload,
      title: 'Multimodal Input',
      description: 'Upload PDFs, images, charts, handwritten notes, and questions. Our AI processes all formats using OCR and vision models.',
      color: '#06B6D4',
      tags: ['PDF', 'Images', 'Charts'],
    },
    {
      icon: Brain,
      title: 'Predictive Research',
      description: 'Predict future research trends, detect citation gaps, uncover hidden connections, and recommend future research opportunities.',
      color: '#8B5CF6',
      tags: ['Trends', 'Gaps', 'Predict'],
    },
    {
      icon: Network,
      title: 'Visualization Engine',
      description: 'Interactive knowledge graphs, citation maps, topic clusters, trend timelines, and semantic heatmaps for deep insight.',
      color: '#22C55E',
      tags: ['Graphs', 'Maps', 'Clusters'],
    },
  ];

  return (
    <section id="features" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="tag inline-block mb-4">Core Capabilities</div>
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Research Tools</h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">Everything you need to accelerate academic research with enterprise-grade IBM AI.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, description, color, tags }, i) => (
            <motion.div
              key={title}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: color + '20', border: `1px solid ${color}40` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="tag" style={{ background: color + '18', color, borderColor: color + '40' }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== HOW IT WORKS =====================
function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    { step: 1, title: 'Upload Research', items: ['PDF Documents', 'Images & Charts', 'Research Notes'], icon: Upload, color: '#2563EB' },
    { step: 2, title: 'IBM Models', items: ['Text Extraction', 'OCR Processing', 'Summarization', 'Embedding'], icon: Cpu, color: '#06B6D4' },
    { step: 3, title: 'IBM Langflow', items: ['Agent Workflow', 'RAG Pipeline', 'Vector Search'], icon: Layers, color: '#8B5CF6' },
    { step: 4, title: 'IBM Orchestrate', items: ['Research Automation', 'Task Orchestration', 'Multi-Agent'], icon: Server, color: '#F59E0B' },
    { step: 5, title: 'Dashboard', items: ['Insights & Reports', 'Knowledge Graph', 'Citation Analysis', 'Trend Prediction'], icon: BarChart2, color: '#22C55E' },
  ];

  return (
    <section id="howitworks" className="section-padding bg-[#0a0f1e]/60" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="tag inline-block mb-4">Workflow</div>
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">From document upload to AI-powered insights in five seamless steps.</p>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-start justify-center gap-3">
          {steps.map(({ step, title, items, icon: Icon, color }, i) => (
            <div key={step} className="flex items-start gap-3">
              <motion.div
                className="glass-card p-5 w-44 flex-shrink-0 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: color + '20', border: `1px solid ${color}40` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="text-xs font-bold mb-1" style={{ color }}>STEP {step}</div>
                <div className="text-white font-semibold text-sm mb-3">{title}</div>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item} className="text-[#94A3B8] text-xs flex items-center gap-1.5 justify-center">
                      <span className="w-1 h-1 rounded-full" style={{ background: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex items-center pt-8">
                  <ChevronRight size={20} className="text-[#94A3B8]/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col gap-4">
          {steps.map(({ step, title, items, icon: Icon, color }, i) => (
            <motion.div
              key={step}
              className="glass-card p-5 flex gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: color + '20', border: `1px solid ${color}40` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-xs font-bold mb-0.5" style={{ color }}>STEP {step}</div>
                <div className="text-white font-semibold text-sm mb-2">{title}</div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(item => (
                    <span key={item} className="text-[#94A3B8] text-xs bg-white/5 px-2 py-0.5 rounded">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== TECHNOLOGY SECTION =====================
function TechnologySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const techs = [
    { name: 'IBM Watsonx', desc: 'Enterprise AI platform for foundation models', color: '#2563EB', logo: '🔷' },
    { name: 'IBM Granite', desc: 'Open-source LLM family for enterprise tasks', color: '#3B82F6', logo: '💎' },
    { name: 'IBM Langflow', desc: 'Visual RAG pipeline and agent builder', color: '#06B6D4', logo: '🌊' },
    { name: 'IBM Orchestrate', desc: 'AI-powered research automation orchestrator', color: '#8B5CF6', logo: '⚡' },
    { name: 'Python FastAPI', desc: 'High-performance async backend API', color: '#22C55E', logo: '🐍' },
    { name: 'React + Vite', desc: 'Modern, fast frontend framework', color: '#61DAFB', logo: '⚛️' },
    { name: 'FAISS / ChromaDB', desc: 'Vector database for semantic search', color: '#F59E0B', logo: '📊' },
    { name: 'Tailwind CSS', desc: 'Utility-first responsive design system', color: '#38BDF8', logo: '🎨' },
    { name: 'Framer Motion', desc: 'Smooth animations and transitions', color: '#EC4899', logo: '✨' },
  ];

  return (
    <section id="technology" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="tag inline-block mb-4">Tech Stack</div>
          <h2 className="text-4xl font-bold text-white mb-4">Built with IBM AI Technologies</h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">Enterprise-grade stack combining IBM AI with modern web technologies for a production-ready platform.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techs.map(({ name, desc, color, logo }, i) => (
            <motion.div
              key={name}
              className="glass-card p-5 flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07 }}
            >
              <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ background: color + '18', border: `1px solid ${color}30` }}>
                {logo}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{name}</div>
                <div className="text-[#94A3B8] text-xs mt-0.5">{desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== ABOUT SECTION =====================
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-[#0a0f1e]/60" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="tag inline-block mb-4">About</div>
            <h2 className="text-4xl font-bold text-white mb-6">Reimagining Academic Research with AI</h2>
            <p className="text-[#94A3B8] leading-relaxed mb-6">
              Research Agent AI is a hackathon project that demonstrates how IBM AI technologies can transform academic research workflows. By combining foundation models, RAG pipelines, and agent orchestration, we create an intelligent research companion.
            </p>
            <div className="space-y-4">
              {[
                { icon: Target, title: 'Problem Statement', text: 'Researchers spend 60% of their time finding, reading, and summarizing papers. Citation management and trend identification are largely manual.' },
                { icon: Lightbulb, title: 'Our Solution', text: 'Agentic AI workflow that automates research collection, synthesis, citation generation, and trend prediction using IBM Watsonx and Granite models.' },
                { icon: Shield, title: 'Expected Impact', text: '10x faster literature reviews, automated citation networks, real-time trend detection, and AI-suggested research gaps for future work.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="glass-card p-4 flex gap-3">
                  <Icon size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{title}</div>
                    <div className="text-[#94A3B8] text-xs leading-relaxed">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2"><Activity size={16} className="text-blue-400" /> Architecture Overview</h3>
              <div className="space-y-3">
                {[
                  { layer: 'Frontend', tech: 'React + Vite + Tailwind + Framer Motion', color: '#61DAFB' },
                  { layer: 'API Gateway', tech: 'FastAPI + Python + Pydantic', color: '#22C55E' },
                  { layer: 'AI Orchestration', tech: 'IBM Langflow + IBM Orchestrate', color: '#8B5CF6' },
                  { layer: 'Foundation Models', tech: 'IBM Watsonx + Granite 3B / 8B', color: '#2563EB' },
                  { layer: 'Vector Search', tech: 'FAISS + ChromaDB + Embeddings', color: '#F59E0B' },
                  { layer: 'Document Processing', tech: 'PDF Parser + OCR + Chunking', color: '#06B6D4' },
                ].map(({ layer, tech, color }) => (
                  <div key={layer} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <div className="text-[#94A3B8] text-xs w-28 flex-shrink-0">{layer}</div>
                    <div className="text-white text-xs font-medium">{tech}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: 'IBM Technologies', value: '4' },
                { label: 'API Endpoints', value: '24+' },
                { label: 'Research Domains', value: '12' },
                { label: 'Supported Formats', value: '8' },
              ].map(({ label, value }) => (
                <div key={label} className="stat-card text-center">
                  <div className="text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-[#94A3B8] text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===================== CONTACT SECTION =====================
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="tag inline-block mb-4">Contact</div>
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-[#94A3B8] mb-8">Have questions about Research Agent AI? Reach out to learn more about the project or collaboration opportunities.</p>
            <div className="space-y-3">
              {[
                { icon: Globe, label: 'GitHub', value: 'github.com/research-agent-ai' },
                { icon: Star, label: 'LinkedIn', value: 'linkedin.com/company/research-agent-ai' },
                { icon: BookOpen, label: 'Email', value: 'hello@researchagent.ai' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[#94A3B8] text-xs">{label}</div>
                    <div className="text-white text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#94A3B8] text-xs mb-1.5 block">Name</label>
                <input className="input-dark" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="text-[#94A3B8] text-xs mb-1.5 block">Email</label>
                <input type="email" className="input-dark" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="text-[#94A3B8] text-xs mb-1.5 block">Message</label>
                <textarea className="input-dark resize-none" rows={4} placeholder="Tell us about your research..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
              </div>
              <button type="submit" className="btn-primary w-full">
                {sent ? <span className="flex items-center gap-2 justify-center"><CheckCircle size={14} /> Message Sent!</span> : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== STATS BANNER =====================
function StatsBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const stats = [
    { value: 50000, suffix: '+', label: 'Research Papers' },
    { value: 2400000, suffix: '+', label: 'Citations Indexed' },
    { value: 1200, suffix: '+', label: 'Knowledge Graphs' },
    { value: 98, suffix: '%', label: 'AI Accuracy' },
  ];
  return (
    <section className="py-12 border-y border-white/5 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, suffix, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-white mb-1">
                {inView ? <AnimatedCounter end={value} suffix={suffix} /> : '0'}
              </div>
              <div className="text-[#94A3B8] text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== MAIN LANDING PAGE =====================
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <StatsBanner />
      <FeaturesSection />
      <HowItWorksSection />
      <TechnologySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
