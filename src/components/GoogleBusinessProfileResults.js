import React from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Phone, Globe } from 'lucide-react';

const GoogleBusinessProfileResults = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#0f172a] to-[#10111a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            See Our Own Success Story
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We practice what we preach! Here's our own Google Business Profile ranking #1 for "local seo near me" in our area.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-[#3abef9]/20 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Google Search Results</span>
            </div>
            <div className="text-sm text-gray-400">
              Search: "local seo near me"
            </div>
          </div>

          {/* Real Google Search Results Image */}
          <div className="flex justify-center">
            <img 
              src="/images/success.jpg" 
              alt="Rankly360 SEO ranking #1 for local seo near me" 
              className="rounded-lg shadow-lg max-w-full h-auto"
              style={{ maxHeight: '600px' }}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm mb-4">
              This is our actual Google Business Profile ranking #1 for "local seo near me"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#3abef9] to-[#1e40af] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#1e40af] hover:to-[#3abef9] transition-all duration-300 shadow-lg"
            >
              Get Your Business to #1 Too
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleBusinessProfileResults; 