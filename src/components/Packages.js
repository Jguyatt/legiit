import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Zap, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const navigate = useNavigate();

  const packageRoutes = {
    'Map PowerBoost': '/services/map-powerboost',
    'Google Maps iFrame Cloud Stack Boost 🚀': '/services/cloud-stack-boost',
    'Local Citations for Local SEO': '/services/local-citations'
  };

  const packages = [
    {
      name: 'Map PowerBoost',
      price: '$249/mo',
      description: 'One-time Google Maps optimization boost to skyrocket your local rankings',
      features: [
        '300 Local Geotagged Map Points',
        '15-45 mile radius coverage',
        '20 driving direction paths',
        '10 Geotagged images',
        'NAP embedded stacking',
        '99 High DA backlinks',
        '30-Day Drip Feed',
        'Full Indexing Verification'
      ],
      cta: 'Order Now',
      popular: false,
      color: 'from-[#3ABEF9] to-[#007BFF]',
      icon: TrendingUp
    },
    {
      name: 'Google Maps iFrame Cloud Stack Boost 🚀',
      price: '$347/mo',
      description: 'Boost your Google Business Profile rankings with our powerful cloud stack + map embed strategy. Safe, proven, and effective for local visibility.',
      features: [
        '800x map iFrame embeds',
        'Web 2.0 DA20+ links',
        'YouTube geotagged video embeds',
        '30-day Slow Safe Stacking dripfeed',
        'Full backlink report (Google Sheet)',
        '100% safe – links point to tiered assets, not your main site'
      ],
      cta: 'Order Now',
      popular: false,
      color: 'from-[#a3e635] to-[#84cc16]',
      icon: Zap
    },
    {
      name: 'Local Citations for Local SEO',
      price: '$299/mo',
      description: 'Supercharge your online presence with 100% manually built, high-DA local citations—designed to boost your rankings on Google Maps and organic search.',
      features: [
        '150x High DA Local Citations (Premium)',
        'Fresh accounts for each listing',
        '100% NAP consistency (Name, Address, Phone)',
        'Logo included for brand authority',
        'Search engine-friendly placements',
        'Proven ranking improvements',
        'Full report with login access (Google Sheet)'
      ],
      cta: 'Order Now',
      popular: false,
      color: 'from-[#00FFFF] to-[#06b6d4]',
      icon: Star
    }
  ];

  // Add Platinum package
  const platinumPackage = {
    name: 'Platinum Local SEO Package',
    price: '$849/mo',
    description: 'The ultimate local SEO solution: includes Map PowerBoost, Cloud Stack Boost, and Local Citations. Maximum ranking power, authority, and visibility for your business.',
    features: [
      'Everything in Map PowerBoost',
      'Everything in Cloud Stack Boost',
      'Everything in Local Citations',
      'Priority implementation & support',
      'Dedicated account manager',
      'Full reporting & consultation',
      'Best for businesses who want to dominate their local market',
    ],
    cta: 'Learn More',
    popular: true,
    color: 'from-[#f59e42] to-[#fbbf24]',
    icon: Star
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#09090f]">
      {/* Space background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-[#3abef9]/40 rounded-full blur-[1px]" />
        <div className="absolute top-40 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full blur-[0.8px]" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-[#00ffff]/50 rounded-full blur-[1.2px]" />
        <div className="absolute bottom-20 right-1/4 w-0.8 h-0.8 bg-[#3abef9]/35 rounded-full blur-[1px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#3abef9] hover:text-[#007bff] transition-colors duration-300 mb-8 mt-24"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
        {/* Section Header */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-[#3abef9] to-[#007bff] bg-clip-text text-transparent px-4">
                Our Local SEO Packages
              </h1>
              <p className="text-lg sm:text-xl text-[#9ca3af] max-w-3xl mx-auto px-4">
                Choose the package that fits your needs. All packages include our 30-day results commitment and are designed to dominate Google Maps.
              </p>
              {/* Pricing Explanation Section (now directly under header) */}
              <div className="flex justify-center mt-6 sm:mt-8 px-4">
                <div className="bg-[#181c2a]/80 border border-[#3ABEF9]/20 rounded-2xl px-4 sm:px-8 py-4 sm:py-6 max-w-2xl text-center shadow-md">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Simple, Transparent Monthly Pricing</h2>
                  <p className="text-blue-100 text-sm sm:text-base mb-2">All prices are billed monthly and include everything listed—no hidden fees, no contracts, and no surprises. You can upgrade, downgrade, or cancel your plan at any time with no penalty.</p>
                  <p className="text-blue-200 text-xs sm:text-sm">We believe in earning your business every month with real results. If you ever want to stop, you can cancel anytime—no questions asked.</p>
                </div>
              </div>
            </motion.div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16 px-4 sm:px-0">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-gradient-to-br from-[#10111a] to-[#0a0a0f] rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    pkg.popular
                      ? 'border-[#a3e635] shadow-[#a3e635]/20'
                      : 'border-[#3ABEF9]/30 hover:border-[#3ABEF9]'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-black px-6 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${pkg.color} rounded-2xl mb-3 sm:mb-4`}>
                      <pkg.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{pkg.price}</div>
                    <p className="text-[#9ca3af] text-xs sm:text-sm leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#3ABEF9] mt-0.5 flex-shrink-0" />
                        <span className="text-[#9ca3af] text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <button
                      onClick={() => navigate(packageRoutes[pkg.name])}
                      className={`w-full bg-gradient-to-r ${pkg.color} hover:from-[#007BFF] hover:to-[#0052CC] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95 touch-manipulation`}
                      style={{ minHeight: '48px' }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Platinum Package Horizontal Card */}
            <div className="flex justify-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-r from-[#f59e42] to-[#fbbf24] rounded-3xl p-10 border-4 border-yellow-400 shadow-2xl flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full"
              >
                <div className="flex flex-col items-center md:items-start flex-1">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#fbbf24] to-[#f59e42] rounded-2xl mb-4 shadow-lg">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-2">{platinumPackage.name}</h3>
                  <div className="text-5xl font-extrabold text-white mb-2">{platinumPackage.price}</div>
                  <p className="text-[#fff7e6] text-lg leading-relaxed mb-4 max-w-xl">{platinumPackage.description}</p>
                  <ul className="list-disc pl-6 text-white text-base mb-6">
                    {platinumPackage.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/services/platinum-local-seo')}
                    className="w-full bg-gradient-to-r from-[#fbbf24] to-[#f59e42] hover:from-[#f59e42] hover:to-[#fbbf24] text-white font-bold py-4 px-10 rounded-xl shadow-lg text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 border-2 border-white"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e42] text-black px-8 py-2 rounded-full text-lg font-bold border-2 border-yellow-300 shadow-lg">Most Popular</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-[#3abef9]/10 to-[#007bff]/10 p-8 rounded-2xl border border-[#3abef9]/30">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Not Sure Which Package is Right for You?
                </h3>
                <p className="text-[#9ca3af] mb-6 max-w-2xl mx-auto">
                  Book a free strategy call and we'll analyze your current rankings, competitors, and goals to recommend the perfect package for your business.
                </p>
                <button 
                  onClick={() => window.open('https://calendly.com/ranklyai/30min', '_blank')}
                  className="bg-gradient-to-r from-[#3ABEF9] to-[#007BFF] hover:from-[#007BFF] hover:to-[#0052CC] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book Free Strategy Call
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Packages; 