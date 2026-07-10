import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload, FileText, Image, File, CheckCircle, Loader2,
  X, Eye, Tags, Users, Brain, ChevronRight, AlertCircle
} from 'lucide-react';

const ACCEPTED = { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg'], 'text/plain': ['.txt'], 'text/csv': ['.csv'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] };

function FileIcon({ type }) {
  if (type?.startsWith('image')) return <Image size={18} className="text-cyan-400" />;
  if (type === 'application/pdf') return <FileText size={18} className="text-red-400" />;
  return <File size={18} className="text-blue-400" />;
}

function UploadCard({ file, onRemove }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('uploading'); // uploading | done | error
  const [result, setResult] = useState(null);

  const simulate = useCallback(async () => {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 80));
      setProgress(i);
    }
    await new Promise(r => setTimeout(r, 400));
    setStatus('done');
    setResult({
      summary: 'This paper introduces a transformer-based approach for academic research synthesis using IBM Watsonx Granite models, demonstrating 23% improvement over baseline methods.',
      keywords: ['Transformer', 'IBM Watsonx', 'NLP', 'Research Synthesis', 'Granite'],
      entities: ['IBM', 'NeurIPS', 'BERT', 'Vaswani et al.'],
      pages: 12,
      wordCount: 8240,
    });
  }, []);

  useState(() => { simulate(); }, []);

  return (
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <FileIcon type={file.type} />
          <div>
            <div className="text-white text-sm font-medium truncate max-w-[200px]">{file.name}</div>
            <div className="text-[#94A3B8] text-xs">{(file.size / 1024).toFixed(1)} KB</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'done' && <CheckCircle size={16} className="text-green-400" />}
          {status === 'uploading' && <Loader2 size={16} className="text-blue-400 animate-spin" />}
          {status === 'error' && <AlertCircle size={16} className="text-red-400" />}
          <button onClick={onRemove} className="text-[#94A3B8] hover:text-red-400 transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {status === 'uploading' && (
        <div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[#94A3B8] text-xs mt-1.5">Processing with IBM AI... {progress}%</div>
        </div>
      )}

      {status === 'done' && result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-3">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Brain size={12} className="text-blue-400" />
              <span className="text-[#94A3B8] text-xs font-medium">AI Summary</span>
            </div>
            <p className="text-white text-xs leading-relaxed">{result.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1 mb-1.5">
                <Tags size={11} className="text-cyan-400" />
                <span className="text-[#94A3B8] text-xs">Keywords</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {result.keywords.slice(0, 3).map(k => <span key={k} className="tag text-[10px]">{k}</span>)}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1 mb-1.5">
                <Users size={11} className="text-purple-400" />
                <span className="text-[#94A3B8] text-xs">Entities</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {result.entities.slice(0, 3).map(e => <span key={e} className="tag tag-purple text-[10px]">{e}</span>)}
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-[#94A3B8]">
            <span><span className="text-white font-medium">{result.pages}</span> pages</span>
            <span><span className="text-white font-medium">{result.wordCount.toLocaleString()}</span> words</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED,
    onDrop: (accepted) => setFiles(prev => [...prev, ...accepted]),
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="tag inline-block mb-4">Document Processing</div>
          <h1 className="text-4xl font-bold text-white mb-3">Upload Research Documents</h1>
          <p className="text-[#94A3B8]">Upload PDFs, images, charts, and notes. IBM AI will extract, summarize, and analyze your content.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Drop Zone */}
          <motion.div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
                : 'border-white/10 hover:border-blue-500/50 hover:bg-white/[0.02]'
            }`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ y: isDragActive ? -8 : 0 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5"
            >
              <Upload size={28} className={`transition-colors ${isDragActive ? 'text-blue-400' : 'text-[#94A3B8]'}`} />
            </motion.div>
            <h3 className="text-white font-semibold mb-2">
              {isDragActive ? 'Drop your files here!' : 'Drag & drop your research files'}
            </h3>
            <p className="text-[#94A3B8] text-sm mb-4">or click to browse from your device</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['PDF', 'Images', 'CSV', 'DOCX', 'TXT'].map(fmt => (
                <span key={fmt} className="tag">{fmt}</span>
              ))}
            </div>
            <p className="text-[#475569] text-xs mt-4">Maximum file size: 50MB per file</p>
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm">{files.length} file{files.length > 1 ? 's' : ''} processing</h3>
                  <button onClick={() => setFiles([])} className="text-[#94A3B8] hover:text-red-400 text-xs transition-colors">Clear all</button>
                </div>
                {files.map((file, i) => (
                  <UploadCard key={`${file.name}-${i}`} file={file} onRemove={() => setFiles(prev => prev.filter((_, j) => j !== i))} />
                ))}
                <div className="flex justify-center pt-2">
                  <button className="btn-primary flex items-center gap-2">
                    <Eye size={14} /> View in Dashboard <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Capabilities Info */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Brain, title: 'IBM Granite Extraction', desc: 'Text extraction, summarization, and entity recognition' },
              { icon: Eye, title: 'OCR Processing', desc: 'Extract text from images, scanned PDFs, and charts' },
              { icon: Tags, title: 'Auto-Tagging', desc: 'AI-powered keyword and topic classification' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card p-4 text-center">
                <Icon size={18} className="text-blue-400 mx-auto mb-2" />
                <div className="text-white text-xs font-semibold mb-1">{title}</div>
                <div className="text-[#94A3B8] text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
