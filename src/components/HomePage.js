import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import WhyRankly360 from './WhyRankly360';
import BeforeAfterResults from './BeforeAfterResults';
import GoogleBusinessProfileResults from './GoogleBusinessProfileResults';
import FAQ from './FAQ';
import Footer from './Footer';
import { userAuth } from '../utils/userAuth';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      // Initialize sessions
      userAuth.initSession();
      
      const session = userAuth.getSession();
      
      // Only redirect regular users (not admin users) to dashboard
      if (session && !userAuth.isAdmin()) {
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

  // Show public landing page for non-authenticated users and admin users
  return (
    <>
      <Navbar />
      <Hero />
      <WhyRankly360 />
      <BeforeAfterResults />
      <GoogleBusinessProfileResults />
      <FAQ />
      <Footer />
    </>
  );
};

export default HomePage; 