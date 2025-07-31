import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Building,
  Cloud,
  Star,
  Navigation,
  Database,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Updated pricing - Map PowerBoost: $299, Cloud Stack Boost: $349, Local Citations: $299
// All prices are one-time payments, not monthly subscriptions

const Packages = () => {
  const navigate = useNavigate();

  const packageRoutes = {
    'Map PowerBoost': '/services/map-powerboost',
    'Local Citations': '/services/local-citations',
    'Cloud Stack Boost': '/services/cloud-stack-boost',
    'Platinum Local SEO': '/services/platinum-local-seo'
  };

  const services = [
    {
      name: 'Map PowerBoost',
      desc: 'Supercharge your Google Maps ranking with advanced geo-optimization.',
      price: '$299',
      icon: Navigation,
      color: 'from-blue-500 to-blue-600',
      route: '/service/map-powerboost',
    },
    {
      name: 'Local Citations',
      desc: 'Boost local authority with 100+ high-quality business listings.',
      price: '$299',
      icon: Database,
      color: 'from-green-500 to-green-600',
      route: '/service/local-citations',
    },
    {
      name: 'Cloud Stack Boost',
      desc: 'Dominate search with powerful cloud entity stacking and map embeds.',
      price: '$349',
      icon: Cloud,
      color: 'from-purple-500 to-purple-600',
      route: '/service/cloud-stack-boost',
    },
    {
      name: 'Test',
      desc: 'Test service for payment integration. Use this to try out the checkout flow.',
      price: '$1',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      externalLink: 'https://buy.stripe.com/eVqdR9aNq5PagVU062dAk07',
    },
  ];

  const bundles = [
    {
      name: 'Platinum Local SEO',
      price: '$849',
      description: 'Everything in Map PowerBoost, Cloud Stack Boost, Local Citations, and more. Priority support & dedicated account manager.',
      icon: Star,
      color: 'from-yellow-400 to-yellow-600',
      badge: 'Premium',
      cta: 'Get Platinum',
    }
  ];

  const handleServiceClick = (serviceName) => {
    const route = packageRoutes[serviceName];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white px-2 sm:px-6 pb-12 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8 pt-8 sm:pt-12 justify-center"
        >
          <img src="/images/logo.png" alt="Rankly360 Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-2xl font-bold text-white">Rankly360</h1>
            <p className="text-sm text-slate-400">Local SEO Platform</p>
          </div>
        </motion.div>

        {/* One-Time Add-Ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">One-Time Add-Ons</h2>
            <p className="text-slate-300">Enhance your SEO with powerful one-time services.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(service.name)}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col border border-slate-600/50 shadow-lg cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
                  <p className="text-blue-400 font-bold mb-2">{service.price}</p>
                  <p className="text-slate-300 text-xs mb-4 flex-1">{service.desc}</p>
                  {service.externalLink ? (
                    <a
                      href={service.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors text-sm shadow group-hover:shadow-md text-center"
                      onClick={e => { e.stopPropagation(); }}
                    >
                      Buy Now
                    </a>
                  ) : (
                    <button
                      className="mt-auto w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300 text-sm shadow group-hover:shadow-md"
                      onClick={e => { e.stopPropagation(); handleServiceClick(service.name); }}
                    >
                      Add Service
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Fulfillment Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-400/30 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <h3 className="text-lg font-bold text-white">Fast Fulfillment Guarantee</h3>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              All of our one-off service orders will be fulfilled in <span className="text-green-400 font-semibold">14 days or less</span>. 
              We're committed to delivering results quickly so you can start seeing improvements to your local SEO rankings.
            </p>
          </div>
        </motion.div>

        {/* Bundles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Bundles</h2>
            <p className="text-slate-300">Curated packages for the best value and results.</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            {bundles.map((bundle, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceClick(bundle.name)}
                className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 rounded-2xl p-8 shadow-xl max-w-lg w-full cursor-pointer transition-all duration-300 hover:shadow-2xl relative backdrop-blur-sm"
              >
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">{bundle.badge}</div>
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{bundle.name}</h3>
                <p className="text-yellow-300 font-bold text-lg mb-2">{bundle.price}</p>
                <p className="text-slate-200 text-sm mb-6">{bundle.description}</p>
                <button
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold py-2 rounded-lg transition-all duration-300 text-sm shadow"
                  onClick={e => { e.stopPropagation(); handleServiceClick(bundle.name); }}
                >
                  {bundle.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Packages; 