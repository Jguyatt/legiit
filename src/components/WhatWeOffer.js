import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Zap, Star } from 'lucide-react';

const serviceTabs = [
  {
    key: 'powerboost',
    label: 'Map PowerBoost',
    icon: <MapPin className="w-8 h-8 text-[#3abef9]" />,
    headline: 'Skyrocket Your Local Rankings',
    details: [
      '300+ geotagged map points & driving directions',
      'Powerful local signals for Google Maps',
      'One-time boost, fast results',
    ],
    stat: '+200% Avg. Lead Increase',
    testimonial: '“We went from invisible to top 3 in 6 weeks. Calls doubled!”',
    author: '— Sarah, Plumber in Toronto',
    color: 'from-[#1e3a8a] to-[#3abef9]'
  },
  {
    key: 'cloudstack',
    label: 'Cloud Stack Boost',
    icon: <Zap className="w-8 h-8 text-[#a3e635]" />,
    headline: 'Authority & Trust Signals',
    details: [
      '800x map iFrame embeds & Web 2.0 links',
      'YouTube geotagged video embeds',
      'Safe, white-hat, proven for local SEO',
    ],
    stat: '99% Indexing Rate',
    testimonial: '“Our rankings jumped and we saw real, trackable results.”',
    author: '— Mike, Dental Clinic Owner',
    color: 'from-[#a3e635] to-[#3abef9]'
  },
  {
    key: 'citations',
    label: 'Local Citations',
    icon: <Star className="w-8 h-8 text-[#00ffff]" />,
    headline: 'Get Found Where It Matters',
    details: [
      '150+ real local directory listings (not just random spam)',
      'Your info is the same everywhere online—no confusion for Google or customers',
      'Google actually trusts you more when your business details match up',
    ],
    stat: '500+ Businesses Helped',
    testimonial: '"We finally show up when people search for us. The reports actually make sense and I can see where my business is listed."',
    author: '— Priya, Law Firm Partner',
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
      <span className="text-4xl md:text-5xl font-extrabold text-[#3abef9] drop-shadow-lg">{count}+</span>
      <span className="text-lg text-blue-100 mt-1">{label}</span>
    </div>
  );
};

const WhatWeOffer = () => {
  const [activeTab, setActiveTab] = useState('powerboost');
  const activeService = serviceTabs.find(tab => tab.key === activeTab);
  return (
    <section id="what-we-offer" className="relative py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      {/* Parallax/Glowing Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 animate-pulse">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3abef9]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-[#00ffff]/20 rounded-full blur-2xl animate-float2" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-[#a3e635]/20 rounded-full blur-2xl animate-float3" />
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            How We Help Local Businesses Dominate Google Maps
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We combine advanced technology, proven strategies, and a relentless focus on results to get you to the top of Google Maps—where your customers are searching.
          </p>
        </motion.div>

        {/* Animated Service Tabs */}
        <div className="mb-20">
          <div className="flex justify-center gap-4 mb-8">
            {serviceTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 border-2 ${activeTab === tab.key ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg border-transparent scale-105' : 'bg-[#181c2a] text-blue-100 border-[#3abef9]/30 hover:bg-[#23263a]'}`}
                style={{ minWidth: 180 }}
              >
                {tab.icon}
                {tab.label}
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
              className="bg-gradient-to-br from-[#181c2a]/90 to-[#23263a]/80 rounded-3xl p-10 shadow-2xl border border-[#3abef9]/20 flex flex-col md:flex-row gap-10 items-center"
            >
              <div className="flex-1 flex flex-col items-center md:items-start">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{activeService.headline}</h3>
                <ul className="text-blue-100 text-lg mb-4 list-disc list-inside">
                  {activeService.details.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block bg-[#3abef9]/10 text-[#3abef9] px-4 py-2 rounded-full font-semibold text-lg border border-[#3abef9]/30">{activeService.stat}</span>
                </div>
                <div className="italic text-blue-200 mb-2">{activeService.testimonial}</div>
                <div className="text-blue-300 mb-4">{activeService.author}</div>
                <button onClick={() => window.location.href=`/services/${activeTab === 'powerboost' ? 'map-powerboost' : activeTab === 'cloudstack' ? 'cloud-stack-boost' : 'local-citations'}`}
                  className="bg-gradient-to-r from-[#3abef9] to-[#00ffff] hover:from-[#00ffff] hover:to-[#3abef9] text-[#0f172a] font-bold py-3 px-8 rounded-xl shadow transition-all duration-300 mt-2">
                  Learn More
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="w-64 h-64 bg-gradient-to-br from-[#3abef9]/30 to-[#23263a]/40 rounded-2xl flex items-center justify-center shadow-xl border-2 border-[#3abef9]/20 mb-4"
                >
                  {serviceTabs.find(tab => tab.key === activeTab).icon}
                </motion.div>
                <AnimatedCounter value={activeTab === 'powerboost' ? 200 : activeTab === 'cloudstack' ? 99 : 500} label={activeTab === 'powerboost' ? 'Avg. Lead Increase (%)' : activeTab === 'cloudstack' ? 'Indexing Rate (%)' : 'Businesses Helped'} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated Timeline: Your Journey to the Top 3 */}
        <div className="mb-20">
          <h3 className="text-3xl font-extrabold text-white mb-8 text-center">Your Journey to the Top 3</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#3abef9]/30 to-[#23263a]/30 rounded-full flex items-center justify-center text-3xl font-bold mb-2 border-2 border-[#3abef9]/30 animate-pulse">
                  {step.icon}
                </div>
                <div className="text-lg font-bold text-white mb-1 text-center">{step.title}</div>
                <div className="text-blue-100 text-center text-sm mb-2">{step.desc}</div>
                {i < journeySteps.length - 1 && (
                  <div className="w-1 h-8 md:w-8 md:h-1 bg-gradient-to-r from-[#3abef9]/40 to-[#00ffff]/40 rounded-full md:rotate-0 rotate-90 mb-2 md:mb-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <div className="mb-20 flex flex-col md:flex-row gap-12 justify-center items-center">
          <AnimatedCounter value={500} label="Businesses Helped" />
          <AnimatedCounter value={200} label="Avg. Lead Increase (%)" />
          <AnimatedCounter value={99} label="Indexing Rate (%)" />
        </div>

        {/* Sticky/Floating CTA has been removed as requested. */}
      </div>
    </section>
  );
};

export default WhatWeOffer; 