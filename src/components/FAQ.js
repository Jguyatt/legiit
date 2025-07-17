import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is map embed stacking safe?",
      answer: "Yes—our strategies are fully white-hat, tiered, IP-diverse, and safe. We use only legitimate, high-authority websites and follow Google’s guidelines. Our approach is designed for long-term, sustainable growth. If you ever have concerns, we’re here to answer your questions and support your campaign every step of the way."
    },
    {
      question: "When can I expect results?",
      answer: "Most clients see Map Pack rankings in 30–60 days. While every business and market is different, our average client starts seeing improvements in their Google Maps rankings within 30-60 days. Some competitive markets may take longer, but we provide regular updates and will work extra hard if results take longer than expected."
    },
    {
      question: "What makes your local SEO different?",
      answer: "We focus specifically on Google Maps domination with proven strategies that work. Unlike general SEO agencies, we specialize in local search and have developed proprietary techniques for map embed stacking, GBP optimization, and local authority building that consistently deliver results."
    },
    {
      question: "Do you work with my industry?",
      answer: "Yes, we work with contractors, clinics, service professionals, and local businesses across all industries. Our local SEO strategies are effective for any business that serves a local market, from plumbers and dentists to law firms and restaurants."
    },
    {
      question: "What if I don't see results?",
      answer: "We’re obsessed with your success and will do everything possible to get you results—even if it means extra work on our end. While we don’t offer refunds if you don’t see results, our team will keep optimizing, supporting, and fighting for your business until you get the best outcome possible. Your growth is our mission."
    },
    {
      question: "How do you track my progress?",
      answer: "The best way to see your progress is to search for your business on Google! You'll notice your rankings improving in the Google Map Pack and organic search results. Your Google Business Profile will also show increased views, clicks, and calls. We don't provide monthly reports, but the results speak for themselves - you can literally search for your business and see the improvements in real-time. Plus, you'll likely notice more phone calls and website visits from local customers finding you online."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#0f0f0f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            FAQ & Commitment
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Common questions about our services and our commitment to your success
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#3ABEF9]/20"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-[#2a2a2a] transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-[#3ABEF9] transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-8 md:p-12 text-white border border-[#3ABEF9]/20">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Dominate Your Local Market?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of local businesses already ranking in the Google Map Pack with our proven strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/packages" className="bg-gradient-to-r from-[#3ABEF9] to-[#007BFF] hover:from-[#007BFF] hover:to-[#0052CC] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  View Our Packages
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 