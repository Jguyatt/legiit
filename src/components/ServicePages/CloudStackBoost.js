import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, CheckCircle, Target, Shield, TrendingUp, Zap, Layers } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/packages')}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Packages</span>
            </button>
            <div className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Rankly360 Logo" 
                className="h-8 w-auto"
              />
              <span className="text-white font-semibold">Rankly360</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Cloud Stack Boost
            </h1>
          </div>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Advanced cloud-based local SEO strategy designed to maximize your local visibility 
            and drive qualified leads to your business.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/3cIeVdf3G2CY9ts7yudAk04"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Started Now
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
            <button
              onClick={() => {
                window.open('/onboarding-preview?service=Cloud Stack Boost', '_blank');
              }}
              className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Preview Onboarding Form
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Why Choose Cloud Stack Boost?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">{feature.label}</h3>
                    <p className="text-slate-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What We Need From You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{req.label}</h3>
                    <p className="text-slate-400 text-sm">{req.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6 border border-slate-600 text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Boost Your Local Rankings?
          </h2>
          <p className="text-slate-400 mb-8">
            Join businesses that have achieved top rankings with our cloud-based SEO strategy.
          </p>
          <a
            href="https://buy.stripe.com/3cIeVdf3G2CY9ts7yudAk04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Your Campaign
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </a>
        </div>
      </section>

      {/* Professional Disclaimer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-6">Important Information</h3>
            <div className="space-y-4 text-slate-400 text-sm">
              <p>
                <strong className="text-white">Results & Guarantees:</strong> While we are confident in our proven methodologies and have helped hundreds of businesses achieve significant ranking improvements, we cannot guarantee specific ranking positions or results. SEO success depends on various factors including market competition, website quality, and search engine algorithm changes.
              </p>
              <p>
                <strong className="text-white">Service Delivery:</strong> We will work diligently to implement all promised features and strategies using our tested, white-hat techniques. Our team has extensive experience in local SEO and we stand behind the quality of our work.
              </p>
              <p>
                <strong className="text-white">Client Responsibilities:</strong> To ensure optimal results, please ensure you have provided all required information accurately and have read through all service details. We're here to help guide you through the process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 