import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Activity, Globe, BarChart2 } from 'lucide-react';
import {
  citationGrowthData, researchTimelineData, topicDistributionData, radarData, trendData
} from '../data/sampleData';

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

const countryData = [
  { country: 'USA', papers: 420 }, { country: 'China', papers: 380 },
  { country: 'UK', papers: 210 }, { country: 'Germany', papers: 165 },
  { country: 'India', papers: 148 }, { country: 'Canada', papers: 130 },
  { country: 'France', papers: 118 }, { country: 'Japan', papers: 105 },
];

const sentimentData = [
  { month: 'Jan', positive: 78, neutral: 15, negative: 7 },
  { month: 'Mar', positive: 82, neutral: 12, negative: 6 },
  { month: 'May', positive: 75, neutral: 18, negative: 7 },
  { month: 'Jul', positive: 88, neutral: 9, negative: 3 },
  { month: 'Sep', positive: 85, neutral: 11, negative: 4 },
  { month: 'Nov', positive: 91, neutral: 7, negative: 2 },
];

const tabs = ['Growth', 'Keywords', 'Country Analysis', 'Sentiment', 'Radar'];

export default function TrendsPage() {
  const [activeTab, setActiveTab] = useState('Growth');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0F172A] to-[#111827]">
      <div className="container-custom py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="tag inline-block mb-3">Analytics</div>
          <h1 className="text-4xl font-bold text-white mb-2">Trend Analysis</h1>
          <p className="text-[#94A3B8]">AI-powered research trend detection powered by IBM Watsonx temporal analysis.</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8" ref={ref}>
          {[
            { icon: TrendingUp, label: 'Top Trend', value: 'Agent Systems', change: '+67%', color: '#22C55E' },
            { icon: Activity, label: 'Growth Rate', value: '34.2%', change: 'YoY', color: '#2563EB' },
            { icon: BarChart2, label: 'Hot Topic', value: 'RAG Systems', change: '+45%', color: '#06B6D4' },
            { icon: Globe, label: 'Top Country', value: 'USA', change: '420 papers', color: '#8B5CF6' },
          ].map(({ icon: Icon, label, value, change, color }, i) => (
            <motion.div
              key={label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <Icon size={16} style={{ color }} className="mb-3" />
              <div className="text-white font-bold text-lg">{value}</div>
              <div className="text-[#94A3B8] text-xs mt-0.5">{label}</div>
              <div className="text-xs mt-1" style={{ color }}>{change}</div>
            </motion.div>
          ))}
        </div>

        {/* Chart Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-[#94A3B8] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          className="chart-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-white font-semibold text-sm mb-5">{activeTab}</h3>

          {activeTab === 'Growth' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <p className="text-[#94A3B8] text-xs mb-3">Citation Growth (Monthly)</p>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={citationGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="citations" stroke="#2563EB" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-[#94A3B8] text-xs mb-3">Papers Published by Year</p>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={researchTimelineData}>
                    <defs>
                      <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="papers" stroke="#06B6D4" fill="url(#tGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'Keywords' && (
            <div className="space-y-3">
              {trendData.map(({ name, score, growth }, i) => (
                <motion.div key={name} className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <div className="text-[#94A3B8] text-sm w-40 flex-shrink-0">{name}</div>
                  <div className="flex-1 bg-white/5 rounded-full h-2">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                      initial={{ width: 0 }} animate={{ width: `${score}%` }}
                      transition={{ delay: i * 0.07 + 0.2, duration: 0.8 }}
                    />
                  </div>
                  <div className="text-white text-sm font-medium w-8">{score}</div>
                  <div className="text-green-400 text-sm w-14 text-right">{growth}</div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'Country Analysis' && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="country" type="category" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="papers" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'Sentiment' && (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={sentimentData}>
                <defs>
                  {[['pos', '#22C55E'], ['neu', '#F59E0B'], ['neg', '#EF4444']].map(([id, color]) => (
                    <linearGradient key={id} id={`sg${id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={v => <span style={{ color: '#94A3B8', fontSize: 10 }}>{v}</span>} />
                <Area type="monotone" dataKey="positive" stroke="#22C55E" fill="url(#sgpos)" strokeWidth={2} name="Positive %" />
                <Area type="monotone" dataKey="neutral" stroke="#F59E0B" fill="url(#sgneu)" strokeWidth={2} name="Neutral %" />
                <Area type="monotone" dataKey="negative" stroke="#EF4444" fill="url(#sgneg)" strokeWidth={2} name="Negative %" />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'Radar' && (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#94A3B8', fontSize: 8 }} />
                <Radar name="2024" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="2023" dataKey="B" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} strokeWidth={2} />
                <Legend formatter={v => <span style={{ color: '#94A3B8', fontSize: 10 }}>{v}</span>} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
}
