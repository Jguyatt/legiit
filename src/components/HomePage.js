import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import WhyRankly360 from './WhyRankly360';
import BeforeAfterResults from './BeforeAfterResults';
import FAQ from './FAQ';
import Footer from './Footer';
import { userAuth } from '../utils/userAuth';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const session = userAuth.getSession();
      // Allow admin users to view the public site
      const adminSession = localStorage.getItem('adminSession');
      if (session && !adminSession) {
        // Only redirect non-admin authenticated users to dashboard
        navigate('/dashboard');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show public landing page for non-authenticated users
  return (
    <>
      <Navbar />
      <Hero />
      <WhyRankly360 />
      <BeforeAfterResults />
      <FAQ />
      <Footer />
    </>
  );
};

export default HomePage; 