import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, CheckCircle, Target, Shield, TrendingUp, Zap, Layers } from 'lucide-react';

// Cloud Stack Boost payment link: https://buy.stripe.com/cNi6oH6xab9u354062dAk09
// Updated payment link - force deployment

const features = [
  {
    label: 'Cloud Stack Boost',
    desc: 'Advanced cloud-based SEO strategy to boost your local rankings and authority.'
  },
  {
    label: 'Comprehensive Local SEO',
    desc: 'Full local SEO optimization including citations, reviews, and map optimization.'
  },
  {
    label: 'Dedicated Account Manager',
    desc: 'Personal support from an experienced SEO specialist throughout your campaign.'
  },
  {
    label: 'Monthly Reports',
    desc: 'Detailed performance reports showing your ranking improvements and progress.'
  },
  {
    label: 'Ongoing Optimization',
    desc: 'Continuous monitoring and optimization to maintain and improve your rankings.'
  },
  {
    label: 'White-Hat Methods',
    desc: 'Safe, sustainable SEO techniques that build lasting authority and trust.'
  }
];

const benefits = [
  {
    icon: Target,
    title: 'Increased Local Visibility',
    description: 'Boost your presence in local search results and Google Maps'
  },
  {
    icon: TrendingUp,
    title: 'Measurable Results',
    description: 'Track your progress with detailed analytics and reporting'
  },
  {
    icon: Shield,
    title: 'Safe & Sustainable',
    description: 'White-hat SEO methods that build lasting authority'
  },
  {
    icon: Cloud,
    title: 'Cloud-Based Strategy',
    description: 'Advanced cloud technology for maximum effectiveness'
  }
];

const process = [
  {
    step: 1,
    title: 'Analysis & Strategy',
    description: 'We analyze your market and create a customized SEO strategy'
  },
  {
    step: 2,
    title: 'Implementation',
    description: 'Execute the strategy with our proven cloud-based techniques'
  },
  {
    step: 3,
    title: 'Monitoring & Optimization',
    description: 'Ongoing monitoring and optimization for continued growth'
  }
];

const requirements = [
  {
    label: 'Your/client website URL',
    desc: 'The main website you want to rank higher in local search results.'
  },
  {
    label: 'Main target keyword & 10 supporting keywords',
    desc: 'The main search phrase and 10 related phrases you want to show up for.'
  },
  {
    label: 'GBP link (formerly known as GMB)',
    desc: 'A link to your Google Business Profile (Google My Business).'
  },
  {
    label: 'Short description of your company (110 characters)',
    desc: 'A quick summary of what your business does, for your listings.'
  },
  {
    label: 'Geotagged Map Link from Map PowerBoost Package',
    desc: 'The link to your geotagged map from your previous Map PowerBoost package. This is required for Cloud Stack Boost to work effectively.'
  }
];

export default function CloudStackBoost() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/packages')}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Back to Packages</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="flex items-center gap-2">
                <img 
                  src="/images/logo.png" 
                  alt="Rankly360 Logo" 
                  className="h-6 sm:h-8 w-auto"
                />
                <span className="text-white font-semibold text-sm sm:text-base">Rankly360</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Cloud Stack Boost
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Dominate search with powerful cloud entity stacking and map embeds. Create multiple business entities and stack them for maximum local authority.
            </p>
            
            {/* CTA Buttons */}
            <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://buy.stripe.com/cloud-stack-boost-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Get Started Now
                <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
              </a>
              <button
                onClick={() => {
                  window.open('/onboarding-preview?service=Cloud Stack Boost', '_blank');
                }}
                className="inline-flex items-center justify-center gap-2 bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600/80 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base border border-slate-600/50"
              >
                Preview Onboarding Form
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
              What's Included
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{feature.label}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
              What Do We Need From You?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-semibold text-xs sm:text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{req.label}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{req.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ready to Dominate Search?
            </h2>
            <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Join businesses that have achieved top rankings with our comprehensive cloud stacking strategy.
            </p>
            <a
              href="https://buy.stripe.com/cloud-stack-boost-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Start Your Campaign
              <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
            </a>
          </div>
        </section>

        {/* Professional Disclaimer */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-slate-700/50 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Important Information</h3>
              <div className="space-y-3 sm:space-y-4 text-slate-400 text-xs sm:text-sm">
                <p className="leading-relaxed">
                  <strong className="text-white">Results & Guarantees:</strong> While we are confident in our proven methodologies and have helped hundreds of businesses achieve significant ranking improvements, we cannot guarantee specific ranking positions or results. SEO success depends on various factors including market competition, website quality, and search engine algorithm changes.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Service Delivery:</strong> We will work diligently to implement all promised features and strategies using our tested, white-hat techniques. Our team has extensive experience in local SEO and we stand behind the quality of our work.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-white">Client Responsibilities:</strong> To ensure optimal results, please ensure you have provided all required information accurately and have read through all service details. We're here to help guide you through the process.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 