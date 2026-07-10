import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, BookOpen, Quote, Download, ExternalLink, Loader2 } from 'lucide-react';
import { samplePapers } from '../data/sampleData';

const AREAS = ['All', 'Deep Learning', 'NLP', 'Computer Vision', 'Enterprise AI', 'Information Retrieval'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('All');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    await new Promise(r => setTimeout(r, 800));
    const filtered = samplePapers.filter(p => {
      const q = query.toLowerCase();
      const matchQ = p.title.toLowerCase().includes(q) ||
        p.keywords.some(k => k.toLowerCase().includes(q)) ||
        p.authors.some(a => a.toLowerCase().includes(q));
      const matchArea = area === 'All' || p.domain === area;
      const matchYear = !year || p.year.toString() === year;
      const matchAuthor = !author || p.authors.some(a => a.toLowerCase().includes(author.toLowerCase()));
      return matchQ && matchArea && matchYear && matchAuthor;
    });
    setResults(filtered);
    setLoading(false);
    setSearched(true);
  };

  const handleClear = () => {
    setQuery(''); setArea('All'); setYear(''); setAuthor('');
    setResults([]); setSearched(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="tag inline-block mb-4">Search</div>
          <h1 className="text-4xl font-bold text-white mb-3">Research Search Engine</h1>
          <p className="text-[#94A3B8]">Semantic search powered by FAISS vector embeddings and IBM Watsonx.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="glass-card p-4">
            <div className="flex gap-3 mb-4">
              <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-blue-500/50 transition-colors">
                <Search size={16} className="text-[#94A3B8] flex-shrink-0" />
                <input
                  className="bg-transparent text-white flex-1 outline-none text-sm placeholder-[#475569]"
                  placeholder="Search papers by topic, author, keyword..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <select className="input-dark !w-auto !py-2 !px-3 !text-xs" value={area} onChange={e => setArea(e.target.value)}>
                {AREAS.map(a => <option key={a} value={a} className="bg-[#0F172A]">{a}</option>)}
              </select>
              <input
                className="input-dark !w-auto !py-2 !px-3 !text-xs"
                placeholder="Author name..."
                value={author}
                onChange={e => setAuthor(e.target.value)}
                style={{ minWidth: '160px' }}
              />
              <input
                className="input-dark !w-auto !py-2 !px-3 !text-xs"
                placeholder="Year..."
                value={year}
                onChange={e => setYear(e.target.value)}
                maxLength={4}
                style={{ width: '90px' }}
              />
            </div>

            <div className="flex gap-2">
              <button onClick={handleSearch} disabled={!query.trim() || loading} className="btn-primary flex items-center gap-2 !text-sm disabled:opacity-50">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                Search
              </button>
              <button onClick={handleClear} className="btn-secondary flex items-center gap-2 !text-sm">
                <X size={14} /> Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
              <Loader2 size={32} className="text-blue-400 animate-spin mx-auto mb-3" />
              <p className="text-[#94A3B8]">Searching with IBM Watsonx semantic embeddings...</p>
            </motion.div>
          )}

          {searched && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#94A3B8] text-sm">
                  Found <span className="text-white font-medium">{results.length}</span> results for "{query}"
                </p>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-16">
                  <Search size={40} className="text-[#94A3B8] mx-auto mb-3" />
                  <p className="text-white font-medium mb-1">No results found</p>
                  <p className="text-[#94A3B8] text-sm">Try different keywords or broaden your filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((paper, i) => (
                    <motion.div
                      key={paper.id}
                      className="glass-card p-5"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-sm mb-1">{paper.title}</h3>
                          <div className="text-[#94A3B8] text-xs">{paper.authors.join(', ')}</div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="tag text-[10px]">{paper.year}</span>
                          <span className="tag-cyan tag text-[10px]">{paper.domain}</span>
                        </div>
                      </div>
                      <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">{paper.summary}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {paper.keywords.map(k => <span key={k} className="tag text-[10px]">{k}</span>)}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[#94A3B8] text-xs">{paper.citations.toLocaleString()} citations</span>
                        <div className="flex gap-2 ml-auto">
                          <button className="flex items-center gap-1 text-[#94A3B8] hover:text-blue-400 text-xs transition-colors">
                            <BookOpen size={11} /> Read
                          </button>
                          <button className="flex items-center gap-1 text-[#94A3B8] hover:text-cyan-400 text-xs transition-colors">
                            <Quote size={11} /> Cite
                          </button>
                          <button className="flex items-center gap-1 text-[#94A3B8] hover:text-green-400 text-xs transition-colors">
                            <Download size={11} /> Export
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!searched && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-blue-400" />
            </div>
            <p className="text-white font-medium mb-1">Start your research search</p>
            <p className="text-[#94A3B8] text-sm">Try: "Transformer", "RAG", "IBM Watsonx", or "BERT"</p>
          </div>
        )}
      </div>
    </div>
  );
}
