import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Star } from 'lucide-react';

const serviceTabs = [
  {
    key: 'powerboost',
    label: 'Map PowerBoost',
    icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#3abef9]" />,
    headline: 'Improve Your Google Maps Rankings',
    details: [
      '300 geotagged map points around your business',
      'Local signals that help Google find your business',
      'One-time service with lasting results',
    ],
    stat: '150+ Businesses Helped',
    testimonial: '"We moved from page 2 to the top 3 in Google Maps. More customers are finding us now."',
    author: '— Mike, Auto Repair Shop',
    color: 'from-[#1e3a8a] to-[#3abef9]'
  },
  {
    key: 'cloudstack',
    label: 'Cloud Stack Boost',
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#a3e635]" />,
    headline: 'Build Local Authority',
    details: [
      '800 map embeds on trusted websites',
      'Local backlinks that signal authority',
      'Safe, white-hat techniques only',
    ],
    stat: '95% Success Rate',
    testimonial: '"Our rankings improved and we started getting more local calls."',
    author: '— Sarah, Dental Clinic',
    color: 'from-[#a3e635] to-[#3abef9]'
  },
  {
    key: 'citations',
    label: 'Local Citations',
    icon: <Star className="w-6 h-6 md:w-8 md:h-8 text-[#00ffff]" />,
    headline: 'Get Listed Where Customers Look',
    details: [
      '150+ local directory listings',
      'Consistent business information across the web',
      'Build trust with Google and customers',
    ],
    stat: '200+ Businesses Helped',
    testimonial: '"We finally show up when people search for our business. The reports are clear and helpful."',
    author: '— David, Law Firm',
    color: 'from-[#00ffff] to-[#3abef9]'
  },
];

const journeySteps = [
  { icon: '💳', title: 'Checkout & Payment', desc: 'Secure payment through Stripe. You\'ll get an instant confirmation email.' },
  { icon: '📧', title: 'Onboarding Email', desc: 'Within 24 hours, you\'ll receive a detailed onboarding form to gather your business details.' },
  { icon: '🔍', title: 'Analysis & Setup', desc: 'We analyze your current presence and set up your optimization strategy.' },
  { icon: '⚡', title: 'Optimization Begins', desc: 'Our team starts implementing your chosen package - Map PowerBoost, Cloud Stack, or Citations.' },
  { icon: '📈', title: 'Results & Monitoring', desc: 'Watch your rankings improve and receive regular updates on your progress.' },
];

const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let incrementTime = 20;
    let timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#3abef9] drop-shadow-lg">{count}+</span>
      <span className="text-sm md:text-lg text-blue-100 mt-1 text-center">{label}</span>
    </div>
  );
};

const WhatWeOffer = () => {
  const [activeTab, setActiveTab] = useState('powerboost');
  const activeService = serviceTabs.find(tab => tab.key === activeTab);
  return (
    <section id="what-we-offer" className="relative py-16 md:py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      {/* Clean, Professional Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#3abef9]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-[#a3e635]/10 to-transparent rounded-full blur-2xl" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        {/* Professional Service Tabs */}
        <div className="mb-16 md:mb-20">
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12 px-4">
            {serviceTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center justify-center gap-3 px-6 md:px-8 py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${activeTab === tab.key ? 'bg-white text-gray-900 shadow-xl border-2 border-white' : 'bg-[#1a1a2a]/80 text-gray-300 border-2 border-[#3abef9]/20 hover:bg-[#2a2a3a]/80 hover:border-[#3abef9]/40'}`}
                style={{ minWidth: 'fit-content' }}
              >
                {tab.icon}
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col lg:flex-row gap-8 md:gap-12 items-center mx-4"
            >
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">{activeService.headline}</h3>
                <ul className="text-gray-300 text-base md:text-lg mb-6 space-y-3">
                  {activeService.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3abef9] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-block bg-[#3abef9]/20 text-[#3abef9] px-4 py-2 rounded-lg font-semibold text-sm border border-[#3abef9]/30">{activeService.stat}</span>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="italic text-gray-300 mb-2 text-sm md:text-base">"{activeService.testimonial}"</div>
                  <div className="text-[#3abef9] text-sm font-medium">{activeService.author}</div>
                </div>
                <button onClick={() => window.location.href=`/services/${activeTab === 'powerboost' ? 'map-powerboost' : activeTab === 'cloudstack' ? 'cloud-stack-boost' : 'local-citations'}`}
                  className="bg-[#3abef9] hover:bg-[#2a8fd9] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 mt-2 text-sm md:text-base shadow-lg hover:shadow-xl">
                  Learn More
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#3abef9]/20 to-[#a3e635]/20 rounded-2xl flex items-center justify-center shadow-lg border border-[#3abef9]/30 mb-6"
                >
                  {serviceTabs.find(tab => tab.key === activeTab).icon}
                </motion.div>
                <AnimatedCounter value={activeTab === 'powerboost' ? 150 : activeTab === 'cloudstack' ? 95 : 200} label={activeTab === 'powerboost' ? 'Businesses Helped' : activeTab === 'cloudstack' ? 'Success Rate (%)' : 'Businesses Helped'} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Professional Process Timeline */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center px-4">How Our Process Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 px-4 max-w-6xl mx-auto">
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 border border-white/20 shadow-lg">
                  {step.icon}
                </div>
                <div className="text-lg font-semibold text-white mb-2">{step.title}</div>
                <div className="text-gray-400 text-sm leading-relaxed">{step.desc}</div>
                {i < journeySteps.length - 1 && (
                  <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-[#3abef9]/40 to-[#a3e635]/40 rounded-full mt-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Professional Stats */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-center items-center px-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
              <AnimatedCounter value={200} label="Businesses Helped" />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
              <AnimatedCounter value={150} label="Avg. Ranking Improvement" />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
              <AnimatedCounter value={95} label="Success Rate (%)" />
            </div>
          </div>
        </div>

        {/* Sticky/Floating CTA has been removed as requested. */}
      </div>
    </section>
  );
};

export default WhatWeOffer; 