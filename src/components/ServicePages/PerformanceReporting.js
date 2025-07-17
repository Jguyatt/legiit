import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, TrendingUp, Phone, Eye, CheckCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const PerformanceReporting = () => {
  const waysToSeeResults = [
    {
      icon: Search,
      title: 'Search Your Business',
      description: 'Simply search for your business name on Google and see your improved rankings in the Map Pack and organic results.'
    },
    {
      icon: TrendingUp,
      title: 'Google Business Profile',
      description: 'Check your GBP dashboard to see increased views, clicks, and calls from local customers finding you online.'
    },
    {
      icon: Phone,
      title: 'More Phone Calls',
      description: 'Notice an increase in phone calls from customers who found you through Google Maps and local search.'
    },
    {
      icon: Eye,
      title: 'Website Traffic',
      description: 'See more visitors to your website from local search results and Google Maps clicks.'
    }
  ];

  const whatYoullNotice = [
    {
      title: 'Higher Rankings',
      description: 'Your business appears higher in Google Maps and local search results for your target keywords.'
    },
    {
      title: 'More Visibility',
      description: 'Increased views and clicks on your Google Business Profile from local customers.'
    },
    {
      title: 'Real Business Growth',
      description: 'More phone calls, website visits, and inquiries from customers finding you online.'
    },
    {
      title: 'Competitive Advantage',
      description: 'Outrank your competitors in local search results and capture more local market share.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white">
      {/* Header */}
      <div className="bg-[#10111a]/90 backdrop-blur-sm border-b border-[#3abef9]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="text-[#3abef9] hover:text-white font-semibold text-lg transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-[#3abef9] font-bold text-xl">Rankly360</div>
          <button
            onClick={() => window.location.href = '/packages'}
            className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Packages
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-electric-blue drop-shadow-lg">How to See Your Results</h1>
          <p className="text-2xl text-gray-200 mb-6 max-w-4xl mx-auto">We don't provide monthly reports, but the results speak for themselves. Here's how you can track your progress and see the real impact of our local SEO work.</p>
        </div>

        {/* Ways to See Results */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center">How You'll See Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {waysToSeeResults.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#181c2a] rounded-2xl p-6 border-l-4 border-[#3abef9] shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#3abef9]/20 rounded-xl flex items-center justify-center">
                    <way.icon className="w-6 h-6 text-[#3abef9]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{way.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{way.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What You'll Notice */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center">What You'll Notice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatYoullNotice.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#181c2a] rounded-2xl p-6 border-l-4 border-orange-400 shadow-lg"
              >
                <h3 className="text-xl font-bold text-orange-400 mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#181c2a]/80 to-[#23263a]/80 rounded-3xl p-8 border border-[#3abef9]/20 text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">The Best Way to Track Progress</h3>
          <p className="text-xl text-gray-300 mb-6">
            Simply search for your business on Google and see the improvements for yourself! 
            You'll notice your rankings getting better, more people clicking on your listing, 
            and ultimately more phone calls and customers coming through your door.
          </p>
          <p className="text-lg text-blue-300">
            <strong>No complicated reports needed - the results are visible every time someone searches for your business!</strong>
          </p>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to See Real Results?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your local SEO campaign today and watch your business climb the Google Maps rankings.
          </p>
          <button
            onClick={() => window.location.href = '/packages'}
            className="bg-gradient-to-r from-orange-500 to-electric-blue text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReporting; 