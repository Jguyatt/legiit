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

          {/* Mock Google Search Results */}
          <div className="space-y-4">
            {/* Rankly360 Result */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-blue-600 font-medium text-lg">Rankly360 SEO</h3>
                    <p className="text-green-600 text-sm">Marketing agency</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">5.0</span>
                  <span className="text-sm text-gray-500">(3 reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Maple, ON L6A 1S2</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>(647) 323-6969</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700 italic">
                  "Rankly 360 has been a game changer for my business."
                </p>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                  Website
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                  Directions
                </button>
              </div>
            </div>

            {/* Other Results (dimmed) */}
            <div className="opacity-60">
              <div className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-blue-600 font-medium text-lg">WebHill - Web Design & Local SEO Co...</h3>
                      <p className="text-green-600 text-sm">Internet marketing service</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">5.0</span>
                    <span className="text-sm text-gray-500">(23 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-60">
              <div className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-blue-600 font-medium text-lg">Booboo Digital</h3>
                      <p className="text-green-600 text-sm">Marketing agency</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">5.0</span>
                    <span className="text-sm text-gray-500">(3 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
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