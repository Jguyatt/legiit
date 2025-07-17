import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trackVideoView, trackButtonClick } from '../utils/metaPixel';

const HERO_BG_GRADIENT = 'bg-gradient-to-b from-[#0f0f1a] to-[#09090f]';
const HEADLINE = 'Dominate Google Maps. Win Local Leads.';
const SUBHEAD = 'Local SEO that gets you found. More calls, more customers, no contracts.';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

const twinkleAnimation = {
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const BADGE_MESSAGES = [
  '⭐️ 500+ Businesses Helped',
  '🚀 200-500% More Local Leads',
  '🛡️ 100% White-Hat, Google Safe',
  '⚡ See Results in 30-60 Days',
  '💰 Transparent, One-Time Pricing',
  '🎯 Dominate Google Maps Rankings',
  '📈 Proven Track Record Since 2020',
  '🔥 Get Found by Local Customers',
  '💎 Premium Local SEO Service',
  '🏆 #1 in Local Search Results',
];

const Hero = () => {
  const navigate = useNavigate();
  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % BADGE_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center ${HERO_BG_GRADIENT} overflow-hidden px-4`}
      style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}
    >
      {/* --- Subtle Dark Blue Background (Matching Your Image) --- */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* --- Dark blue background with subtle gradient --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#0a0a1a] to-[#0f0f1a]" />
        
        {/* --- Soft glow at bottom center --- */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] md:w-[1000px] md:h-[250px] rounded-full bg-gradient-to-t from-[#3abef9]/30 via-[#00ffff]/25 to-transparent blur-[60px]" />
        
        {/* --- Additional glow layer for more visibility --- */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] md:w-[800px] md:h-[200px] rounded-full bg-gradient-to-t from-[#3abef9]/40 via-[#00ffff]/35 to-transparent blur-[40px]" />
        
        {/* --- Faint white dots scattered across background --- */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.05, 0.2, 0.05],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 6 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 6
              }}
              className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.3px)'
              }}
            />
          ))}
        </div>
        
        {/* --- Additional smaller particles --- */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.02, 0.1, 0.02],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 8
              }}
              className="absolute w-0.3 h-0.3 bg-white/15 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.2px)'
              }}
            />
          ))}
        </div>
        {/* Enhanced Star Field with Twinkling */}
        <div className="absolute inset-0">
          {/* Original stars with twinkling */}
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0 }}
            className="absolute left-[15%] top-[20%] w-1 h-1 bg-white/70 rounded-full blur-[1px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.5 }}
            className="absolute left-[25%] top-[15%] w-1.5 h-1.5 bg-[#3abef9]/90 rounded-full blur-[1.5px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 1 }}
            className="absolute left-[35%] top-[25%] w-0.5 h-0.5 bg-white/50 rounded-full blur-[0.8px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 1.5 }}
            className="absolute left-[45%] top-[10%] w-1 h-1 bg-white/40 rounded-full blur-[1px]" 
          />
          
          {/* Additional stars */}
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.3 }}
            className="absolute left-[65%] top-[18%] w-1.2 h-1.2 bg-[#00ffff]/80 rounded-full blur-[1.2px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.8 }}
            className="absolute left-[75%] top-[22%] w-0.8 h-0.8 bg-white/60 rounded-full blur-[1px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 1.2 }}
            className="absolute left-[85%] top-[12%] w-1.3 h-1.3 bg-[#3abef9]/70 rounded-full blur-[1.3px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.2 }}
            className="absolute left-[10%] top-[35%] w-0.6 h-0.6 bg-white/45 rounded-full blur-[0.8px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.7 }}
            className="absolute left-[20%] top-[40%] w-1.1 h-1.1 bg-[#00ffff]/65 rounded-full blur-[1.1px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 1.1 }}
            className="absolute left-[30%] top-[45%] w-0.9 h-0.9 bg-white/55 rounded-full blur-[1px]" 
          />
          
          {/* Stars near horizon */}
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.4 }}
            className="absolute left-[40%] top-[60%] w-0.7 h-0.7 bg-[#3abef9]/50 rounded-full blur-[0.9px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 0.9 }}
            className="absolute left-[60%] top-[65%] w-1 h-1 bg-white/35 rounded-full blur-[1px]" 
          />
          <motion.div 
            {...twinkleAnimation}
            transition={{ ...twinkleAnimation.transition, delay: 1.4 }}
            className="absolute left-[80%] top-[55%] w-0.8 h-0.8 bg-[#00ffff]/40 rounded-full blur-[0.8px]" 
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[12%] top-[30%] w-0.5 h-0.5 bg-[#3abef9]/30 rounded-full"
          />
          <motion.div 
            animate={{ y: [10, -10, 10], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[70%] top-[25%] w-0.3 h-0.3 bg-white/25 rounded-full"
          />
          <motion.div 
            animate={{ y: [-5, 15, -5], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-[90%] top-[40%] w-0.4 h-0.4 bg-[#00ffff]/20 rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          {...fadeIn(0.1)}
          className="mb-6"
        >
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={badgeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="inline-block px-4 sm:px-5 py-2 rounded-full bg-[#0f0f1a]/80 text-[#3abef9] text-xs sm:text-sm font-light tracking-wide border border-[#3abef9]/30 backdrop-blur-sm relative z-10 max-w-[90vw] sm:max-w-none"
                style={{
                  letterSpacing: '0.05em',
                  fontFamily: 'Poppins, Inter, system-ui, sans-serif',
                }}
              >
                {BADGE_MESSAGES[badgeIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeIn(0.2)}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-6 leading-tight tracking-tight px-4"
          style={{ letterSpacing: '-0.03em' }}
        >
          {HEADLINE}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeIn(0.35)}
          className="text-base sm:text-lg md:text-2xl text-[#9ca3af] mb-8 md:mb-10 max-w-2xl mx-auto font-light px-4 leading-relaxed"
          style={{ letterSpacing: '-0.01em' }}
        >
          {SUBHEAD}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeIn(0.5)} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 w-full">
          <button
            onClick={() => {
              // Track button click event
              trackButtonClick('Get Started', {
                button_location: 'hero_section',
                content_category: 'cta',
                value: 0,
                currency: 'USD'
              });
              navigate('/packages');
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full bg-gradient-to-r from-[#3abef9] to-[#007bff] text-white text-base sm:text-lg font-medium shadow-xl transition-all duration-300 hover:shadow-[0_0_32px_0_rgba(58,190,249,0.5)] focus:outline-none focus:ring-2 focus:ring-[#3abef9] focus:ring-offset-2 active:scale-95 touch-manipulation"
            style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif", minHeight: '48px' }}
          >
            Get Started
          </button>
          <button
            onClick={() => {
              // Track video view event
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
                      padding: 10px; 
                      background: #0f0f1a; 
                      display: flex; 
                      justify-content: center; 
                      align-items: center; 
                      min-height: 100vh;
                      font-family: 'Inter', 'Poppins', system-ui, sans-serif;
                    }
                    .video-container {
                      max-width: 100%;
                      max-height: 100vh;
                      box-shadow: 0 0 40px rgba(58, 190, 249, 0.3);
                      border-radius: 12px;
                      overflow: hidden;
                    }
                    video {
                      width: 100%;
                      height: auto;
                      object-fit: cover;
                    }
                    .close-btn {
                      position: absolute;
                      top: 10px;
                      right: 10px;
                      background: rgba(58, 190, 249, 0.9);
                      color: white;
                      border: none;
                      padding: 8px 12px;
                      border-radius: 8px;
                      cursor: pointer;
                      font-weight: 600;
                      transition: all 0.3s ease;
                      font-size: 14px;
                    }
                    .close-btn:hover {
                      background: rgba(58, 190, 249, 1);
                      transform: scale(1.05);
                    }
                    @media (max-width: 768px) {
                      body { padding: 5px; }
                      .close-btn { 
                        top: 5px; 
                        right: 5px; 
                        padding: 6px 10px; 
                        font-size: 12px; 
                      }
                    }
                  </style>
                </head>
                <body>
                  <button class="close-btn" onclick="window.close()">✕ Close</button>
                  <div class="video-container">
                    <video controls autoplay>
                      <source src="${videoUrl}" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div class="cta-container" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 10;">
                    <button onclick="window.opener.location.href='https://www.rankly360.com/packages'; window.close();" class="cta-btn" style="background: linear-gradient(135deg, #3abef9 0%, #007bff 100%); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(58, 190, 249, 0.3);">
                      View Packages
                    </button>
                  </div>
                </body>
              </html>
              `);
              newWindow.document.close();
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full bg-transparent border-2 border-[#3abef9] text-[#3abef9] text-base sm:text-lg font-medium shadow-xl transition-all duration-300 hover:bg-[#3abef9] hover:text-white hover:shadow-[0_0_32px_0_rgba(58,190,249,0.3)] focus:outline-none focus:ring-2 focus:ring-[#3abef9] focus:ring-offset-2 flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
            style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif", minHeight: '48px' }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Overview Video
          </button>
        </motion.div>
      </div>
      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0f0f1a] pointer-events-none z-20" />
    </section>
  );
};

export default Hero; 