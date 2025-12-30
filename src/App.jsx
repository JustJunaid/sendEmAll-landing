import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useScrollReveal from './hooks/useScrollReveal';
import useGoogleAnalytics, { initializeGA } from './hooks/useGoogleAnalytics';
import useTawkTo from './hooks/useTawkTo';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Calculator from './pages/Calculator';

// Component that uses hooks requiring Router context
function AppContent() {
  useScrollReveal();
  useGoogleAnalytics(); // This needs to be inside Router
  useTawkTo();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campaign-sender-calculator" element={<Calculator />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
    </Routes>
  );
}

function App() {
  // Initialize Google Analytics once on app mount (outside Router)
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
