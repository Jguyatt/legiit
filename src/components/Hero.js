import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#10111a] px-4">
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#0a0a1a] to-[#0f0f1a]" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8"
        >
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-300">30-60 Day Results</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Get Found on{' '}
          <span className="bg-gradient-to-r from-[#3abef9] to-[#00ffff] bg-clip-text text-transparent">
            Google Maps
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Local SEO services that help small businesses rank higher and get more customers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button
            onClick={() => navigate('/signup')}
            className="bg-gradient-to-r from-[#3abef9] to-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#1e40af] hover:to-[#3abef9] transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            Sign Up Today to Get Started
            <ArrowUpRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/services')}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-700/50 transition-all duration-300 flex items-center gap-2"
          >
            View Services
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-400 text-sm"
        >
          Join 500+ businesses already dominating Google Maps
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 