import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, Target, Shield, Users, MessageSquare, ThumbsUp, Heart } from 'lucide-react';

const features = [
  {
    label: 'Review Monitoring & Management',
    desc: 'Comprehensive monitoring and management of your online reviews across all platforms.'
  },
  {
    label: 'Review Response Strategy',
    desc: 'Professional response strategies for both positive and negative reviews.'
  },
  {
    label: 'Review Generation',
    desc: 'Ethical strategies to encourage satisfied customers to leave positive reviews.'
  },
  {
    label: 'Reputation Management',
    desc: 'Proactive reputation management to maintain and improve your online presence.'
  },
  {
    label: 'Review Analytics',
    desc: 'Detailed analytics and reporting on your review performance and sentiment.'
  },
  {
    label: 'Crisis Management',
    desc: 'Rapid response strategies for handling negative reviews and reputation crises.'
  }
];

const benefits = [
  {
    icon: Star,
    title: 'Improved Ratings',
    description: 'Increase your average rating and overall review score'
  },
  {
    icon: Users,
    title: 'Customer Trust',
    description: 'Build trust and credibility with potential customers'
  },
  {
    icon: Target,
    title: 'Better Rankings',
    description: 'Improve your local search rankings with positive reviews'
  },
  {
    icon: Shield,
    title: 'Reputation Protection',
    description: 'Protect and enhance your online reputation'
  }
];

const process = [
  {
    step: 1,
    title: 'Review Audit',
    description: 'Analyze your current review landscape and identify opportunities'
  },
  {
    step: 2,
    title: 'Strategy Implementation',
    description: 'Implement review management strategies and response protocols'
  },
  {
    step: 3,
    title: 'Ongoing Management',
    description: 'Continuous monitoring and proactive reputation management'
  }
];

export default function ReviewManagement() {
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
              <Star className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Review Management
            </h1>
          </div>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Build and protect your online reputation with professional review management. 
            Turn customer feedback into a powerful tool for business growth.
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
                window.open('/onboarding-preview?service=Review Management', '_blank');
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
            Why Review Management Matters
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
            Ready to Manage Your Reviews?
          </h2>
          <p className="text-slate-400 mb-8">
            Join businesses that have improved their reputation and rankings with our review management services.
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