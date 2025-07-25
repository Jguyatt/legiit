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

const Packages = () => {
  const navigate = useNavigate();

  const packageRoutes = {
    'Map PowerBoost': '/services/map-powerboost',
    'Local Citations': '/services/local-citations',
    'Cloud Stack Boost': '/services/cloud-stack-boost',
    'Platinum Local SEO': '/services/platinum-local-seo'
  };

  const managedServices = [
    {
      name: 'Map PowerBoost',
      desc: 'Supercharge your Google Maps ranking with advanced geo-optimization.',
      price: '$249/mo',
      icon: Navigation,
      color: 'from-blue-500 to-blue-600',
      route: '/service/map-powerboost',
    },
    {
      name: 'Local Citations',
      desc: 'Boost local authority with 100+ high-quality business listings.',
      price: '$299/mo',
      icon: Database,
      color: 'from-green-500 to-green-600',
      route: '/service/local-citations',
    },
    {
      name: 'Cloud Stack Boost',
      desc: 'Dominate search with powerful cloud entity stacking and map embeds.',
      price: '$347/mo',
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
      price: '$849/mo',
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white px-2 sm:px-6 pb-12">
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
          <p className="text-sm text-gray-400">Local SEO Platform</p>
        </div>
      </motion.div>

      {/* Managed Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Our Services</h2>
          <p className="text-gray-300">Choose the perfect solution for your business.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {managedServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceClick(service.name)}
                className="bg-[#181c23] rounded-2xl p-6 flex flex-col border border-[#3abef9]/10 shadow-lg cursor-pointer transition-all duration-300 hover:border-[#3abef9]/40 hover:shadow-xl group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
                <p className="text-[#3abef9] font-bold mb-2">{service.price}</p>
                <p className="text-gray-300 text-xs mb-4 flex-1">{service.desc}</p>
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
                    className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm shadow group-hover:shadow-md"
                    onClick={e => { e.stopPropagation(); handleServiceClick(service.name); }}
                  >
                    Learn More
                  </button>
                )}
              </motion.div>
            );
          })}
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
          <p className="text-gray-300">Curated packages for the best value and results.</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {bundles.map((bundle, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleServiceClick(bundle.name)}
              className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/10 border border-yellow-400/30 rounded-2xl p-8 shadow-xl max-w-lg w-full cursor-pointer transition-all duration-300 hover:shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">{bundle.badge}</div>
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{bundle.name}</h3>
              <p className="text-yellow-300 font-bold text-lg mb-2">{bundle.price}</p>
              <p className="text-gray-200 text-sm mb-6">{bundle.description}</p>
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 rounded-lg transition-colors text-sm shadow"
                onClick={e => { e.stopPropagation(); handleServiceClick(bundle.name); }}
              >
                {bundle.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Packages; 