import React from 'react';
import { motion } from 'framer-motion';

const BeforeAfterResults = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3abef9]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00ffff]/10 rounded-full blur-2xl animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Before & After: Real Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the dramatic transformation in Google Maps rankings that our clients experience
          </p>
        </motion.div>

        {/* Before & After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-red-400 mb-2">Before</h3>
                <p className="text-gray-400">Not found in local search results</p>
              </div>
              <div className="bg-[#181c2a] rounded-3xl p-6 shadow-2xl border border-red-500/20">
                <img
                  src="/images/eBHbpbY.gif"
                  alt="Local SEO Map Rankings Before"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-400 mb-2">After</h3>
                <p className="text-gray-400">🚀 Amazing transformation!</p>
              </div>
              <div className="bg-[#181c2a] rounded-3xl p-6 shadow-2xl border border-green-500/20">
                <img
                  src="/images/XMgbFwE.gif"
                  alt="Local SEO Map Rankings After"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterResults; 