import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Network, Map, TrendingUp, Lightbulb,
  Bookmark, Settings, FileText, Users, Quote, BarChart2, Brain,
  Menu, X, ChevronRight, Activity, Zap, Globe
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  citationGrowthData, researchTimelineData, topicDistributionData, trendData
} from '../data/sampleData';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: BookOpen, label: 'Literature Review', path: '/literature' },
  { icon: Network, label: 'Knowledge Graph', path: '/knowledge-graph' },
  { icon: Map, label: 'Citation Map', path: '/citations' },
  { icon: TrendingUp, label: 'Trend Analysis', path: '/trends' },
  { icon: Lightbulb, label: 'Future Predictions', path: '/predictions' },
  { icon: Bookmark, label: 'Saved Projects', path: '/saved' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const COLORS = ['#2563EB', '#06B6D4', '#8B5CF6', '#F59E0B', '#6B7280'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-[#94A3B8] mb-1">{label}</p>
        {payload.map(({ name, value, color }) => (
          <p key={name} style={{ color }}>{name}: {value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const stats = [
    { icon: FileText, label: 'Total Papers', value: 1284, suffix: '', color: '#2563EB', change: '+24 this week' },
    { icon: Quote, label: 'Citations', value: 87420, suffix: '', color: '#06B6D4', change: '+1.2K this month' },
    { icon: Brain, label: 'Topics', value: 47, suffix: '', color: '#8B5CF6', change: '+3 new' },
    { icon: Users, label: 'Authors', value: 3200, suffix: '', color: '#22C55E', change: '+142 indexed' },
    { icon: Globe, label: 'Journals', value: 218, suffix: '', color: '#F59E0B', change: '+12 sources' },
    { icon: Activity, label: 'Trend Score', value: 94, suffix: '%', color: '#EC4899', change: '↑ 3pts' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-56 bg-[#0a0f1e] border-r border-white/5 flex flex-col`}>
        <div className="p-4 border-b border-white/5 flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Brain size={14} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm">Research<span className="text-blue-400">AI</span></span>
          <button className="lg:hidden ml-auto text-[#94A3B8]" onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`sidebar-item ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="glass-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={12} className="text-yellow-400" />
              <span className="text-white text-xs font-medium">IBM Watsonx</span>
            </div>
            <div className="text-[#94A3B8] text-[10px]">Connect API key to enable live AI</div>
            <button className="btn-primary !py-1.5 !px-3 !text-xs w-full mt-2">Connect</button>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#94A3B8] p-1" onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-white font-semibold text-sm">Research Dashboard</h1>
              <p className="text-[#94A3B8] text-xs">AI-powered analytics overview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/upload" className="btn-secondary !py-1.5 !px-3 !text-xs flex items-center gap-1.5">
              <FileText size={12} /> Upload
            </Link>
            <Link to="/demo" className="btn-primary !py-1.5 !px-3 !text-xs flex items-center gap-1.5">
              <Brain size={12} /> Ask AI
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
            {stats.map(({ icon: Icon, label, value, suffix, color, change }, i) => (
              <motion.div
                key={label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={14} style={{ color }} />
                  <span className="text-[10px] text-green-400">{change}</span>
                </div>
                <div className="text-xl font-bold text-white">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="text-[#94A3B8] text-xs mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-4 mb-4">
            {/* Citation Growth */}
            <motion.div className="chart-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <BarChart2 size={14} className="text-blue-400" /> Citation Growth
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={citationGrowthData}>
                  <defs>
                    <linearGradient id="cGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="citations" stroke="#2563EB" fill="url(#cGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Research Timeline */}
            <motion.div className="chart-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Activity size={14} className="text-cyan-400" /> Research Timeline
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={researchTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="papers" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Topic Distribution Pie */}
            <motion.div className="chart-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <h3 className="text-white font-semibold text-sm mb-4">Topic Distribution</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={topicDistributionData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {topicDistributionData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconSize={8} iconType="circle" formatter={(val) => <span style={{ color: '#94A3B8', fontSize: '10px' }}>{val}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Trend Score Table */}
            <motion.div className="chart-container lg:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-purple-400" /> Emerging Trends
              </h3>
              <div className="space-y-2.5">
                {trendData.map(({ name, score, growth }) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="text-[#94A3B8] text-xs w-36 flex-shrink-0">{name}</div>
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 0.7, duration: 1 }}
                      />
                    </div>
                    <div className="text-white text-xs w-8 text-right font-medium">{score}</div>
                    <div className="text-green-400 text-xs w-12 text-right">{growth}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
