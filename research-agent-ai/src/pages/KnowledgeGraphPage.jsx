import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Controls, Background, MiniMap, useNodesState, useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { knowledgeGraphNodes, knowledgeGraphEdges } from '../data/sampleData';
import { Network, Search, ZoomIn, ZoomOut, Info } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [nodes, , onNodesChange] = useNodesState(knowledgeGraphNodes);
  const [edges, , onEdgesChange] = useEdgesState(knowledgeGraphEdges);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const handleNodeClick = (_, node) => setSelected(node);

  return (
    <div className="min-h-screen pt-20 bg-[#0F172A]">
      <div className="container-custom py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="tag inline-block mb-3">Visualization</div>
          <h1 className="text-4xl font-bold text-white mb-2">Knowledge Graph</h1>
          <p className="text-[#94A3B8]">Interactive research entity graph. Drag nodes, zoom, and explore connections.</p>
        </motion.div>

        {/* Controls Bar */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <div className="flex items-center gap-2 glass-card px-3 py-2 flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="text-[#94A3B8]" />
            <input
              className="bg-transparent text-white text-sm outline-none flex-1 placeholder-[#475569]"
              placeholder="Search nodes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {[
              { label: 'Authors', color: '#2563EB' },
              { label: 'Topics', color: '#06B6D4' },
              { label: 'Models', color: '#8B5CF6' },
              { label: 'IBM', color: '#F59E0B' },
            ].map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Graph */}
          <div className="lg:col-span-3">
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/5"
              style={{ height: '520px', background: '#0a0f1e' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                fitView
                attributionPosition="bottom-left"
              >
                <Controls style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <MiniMap
                  nodeColor={(n) => n.style?.background?.includes('37,99,235') ? '#2563EB' : '#94A3B8'}
                  style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.05)' }}
                />
                <Background color="#1E293B" gap={24} />
              </ReactFlow>
            </motion.div>
          </div>

          {/* Side Panel */}
          <div className="space-y-3">
            {selected ? (
              <motion.div className="glass-card p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Info size={14} className="text-blue-400" />
                  <span className="text-white font-semibold text-sm">Node Details</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Label</span>
                    <span className="text-white font-medium">{selected.data.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Node ID</span>
                    <span className="text-white">{selected.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Connections</span>
                    <span className="text-blue-400 font-medium">
                      {edges.filter(e => e.source === selected.id || e.target === selected.id).length}
                    </span>
                  </div>
                </div>
                <button className="btn-secondary !py-1.5 !px-3 !text-xs w-full mt-3" onClick={() => setSelected(null)}>
                  Clear Selection
                </button>
              </motion.div>
            ) : (
              <div className="glass-card p-4 text-center">
                <Network size={24} className="text-[#94A3B8] mx-auto mb-2" />
                <p className="text-[#94A3B8] text-xs">Click a node to see details</p>
              </div>
            )}

            <div className="glass-card p-4">
              <h4 className="text-white font-semibold text-xs mb-3">Graph Statistics</h4>
              <div className="space-y-2">
                {[
                  { label: 'Total Nodes', value: nodes.length },
                  { label: 'Connections', value: edges.length },
                  { label: 'Animated Edges', value: edges.filter(e => e.animated).length },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-[#94A3B8]">{label}</span>
                    <span className="text-blue-400 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-white font-semibold text-xs mb-3">Top Nodes</h4>
              <div className="space-y-1.5">
                {knowledgeGraphNodes.map(n => (
                  <button
                    key={n.id}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={() => setSelected(n)}
                  >
                    <span className="text-white text-xs">{n.data.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
