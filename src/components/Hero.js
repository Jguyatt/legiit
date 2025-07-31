import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trackVideoView, trackButtonClick } from '../utils/metaPixel';

const HERO_BG_GRADIENT = 'bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]';
const HEADLINE = 'Get Found on Google Maps';
const SUBHEAD = 'Local SEO services that help small businesses rank higher and get more customers.';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center ${HERO_BG_GRADIENT} overflow-hidden px-4`}
      style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}
    >
      {/* Abstract Cave-like Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f1a]" />
        
        {/* Cave-like depth layers */}
        <div className="absolute inset-0">
          {/* Deep cave effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] opacity-60" />
          
          {/* Cave entrance glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#3abef9]/10 via-[#1e40af]/5 to-transparent blur-[100px]" />
          
          {/* Cave walls - subtle geometric patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#3abef9]/5 to-transparent" />
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#1e40af]/5 to-transparent" />
          </div>
          
          {/* Cave floor reflection */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0f] via-[#1a1a2e]/50 to-transparent" />
        </div>
        
        {/* Subtle floating particles - cave atmosphere */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 8
              }}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Cave stalactites effect - top shadows */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        
        {/* Professional glow accents */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-[#3abef9]/15 via-[#1e40af]/10 to-transparent blur-[80px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          
          {/* Professional Badge - Static */}
          <motion.div
            {...fadeIn(0.1)}
            className="mb-8"
          >
            <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-gray-800/90 to-gray-700/90 text-gray-200 text-sm font-semibold tracking-wide border border-gray-600/50 backdrop-blur-md shadow-lg"
              style={{
                letterSpacing: '0.05em',
                fontFamily: 'Poppins, Inter, system-ui, sans-serif',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              ✓ 200+ Local Businesses Helped
            </div>
          </motion.div>

          {/* Clean Headline */}
          <motion.h1
            {...fadeIn(0.2)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight px-4"
            style={{ 
              letterSpacing: '-0.03em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {HEADLINE}
          </motion.h1>

          {/* Clean Subheadline */}
          <motion.p
            {...fadeIn(0.35)}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light px-4 leading-relaxed"
            style={{ 
              letterSpacing: '-0.01em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            {SUBHEAD}
          </motion.p>

          {/* Clean CTA Buttons */}
          <motion.div {...fadeIn(0.5)} className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start px-4 w-full mb-8 sm:mb-12">
            <button
              onClick={() => {
                trackButtonClick('Sign Up Today to Get Started', {
                  button_location: 'hero_section',
                  content_category: 'cta',
                  value: 0,
                  currency: 'USD'
                });
                navigate('/signup');
              }}
              className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#3abef9] to-[#1e40af] text-white text-lg sm:text-xl font-bold shadow-2xl transition-all duration-300 hover:from-[#1e40af] hover:to-[#3abef9] focus:outline-none focus:ring-4 focus:ring-[#3abef9]/50 active:scale-95 touch-manipulation transform hover:scale-105 sm:hover:scale-110 hover:-translate-y-1"
              style={{ 
                fontFamily: "'Inter', 'Poppins', system-ui, sans-serif", 
                minHeight: '56px',
                boxShadow: '0 10px 40px rgba(58, 190, 249, 0.4), 0 0 20px rgba(58, 190, 249, 0.2)'
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3abef9] to-[#1e40af] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              
              {/* Button content */}
              <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Sign Up Today to Get Started</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            
            <button
              onClick={() => {
                trackVideoView('Overview Video', {
                  video_name: 'Rankly360 Overview',
                  content_category: 'video',
                  content_type: 'overview'
                });
                
                const videoUrl = '/video.mp4';
                const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                newWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>Rankly360 Overview Video</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { 
                        margin: 0; 
                        padding: 20px; 
                        background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%); 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh;
                        font-family: 'Inter', 'Poppins', system-ui, sans-serif;
                      }
                      .video-container {
                        max-width: 90vw;
                        max-height: 90vh;
                        box-shadow: 0 0 50px rgba(58, 190, 249, 0.4);
                        border-radius: 16px;
                        overflow: hidden;
                        border: 2px solid rgba(58, 190, 249, 0.3);
                        background: #000;
                      }
                      video {
                        width: auto;
                        height: auto;
                        max-width: 100%;
                        max-height: 90vh;
                        object-fit: contain;
                      }
                      .close-btn {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(58, 190, 249, 0.9);
                        color: white;
                        border: none;
                        padding: 12px 18px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        font-size: 14px;
                        backdrop-blur: 10px;
                      }
                      .close-btn:hover {
                        background: rgba(58, 190, 249, 1);
                        transform: scale(1.05);
                        box-shadow: 0 0 20px rgba(58, 190, 249, 0.5);
                      }
                    </style>
                  </head>
                  <body>
                    <div class="video-container">
                      <video controls autoplay>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <button class="close-btn" onclick="window.close()">Close Video</button>
                  </body>
                  </html>
                `);
                newWindow.document.close();
              }}
              className="group w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-4 rounded-xl bg-slate-800/80 text-white text-lg sm:text-lg font-semibold shadow-2xl transition-all duration-300 hover:bg-slate-700/80 focus:outline-none focus:ring-4 focus:ring-slate-500/50 active:scale-95 touch-manipulation transform hover:scale-105 border border-slate-600/50 backdrop-blur-sm"
              style={{ 
                fontFamily: "'Inter', 'Poppins', system-ui, sans-serif", 
                minHeight: '56px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-5 sm:h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">AI Overview Video</span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Side - Clean SEO Widget */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-80 md:w-96">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
            >
              {/* Google Header */}
              <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700 font-medium">
                    dentist near me
                  </span>
                </div>
              </div>

              {/* Search Results */}
              <div className="p-4 space-y-3">
                {[
                  {
                    title: 'Your Business',
                    url: 'yourbusiness.com',
                    rating: 4.9,
                    reviews: 234,
                    snippet: 'Your dental practice. Professional care, modern facilities, accepting new patients. Call today for appointments.',
                    isHighlighted: true
                  },
                  {
                    title: 'City Center Dental Group',
                    url: 'citycenterdental.com',
                    rating: 4.8,
                    reviews: 127,
                    snippet: 'Comprehensive dental care in downtown. Cosmetic dentistry, emergency care, family-friendly environment.'
                  },
                  {
                    title: 'Modern Downtown Dentistry',
                    url: 'moderndowntowndental.com',
                    rating: 4.6,
                    reviews: 89,
                    snippet: 'Advanced dental technology and gentle care. Accepting new patients, flexible payment plans available.'
                  }
                ].map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className={`p-4 rounded-lg border relative ${
                      result.isHighlighted ? 'bg-purple-50 border-purple-200 shadow-lg' : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-blue-600">
                            {result.title}
                          </span>
                          {result.isHighlighted && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                              Your Business
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(result.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-xs text-gray-600 ml-1">{result.rating}</span>
                            <span className="text-xs text-gray-500">({result.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600 leading-relaxed">
                          <span className="text-green-700 font-medium">{result.url}</span>
                          <span className="text-gray-500"> › dentist-near-me</span>
                          <div className="text-gray-700 mt-1">
                            {result.snippet}
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats for Your Business */}
                      {result.isHighlighted && (
                        <div className="flex flex-col gap-2 ml-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.5 }}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>+347% Leads</span>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.8 }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>+89% Conversions</span>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 2.1 }}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-md"
                          >
                            <div className="flex items-center gap-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>+156% Sales</span>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* SEO Metrics Bar */}
              <div className="bg-gray-50 p-3 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600 font-medium">Google Search Console</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Live Data</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0a0a0f] pointer-events-none z-20" />
    </section>
  );
};

export default Hero; 