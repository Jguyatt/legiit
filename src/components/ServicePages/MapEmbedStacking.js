import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Target, Shield, Users, Layers, Navigation } from 'lucide-react';

const features = [
  {
    label: 'Map Embed Stacking',
    desc: 'Strategic placement of Google Maps embeds across high-authority websites to boost local signals.'
  },
  {
    label: 'High DA Backlinks',
    desc: 'Build powerful backlinks from high Domain Authority websites to strengthen your local authority.'
  },
  {
    label: 'Local SEO Integration',
    desc: 'Integrate map embeds with comprehensive local SEO strategies for maximum impact.'
  },
  {
    label: 'Safe Implementation',
    desc: 'White-hat techniques that follow Google guidelines for sustainable results.'
  },
  {
    label: 'Performance Tracking',
    desc: 'Monitor the effectiveness of your map embed strategy with detailed analytics.'
  },
  {
    label: 'Ongoing Optimization',
    desc: 'Continuous optimization and refinement of your map embed strategy.'
  }
];

const benefits = [
  {
    icon: Target,
    title: 'Enhanced Local Signals',
    description: 'Strengthen your local search signals with strategic map embeds'
  },
  {
    icon: MapPin,
    title: 'Better Map Rankings',
    description: 'Improve your position in Google Maps and local pack results'
  },
  {
    icon: Shield,
    title: 'Safe & Sustainable',
    description: 'White-hat techniques that build lasting authority'
  },
  {
    icon: Users,
    title: 'Increased Visibility',
    description: 'Boost your visibility in local search results'
  }
];

const process = [
  {
    step: 1,
    title: 'Strategy Development',
    description: 'Develop a customized map embed strategy for your business'
  },
  {
    step: 2,
    title: 'Implementation',
    description: 'Execute the strategy with safe, white-hat techniques'
  },
  {
    step: 3,
    title: 'Monitoring & Optimization',
    description: 'Track performance and optimize for continued growth'
  }
];

export default function MapEmbedStacking() {
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
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Map Embed Stacking
            </h1>
          </div>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Boost your local SEO with strategic map embed stacking. 
            Place your Google Maps embeds on high-authority websites for maximum impact.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Started Now
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
            <button
              onClick={() => {
                window.open('/onboarding-preview?service=Map Embed Stacking', '_blank');
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
            Why Map Embed Stacking Works
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
            Join businesses that have improved their local rankings with our map embed stacking strategy.
          </p>
          <a
            href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
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