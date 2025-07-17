import React from 'react';
import { motion } from 'framer-motion';

const WhyRankly360 = () => {
  return (
    <section id="why-us" className="relative py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Why Local Businesses Choose Us
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're not a big agency with fancy offices. We're a small team that actually cares about your business getting found online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">What Makes Us Different</h3>
            
            <div className="space-y-6">
              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">No BS Approach</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  We don't promise overnight results or guarantee #1 rankings. SEO takes time, and we're upfront about that. What we do promise is honest work and clear communication about what's happening with your campaign.
                </p>
              </div>

              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Real Results, Real Stories</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  We've helped local businesses go from getting 2-3 calls a month to 20-30 calls. But we also have clients who saw slower growth. Every business is different, and we're honest about what's realistic for yours.
                </p>
              </div>

              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">You Can Actually Talk to Us</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  No call centers, no ticket systems, no automated responses. You get our direct phone numbers and email addresses. We answer our own phones and respond to our own emails.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">What Our Clients Say</h3>
            
            <div className="space-y-6">
              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <p className="text-blue-100 text-sm italic mb-4 leading-relaxed">
                  "I was spending $2,000/month with a big agency and getting nowhere. These guys charge half that and actually pick up the phone when I call. My calls went from 5 a month to about 25. Not overnight, but steady growth."
                </p>
                <div className="text-white font-medium">— Mike Chen, Auto Repair Shop</div>
              </div>

              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <p className="text-blue-100 text-sm italic mb-4 leading-relaxed">
                  "They explained everything in plain English. No jargon, no pressure. When something wasn't working, they told me and tried a different approach. It's refreshing to work with people who are honest about the process."
                </p>
                <div className="text-white font-medium">— Sarah Martinez, Dental Practice</div>
              </div>

              <div className="bg-[#181c2a]/60 border border-[#3abef9]/20 rounded-lg p-6">
                <p className="text-blue-100 text-sm italic mb-4 leading-relaxed">
                  "I was skeptical about SEO, but they showed me exactly what they were doing and why. My website now shows up when people search for what I do in my area. Simple as that."
                </p>
                <div className="text-white font-medium">— David Thompson, Plumber</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-[#181c2a]/80 border border-[#3abef9]/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Ready to get started?</h3>
            <a
              href="/packages"
              className="inline-block bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              See Our Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRankly360; 