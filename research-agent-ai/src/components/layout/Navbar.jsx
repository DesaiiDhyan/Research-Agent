import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X, ChevronRight, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#howitworks' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Technology', href: '/#technology' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'nav-blur border-b border-white/5 bg-[#0F172A]/90'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm hidden sm:block">
              Research<span className="text-blue-400">Agent</span> AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#94A3B8] hover:text-white px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5 font-medium"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5 font-medium ${
                    location.pathname === link.href ? 'text-blue-400' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="btn-secondary flex items-center gap-2 !py-2 !px-4 text-sm">
              <LogIn size={14} />
              Login
            </Link>
            <Link to="/dashboard" className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
              Get Started
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F172A]/95 nav-blur border-t border-white/5"
          >
            <div className="container-custom py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-[#94A3B8] hover:text-white text-left px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[#94A3B8] hover:text-white px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary !py-2 !px-4 text-sm flex-1 text-center">Login</Link>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-primary !py-2 !px-4 text-sm flex-1 text-center">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
