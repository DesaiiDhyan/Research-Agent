import { Link } from 'react-router-dom';
import { Brain, GitFork, Link2, Mail, X as TwitterX } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0f1e] mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Brain size={18} className="text-white" />
              </div>
              <span className="font-bold text-white">Research<span className="text-blue-400">Agent</span> AI</span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
              Your Intelligent AI Research Companion. Powered by IBM Watsonx, Granite models, Langflow, and Orchestrate.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: GitFork, href: 'https://github.com', label: 'GitHub' },
                  { icon: Link2, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: TwitterX, href: 'https://twitter.com', label: 'Twitter' },
                  { icon: Mail, href: 'mailto:contact@researchagent.ai', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-blue-400 hover:border-blue-400/40 transition-all hover:bg-blue-500/10"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'Dashboard', 'Technology', 'Literature Review', 'Knowledge Graph', 'Trend Analysis'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Dashboard' ? '/dashboard' : item === 'Literature Review' ? '/literature' : item === 'Knowledge Graph' ? '/knowledge-graph' : item === 'Trend Analysis' ? '/trends' : `/#${item.toLowerCase()}`}
                    className="text-[#94A3B8] hover:text-blue-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IBM Tech */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">IBM Technologies</h4>
            <ul className="space-y-2">
              {['IBM Watsonx', 'Granite Models', 'IBM Langflow', 'IBM Orchestrate', 'Vector Database', 'RAG Pipeline'].map((item) => (
                <li key={item}>
                  <span className="text-[#94A3B8] text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#475569] text-xs">© 2025 Research Agent AI. All rights reserved.</p>
          <p className="text-[#475569] text-xs flex items-center gap-1">
            Made with ❤️ using <span className="text-blue-400 font-medium">IBM AI</span> technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
