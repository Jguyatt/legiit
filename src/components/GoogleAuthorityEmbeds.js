import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, TrendingUp, Clock, Zap } from 'lucide-react';

const GoogleAuthorityEmbeds = () => {
  const features = [
    '800x iFrame Stacking Map Embeds',
    'Geotagged YouTube Video Embeds',
    'Web 2.0 Links from DA 20–30+ Sites',
    'High DA Do-Follow Tiered Backlinks',
    'Fully Search Engine Safe & Friendly',
    '30-Day Drip Feed via Indexification',
    'Google Sheet Backlink Report',
    'Full Indexing Verification Instructions'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'SSF (Slow Safe Stacking) strategy ensures search engine compliance'
    },
    {
      icon: TrendingUp,
      title: 'Authority Building',
      description: 'Build domain authority with high-quality backlinks and embeds'
    },
    {
      icon: Clock,
      title: 'Gradual Growth',
      description: '30-day drip feed ensures natural, sustainable ranking improvements'
    },
    {
      icon: Zap,
      title: 'Comprehensive Reporting',
      description: 'Detailed Google Sheet reports with full indexing verification'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-orange-500 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/#services"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </a>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Google Authority Embeds Package 🔗
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Supercharge your local rankings with 800+ iframe stacked map embeds and Web 2.0 backlinks — all safely drip-fed over 30 days using our SSF (Slow Safe Stacking) strategy.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {features.slice(4).map((feature, index) => (
                <li key={index + 4} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Authority Embeds?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Strategy Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our SSF Strategy Explained</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Slow</h3>
              <p className="text-gray-600 text-sm">Gradual implementation over 30 days to avoid search engine penalties</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe</h3>
              <p className="text-gray-600 text-sm">White-hat techniques that comply with search engine guidelines</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stacking</h3>
              <p className="text-gray-600 text-sm">Layered approach combining embeds, backlinks, and citations</p>
            </div>
          </div>
        </motion.div>

        {/* Results Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">800+</div>
              <div className="text-gray-600">Map Embeds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">DA 20-30+</div>
              <div className="text-gray-600">Web 2.0 Sites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">30 Days</div>
              <div className="text-gray-600">Drip Feed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Safe & Compliant</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Authority & Dominate Search?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join businesses that have transformed their search rankings with our proven Authority Embeds strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                View Pricing
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                Book Consultation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GoogleAuthorityEmbeds; 