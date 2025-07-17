import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Crown, TrendingUp, Shield, Clock, Star, Users, Zap } from 'lucide-react';

const LocalSEODomination = () => {
  const features = [
    'Everything from Google Maps PowerBoost',
    'Everything from Authority Embeds Package',
    'Priority implementation & support',
    'Dedicated account manager',
    'Weekly progress reports',
    '60-day results commitment',
    'Custom strategy consultation',
    'Exclusive access to advanced techniques'
  ];

  const powerBoostFeatures = [
    '300 Local Geotagged Google Map Points',
    '15–45 mile radius maps + 5-mile bonus radius',
    '20 driving direction paths embedded',
    '10 Geotagged images inside Google MyMaps',
    'NAP embedded, Video + Photo Stacking',
    '99 High DA backlinks with CID link indexing',
    '30-Day Drip Feed & SEO Recommendations'
  ];

  const authorityFeatures = [
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
      icon: Crown,
      title: 'Complete Domination',
      description: 'Dominate both Google Maps and organic search with comprehensive local SEO strategy'
    },
    {
      icon: Shield,
      title: 'Premium Support',
      description: 'Dedicated account manager and priority support for maximum results'
    },
    {
      icon: Clock,
      title: 'Proven Results',
      description: '60-day results commitment with weekly progress reports'
    },
    {
      icon: Star,
      title: 'Exclusive Access',
      description: 'Access to advanced techniques and custom strategies not available elsewhere'
    }
  ];

  const results = [
    {
      icon: TrendingUp,
      value: 'Top 3',
      label: 'Average Google Maps Ranking',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      value: '500%',
      label: 'Average Increase in Calls',
      color: 'text-green-500'
    },
    {
      icon: Clock,
      value: '60 Days',
      label: 'Results Commitment',
      color: 'text-orange-500'
    },
    {
      icon: Zap,
      value: '100%',
      label: 'Success Rate',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16">
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
              Local SEO Domination Package 👑
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              The ultimate local SEO solution combining both PowerBoost and Authority Embeds for complete market domination. Get the best of both worlds with maximum results.
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
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {features.slice(4).map((feature, index) => (
                <li key={index + 4} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Package Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Complete Package Breakdown</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PowerBoost */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Google Maps PowerBoost</h3>
              </div>
              <ul className="space-y-2">
                {powerBoostFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authority Embeds */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Authority Embeds Package</h3>
              </div>
              <ul className="space-y-2">
                {authorityFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Domination Package?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Expected Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <result.icon className={`w-8 h-8 ${result.color}`} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${result.color} mb-2`}>
                  {result.value}
                </div>
                <div className="text-gray-600">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              60-Day Results Commitment
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We're so confident in our Domination Package that we offer a 60-day results commitment. If you don't see significant improvements in your local rankings and lead generation, we'll work with you until you do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">Weekly</div>
                <div className="text-gray-600">Progress Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-2">Dedicated</div>
                <div className="text-gray-600">Account Manager</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">Priority</div>
                <div className="text-gray-600">Support Access</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Dominate Your Local Market?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join businesses that have achieved complete local SEO domination with our comprehensive package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                View Pricing
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200"
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

export default LocalSEODomination; 