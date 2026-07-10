import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Filter, BookOpen, Quote, Star, ExternalLink, Download, ChevronDown } from 'lucide-react';
import { samplePapers } from '../data/sampleData';

const DOMAINS = ['All', 'Deep Learning', 'NLP', 'Computer Vision', 'Enterprise AI', 'Information Retrieval', 'Software Engineering'];
const YEARS = ['All', '2024', '2023', '2022', '2021', '2020'];

function PaperCard({ paper, index }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug mb-2">{paper.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="tag-cyan tag text-[10px]">{paper.domain}</span>
            <span className="tag text-[10px]">{paper.journal}</span>
            <span className="tag text-[10px]">{paper.year}</span>
          </div>
          <div className="text-[#94A3B8] text-xs">{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ` +${paper.authors.length - 3} more` : ''}</div>
        </div>
        <div className="flex items-center gap-1.5 text-yellow-400 flex-shrink-0">
          <Star size={13} fill="currentColor" />
          <span className="text-xs font-medium text-white">{paper.citations.toLocaleString()}</span>
          <span className="text-[#94A3B8] text-[10px]">cites</span>
        </div>
      </div>

      <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">{paper.summary}</p>

      {expanded && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-3">
          <p className="text-[#94A3B8] text-xs leading-relaxed p-3 bg-white/[0.02] rounded-lg border border-white/5">{paper.abstract}</p>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {paper.keywords.map(kw => <span key={kw} className="tag text-[10px]">{kw}</span>)}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition-colors"
        >
          <BookOpen size={12} />
          {expanded ? 'Less' : 'Read More'}
          <ChevronDown size={10} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        <button className="flex items-center gap-1 text-[#94A3B8] hover:text-cyan-400 text-xs transition-colors ml-auto">
          <Quote size={12} />
          Cite
        </button>
        <button className="flex items-center gap-1 text-[#94A3B8] hover:text-green-400 text-xs transition-colors">
          <Download size={12} />
          Export
        </button>
        <button className="flex items-center gap-1 text-[#94A3B8] hover:text-blue-400 text-xs transition-colors">
          <ExternalLink size={12} />
          View
        </button>
      </div>
    </motion.div>
  );
}

export default function LiteraturePage() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [year, setYear] = useState('All');
  const [sortBy, setSortBy] = useState('citations');

  const filtered = samplePapers.filter(p => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
      p.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchDomain = domain === 'All' || p.domain === domain;
    const matchYear = year === 'All' || p.year.toString() === year;
    return matchSearch && matchDomain && matchYear;
  }).sort((a, b) => sortBy === 'citations' ? b.citations - a.citations : b.year - a.year);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="tag inline-block mb-3">Literature</div>
          <h1 className="text-4xl font-bold text-white mb-2">Literature Review</h1>
          <p className="text-[#94A3B8]">AI-curated academic papers with summaries, citations, and keywords.</p>
        </motion.div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-[#94A3B8]" />
            <input
              className="bg-transparent text-white text-sm outline-none flex-1 placeholder-[#475569]"
              placeholder="Search papers, authors, keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select className="input-dark !w-auto !py-2 !px-3 !text-xs" value={domain} onChange={e => setDomain(e.target.value)}>
              {DOMAINS.map(d => <option key={d} value={d} className="bg-[#0F172A]">{d}</option>)}
            </select>
            <select className="input-dark !w-auto !py-2 !px-3 !text-xs" value={year} onChange={e => setYear(e.target.value)}>
              {YEARS.map(y => <option key={y} value={y} className="bg-[#0F172A]">{y}</option>)}
            </select>
            <select className="input-dark !w-auto !py-2 !px-3 !text-xs" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="citations" className="bg-[#0F172A]">Most Cited</option>
              <option value="year" className="bg-[#0F172A]">Newest</option>
            </select>
          </div>
          <div className="text-[#94A3B8] text-xs ml-auto">{filtered.length} papers</div>
        </div>

        {/* Paper Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((paper, i) => <PaperCard key={paper.id} paper={paper} index={i} />)}
          {filtered.length === 0 && (
            <div className="md:col-span-2 text-center py-16">
              <Search size={32} className="text-[#94A3B8] mx-auto mb-3" />
              <p className="text-[#94A3B8]">No papers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
