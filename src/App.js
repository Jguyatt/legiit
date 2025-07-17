import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeOffer from './components/WhatWeOffer';
import Packages from './components/Packages';
import WhyRankly360 from './components/WhyRankly360';
import BeforeAfterResults from './components/BeforeAfterResults';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import GoogleMapsPowerBoost from './components/GoogleMapsPowerBoost';
import GoogleAuthorityEmbeds from './components/GoogleAuthorityEmbeds';
import LocalSEODomination from './components/LocalSEODomination';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/ChatWidget';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { initMetaPixel, trackPageView } from './utils/metaPixel';

function App() {
  useEffect(() => {
    // Initialize Meta Pixel with your pixel ID
    // Replace 'YOUR_PIXEL_ID' with your actual Meta Pixel ID
    const pixelId = process.env.REACT_APP_META_PIXEL_ID || 'YOUR_PIXEL_ID';
    initMetaPixel(pixelId);
    
    // Track initial page view
    trackPageView('Home');
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor enabled={true} />
      <ChatWidget />
      <div className="App">
        <Routes>
          {/* Home page with full layout */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <WhatWeOffer />
              <WhyRankly360 />
              <BeforeAfterResults />
              <FAQ />
              <Footer />
            </>
          } />
          
          {/* Packages page with full layout */}
          <Route path="/packages" element={
            <>
              <Navbar />
              <Packages />
              <Footer />
            </>
          } />
          
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
          
          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 