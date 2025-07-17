import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, TrendingUp, MapPin, Clock, Star } from 'lucide-react';

const GoogleMapsPowerBoost = () => {
  const features = [
    '300 Local Geotagged Google Map Points',
    '15–45 Mile Radius with 5-Mile Bonus Expansion',
    'Driving Direction Paths',
    'Geotagged Images',
    'NAP Embedding + Stacked Media (Photos & Videos)',
    '99 High-DA Backlinks (CID Indexed)',
    '30-Day Drip Feed Strategy'
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Map Pack Domination',
      description: 'Rank in the top 3 positions of Google Maps for your target keywords'
    },
    {
      icon: MapPin,
      title: 'Local Visibility',
      description: 'Get discovered by customers searching in your local area'
    },
    {
      icon: Clock,
      title: 'Fast Results',
      description: 'See improvements in as little as 30 days with our proven strategy'
    },
    {
      icon: Star,
      title: 'Proven Track Record',
      description: 'Successfully helped 150+ businesses dominate their local markets'
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
              Google Maps PowerBoost 🚀
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Our signature local SEO strategy helps your business dominate the Google Map Pack using advanced geo-optimization techniques and citation stacking.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose PowerBoost?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Client Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Results:</h2>
          
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                San Diego Plumbing Company
              </h3>
              <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                <img
                  src="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Google+Maps+Ranking+Results"
                  alt="San Diego Plumbing GBP Ranking Results"
                  className="rounded-lg w-full mb-4"
                />
                <p className="text-gray-600 text-sm">
                  This client ranked top 3 in the Google Map Pack for 9 local keywords in under 30 days.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Top 3</div>
              <div className="text-gray-600">Average Ranking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">30 Days</div>
              <div className="text-gray-600">Time to Results</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">9 Keywords</div>
              <div className="text-gray-600">Local Terms Ranked</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Dominate Your Local Market?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join hundreds of businesses that have transformed their local visibility with our PowerBoost strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                View Pricing
              </motion.a>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
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

export default GoogleMapsPowerBoost; 