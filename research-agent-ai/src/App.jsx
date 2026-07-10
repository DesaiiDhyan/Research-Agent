import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const LiteraturePage = lazy(() => import('./pages/LiteraturePage'));
const KnowledgeGraphPage = lazy(() => import('./pages/KnowledgeGraphPage'));
const TrendsPage = lazy(() => import('./pages/TrendsPage'));
const PredictionsPage = lazy(() => import('./pages/PredictionsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#94A3B8] text-sm">Loading Research Agent AI...</p>
      </div>
    </div>
  );
}

function AppLayout({ children, showFooter = true }) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<AppLayout><LandingPage /></AppLayout>} />
          <Route path="/demo" element={<AppLayout><DemoPage /></AppLayout>} />
          <Route path="/upload" element={<AppLayout><UploadPage /></AppLayout>} />
          <Route path="/search" element={<AppLayout><SearchPage /></AppLayout>} />
          <Route path="/literature" element={<AppLayout><LiteraturePage /></AppLayout>} />
          <Route path="/trends" element={<AppLayout><TrendsPage /></AppLayout>} />
          <Route path="/predictions" element={<AppLayout><PredictionsPage /></AppLayout>} />
          <Route path="/knowledge-graph" element={<DashboardLayout><KnowledgeGraphPage /></DashboardLayout>} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/citations" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/saved" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/login" element={
            <AppLayout showFooter={false}>
              <div className="min-h-screen flex items-center justify-center pt-16">
                <motion.div
                  className="glass-card p-8 w-full max-w-md mx-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-[#94A3B8] text-sm mb-6">Sign in to your Research Agent AI account</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[#94A3B8] text-xs mb-1.5 block">Email</label>
                      <input type="email" className="input-dark" placeholder="research@ibm.com" />
                    </div>
                    <div>
                      <label className="text-[#94A3B8] text-xs mb-1.5 block">Password</label>
                      <input type="password" className="input-dark" placeholder="••••••••" />
                    </div>
                    <button className="btn-primary w-full">Sign In</button>
                    <p className="text-[#94A3B8] text-xs text-center">Demo mode — no authentication required</p>
                  </div>
                </motion.div>
              </div>
            </AppLayout>
          } />
          <Route path="*" element={
            <AppLayout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-text mb-4">404</div>
                  <p className="text-white text-xl mb-2">Page Not Found</p>
                  <p className="text-[#94A3B8] mb-6">The research you're looking for doesn't exist.</p>
                  <a href="/" className="btn-primary inline-block">Return Home</a>
                </div>
              </div>
            </AppLayout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
