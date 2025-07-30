import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import WhyRankly360 from './WhyRankly360';
import BeforeAfterResults from './BeforeAfterResults';
import GoogleBusinessProfileResults from './GoogleBusinessProfileResults';
import FAQ from './FAQ';
import Footer from './Footer';

const HomePage = () => {
  // Show public landing page for everyone
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