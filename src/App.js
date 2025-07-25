import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Packages from './components/Packages';
import GoogleMapsPowerBoost from './components/GoogleMapsPowerBoost';
import GoogleAuthorityEmbeds from './components/GoogleAuthorityEmbeds';
import LocalSEODomination from './components/LocalSEODomination';
import CustomCursor from './components/CustomCursor';

import GoogleBusinessProfile from './components/ServicePages/GoogleBusinessProfile';
import MapEmbedStacking from './components/ServicePages/MapEmbedStacking';
import ReviewManagement from './components/ServicePages/ReviewManagement';
import LocalCitationBuilding from './components/ServicePages/LocalCitationBuilding';
import PerformanceReporting from './components/ServicePages/PerformanceReporting';
import LocalCitations from './components/ServicePages/LocalCitations';
import MapPowerBoost from './components/ServicePages/MapPowerBoost';
import CloudStackBoost from './components/ServicePages/CloudStackBoost';
import ScrollToTop from './components/ScrollToTop';
import PlatinumLocalSEO from './components/ServicePages/PlatinumLocalSEO';
import OnboardingPreview from './components/OnboardingPreview';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import HomePage from './components/HomePage';
import Account from './components/Account';
import Help from './components/Help';
import WelcomePopup from './components/WelcomePopup';
import { initMetaPixel, trackPageView } from './utils/metaPixel';

function App() {
  useEffect(() => {
    // Initialize Meta Pixel with your pixel ID
    const pixelId = process.env.REACT_APP_META_PIXEL_ID;
    if (pixelId && pixelId !== 'YOUR_PIXEL_ID') {
      initMetaPixel(pixelId);
      trackPageView('Home');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor enabled={true} />
      <WelcomePopup />
      <div className="App">
        <Routes>
          {/* Home page - redirect authenticated users to dashboard */}
          <Route path="/" element={<HomePage />} />
          

          
          {/* Service pages - full page without main navigation */}
          <Route path="/services/google-maps-powerboost" element={<GoogleMapsPowerBoost />} />
          <Route path="/services/google-authority-embeds" element={<GoogleAuthorityEmbeds />} />
          <Route path="/services/local-seo-domination" element={<LocalSEODomination />} />
          <Route path="/services/google-business-profile" element={<GoogleBusinessProfile />} />
          <Route path="/services/map-embed-stacking" element={<MapEmbedStacking />} />
          <Route path="/services/review-management" element={<ReviewManagement />} />
          <Route path="/services/local-citation-building" element={<LocalCitationBuilding />} />
          <Route path="/services/performance-reporting" element={<PerformanceReporting />} />
          <Route path="/services/local-citations" element={<LocalCitations />} />
          <Route path="/services/map-powerboost" element={<MapPowerBoost />} />
          <Route path="/services/cloud-stack-boost" element={<CloudStackBoost />} />
          <Route path="/services/platinum-local-seo" element={<PlatinumLocalSEO />} />
          
          {/* Onboarding Preview */}
          <Route path="/onboarding-preview" element={<OnboardingPreview />} />
          
          {/* Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Signup */}
          <Route path="/signup" element={<Signup />} />
          

          
          {/* Authenticated Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/packages" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Packages />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/account" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Account />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/help" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Help />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 