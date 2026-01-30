
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import CategoryPage from './pages/CategoryPage';
import MotionVideos from './pages/MotionVideos';
import MotionVideoDetail from './pages/MotionVideoDetail';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PatternDetail from './pages/PatternDetail';
import About from './pages/About';
import License from './pages/License';
import VerifyEmail from './pages/VerifyEmail';
import VerifySuccess from './pages/VerifySuccess';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import RefundPolicy from './pages/RefundPolicy';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CancelSubscription from './pages/CancelSubscription';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { auth } = useApp();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && auth.user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/motion-videos" element={<MotionVideos />} />
        <Route path="/motion-videos/:id" element={<MotionVideoDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/license" element={<License />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/verify-email" element={
          <ProtectedRoute>
            <VerifyEmail />
          </ProtectedRoute>
        } />
        <Route path="/verify-success" element={
          <ProtectedRoute>
            <VerifySuccess />
          </ProtectedRoute>
        } />

        <Route path="/pattern/:id" element={<PatternDetail />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cancel-subscription" element={<ProtectedRoute><CancelSubscription /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
};

export default App;
