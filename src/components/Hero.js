import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trackVideoView, trackButtonClick } from '../utils/metaPixel';

const HERO_BG_GRADIENT = 'bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0f0f1a]';
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Inter', 'Poppins', system-ui, sans-serif" }}
    >
      {/* Base Cave Gradient */}
      <div className={`absolute inset-0 ${HERO_BG_GRADIENT}`} />
      
      {/* Deep Cave Entrance - Main Hollow */}
      <div className="absolute inset-0">
        {/* Cave Ceiling - Stalactites Effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent">
          {/* Stalactite Shadows */}
          <div className="absolute top-0 left-1/4 w-32 h-20 bg-gradient-to-b from-[#0a0a0f] to-transparent transform -skew-x-12 opacity-60" />
          <div className="absolute top-4 left-1/3 w-24 h-16 bg-gradient-to-b from-[#0a0a0f] to-transparent transform skew-x-12 opacity-50" />
          <div className="absolute top-8 left-2/3 w-28 h-18 bg-gradient-to-b from-[#0a0a0f] to-transparent transform -skew-x-6 opacity-40" />
          <div className="absolute top-2 left-3/4 w-20 h-12 bg-gradient-to-b from-[#0a0a0f] to-transparent transform skew-x-6 opacity-30" />
        </div>
        
        {/* Cave Walls - Geometric Depth */}
        <div className="absolute inset-0">
          {/* Left Wall */}
          <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-[#0a0a0f] via-[#1a1a2e]/80 to-transparent">
            <div className="absolute left-0 top-1/4 w-full h-1/2 bg-gradient-to-r from-[#3abef9]/5 via-[#1e40af]/3 to-transparent transform -skew-y-12" />
            <div className="absolute left-0 top-1/2 w-full h-1/3 bg-gradient-to-r from-[#1e40af]/4 via-[#3abef9]/2 to-transparent transform skew-y-6" />
          </div>
          
          {/* Right Wall */}
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-[#0a0a0f] via-[#1a1a2e]/80 to-transparent">
            <div className="absolute right-0 top-1/3 w-full h-1/2 bg-gradient-to-l from-[#1e40af]/5 via-[#3abef9]/3 to-transparent transform skew-y-12" />
            <div className="absolute right-0 top-2/3 w-full h-1/3 bg-gradient-to-l from-[#3abef9]/4 via-[#1e40af]/2 to-transparent transform -skew-y-6" />
          </div>
        </div>
        
        {/* Cave Floor - Stalagmites and Reflections */}
        <div className="absolute bottom-0 left-0 w-full h-1/4">
          {/* Floor Reflection */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#0a0a0f] via-[#1a1a2e]/60 to-transparent" />
          
          {/* Stalagmite Shadows */}
          <div className="absolute bottom-0 left-1/6 w-16 h-12 bg-gradient-to-t from-[#0a0a0f] to-transparent transform skew-x-12 opacity-70" />
          <div className="absolute bottom-0 left-1/2 w-20 h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent transform -skew-x-6 opacity-60" />
          <div className="absolute bottom-0 left-3/4 w-12 h-10 bg-gradient-to-t from-[#0a0a0f] to-transparent transform skew-x-12 opacity-50" />
        </div>
      </div>
      
      {/* Cave Entrance Glow - Dramatic Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#3abef9]/15 via-[#1e40af]/10 to-transparent blur-[120px] opacity-80" />
      
      {/* Secondary Cave Glow - Depth Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#1e40af]/8 via-[#3abef9]/5 to-transparent blur-[80px] opacity-60" />
      
      {/* Cave Atmosphere - Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#3abef9]/30 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Cave Depth Layers - Multiple Hollow Chambers */}
      <div className="absolute inset-0">
        {/* Inner Cave Chamber */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-transparent via-[#0a0a0f]/40 to-[#0a0a0f]/80 opacity-70" />
        
        {/* Deep Cave Recess */}
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-radial from-transparent via-[#0a0a0f]/60 to-[#0a0a0f] opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          className="mb-6 sm:mb-8"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-light text-white mb-3 sm:mb-4 leading-tight tracking-tight px-2">
            Dominate Your
            <span className="block bg-gradient-to-r from-[#3abef9] to-[#1e40af] bg-clip-text text-transparent font-light">
              Local Market
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-2">
            Transform your local business with AI-powered SEO strategies that put you on the map. 
            Get found first, every time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 sm:mb-8 px-4">
            <motion.button
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#3abef9] to-[#1e40af] text-white font-light rounded-lg text-sm sm:text-base hover:from-[#1e40af] hover:to-[#3abef9] transition-all duration-300 transform hover:scale-105 shadow-lg tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up Today
            </motion.button>
            
            <motion.button
              className="w-full sm:w-auto px-6 py-3 border-2 border-[#3abef9] text-[#3abef9] font-light rounded-lg text-sm sm:text-base hover:bg-[#3abef9] hover:text-white transition-all duration-300 transform hover:scale-105 tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI Overview Video
            </motion.button>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-light border border-white/20 tracking-wide">
            <span className="text-[#3abef9]">✓</span>
            200+ Local Businesses Helped
          </div>
        </motion.div>
        
        {/* Simplified Mobile-Optimized Search Widget */}
        <motion.div
          className="relative max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/30 shadow-2xl relative overflow-hidden">
            {/* Search Header - Simplified */}
            <div className="relative z-10 flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#3abef9] to-[#1e40af] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg h-7 sm:h-8 flex items-center px-2 sm:px-3 text-xs text-gray-700 font-light shadow-inner">
                  <span className="text-[#3abef9] mr-1 text-xs">🔍</span>
                  <span className="truncate text-xs">"local seo services"</span>
                </div>
              </div>
            </div>
            
            {/* Single Simplified Result */}
            <motion.div 
              className="bg-gradient-to-r from-white/25 to-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-xs mb-1 truncate">Rankly360 Local SEO</div>
                  <div className="text-gray-300 text-xs">★★★★★ 4.9 (127 reviews)</div>
                  <div className="text-[#3abef9] text-xs">rankly360.com</div>
                </div>
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #1
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Simple Live Data Footer */}
            <motion.div 
              className="relative z-10 mt-3 pt-2 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex justify-between items-center text-xs text-gray-300 font-light">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Live</span>
                </div>
                <span className="text-xs">Updated 2 min ago</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
};

export default Hero; 