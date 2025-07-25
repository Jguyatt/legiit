import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Target, Shield, Users, Building, ExternalLink, MapPin, Globe, Award, Database } from 'lucide-react';

const features = [
  {
    label: '150x High DA Local Citations (Premium)',
    desc: 'We manually build 150 citations on high Domain Authority local directories. These listings act as digital endorsements, signaling trust and legitimacy to search engines like Google and Bing.'
  },
  {
    label: 'Fresh accounts for each listing',
    desc: 'Every citation is created with a fresh account, ensuring maximum authenticity and reducing the risk of duplicate or flagged listings.'
  },
  {
    label: '100% NAP consistency (Name, Address, Phone)',
    desc: 'We guarantee that your business Name, Address, and Phone number are consistent across all listings, which is critical for local SEO and trust.'
  },
  {
    label: 'Logo included for brand authority',
    desc: 'Your business logo is included in each listing, boosting your brand authority and recognition across the web.'
  },
  {
    label: 'Search engine-friendly placements',
    desc: 'We only use trusted, search engine-friendly directories known to positively impact local rankings.'
  },
  {
    label: 'Proven ranking improvements',
    desc: 'Our citation strategy is tested and proven to deliver measurable improvements in Google Maps and organic search rankings.'
  },
  {
    label: 'Full report with login access (Google Sheet)',
    desc: 'You receive a complete Google Sheet report with all your listings, login details, and status for full transparency.'
  }
];

const benefits = [
  {
    icon: Target,
    title: 'Improved Local Rankings',
    description: 'Boost your visibility in local search results and Google Maps'
  },
  {
    icon: Globe,
    title: 'Consistent Business Info',
    description: 'Ensure your business information is accurate across all platforms'
  },
  {
    icon: Award,
    title: 'Trust & Authority',
    description: 'Build trust with search engines and potential customers'
  },
  {
    icon: MapPin,
    title: 'Local Customer Reach',
    description: 'Connect with local customers searching for your services'
  }
];

const requirements = [
  {
    label: 'Your/client website url',
    desc: 'The main website you want to rank higher in local search results.'
  },
  {
    label: 'Main target keyword & 10 supporting keywords',
    desc: 'The main search phrase and 10 related phrases you want to show up for.'
  },
  {
    label: 'NAP (business name, address, phone number)',
    desc: 'Your business name, address, and phone number—must match your Google profile.'
  },
  {
    label: 'GBP link',
    desc: 'A link to your Google Business Profile (Google My Business).'
  },
  {
    label: 'Short description of your company (110 characters)',
    desc: 'A quick summary of what your business does, for your listings.'
  },
  {
    label: 'E-mail Address of your business',
    desc: 'Your business email address for account creation and verification.'
  }
];

const process = [
  {
    step: 1,
    title: 'Citation Audit',
    description: 'Analyze existing citations and identify inconsistencies'
  },
  {
    step: 2,
    title: 'Citation Building',
    description: 'Create and optimize citations across relevant directories'
  },
  {
    step: 3,
    title: 'Monitoring & Maintenance',
    description: 'Ongoing monitoring and correction of citation issues'
  }
];

export default function LocalCitations() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
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
              <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Local Citations
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Supercharge your online presence with 100% manually built, high-DA local citations—designed to boost your rankings on Google Maps and organic search.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://buy.stripe.com/cNicN508MfpK498bOKdAk05"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Get Started Now
              <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
            </a>
            <button
              onClick={() => {
                window.open('/onboarding-preview?service=Local Citations', '_blank');
              }}
              className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Preview Onboarding Form
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
            Why Local Citations Matter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-4 sm:p-6 border border-slate-600">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
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
              <div key={index} className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
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

      {/* Key Message Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              These citations act as digital endorsements, signaling trust and legitimacy to search engines like Google and Bing. The more consistent and widespread your citations, the stronger your local ranking power.
            </p>
            <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-600/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">📈 More visibility. More traffic. More business.</h3>
              <p className="text-slate-300">Start building your local authority—the smart way.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Safety Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-700 rounded-lg p-6 sm:p-8 border border-slate-600">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">❓ Question: Is the High DA Local Citations Strategy safe?</h3>
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 bg-green-600/20 text-green-400 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-lg font-semibold border border-green-400/30">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Answer: Absolutely—100% safe, proven, and tested.
              </div>
            </div>
            <p className="text-slate-300 text-center mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
              All citations are manually created with care based on our extensive experience in Local SEO. We only use trusted, search engine-friendly directories known to positively impact local rankings.
            </p>
            <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-600/30">
              <h4 className="text-base sm:text-lg font-semibold text-blue-400 mb-2">✨ And for your peace of mind:</h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If your website or Google Business Profile (GBP) gets suspended due to our work, we offer a full refund. That's how confident we are in the safety and effectiveness of our strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
            What Do We Need From You?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {requirements.map((req, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-700">
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
            Ready to Build Your Local Authority?
          </h2>
          <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Join businesses that have improved their local rankings with our citation building strategy.
          </p>
          <a
            href="https://buy.stripe.com/cNicN508MfpK498bOKdAk05"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
          >
            Start Your Campaign
            <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
          </a>
        </div>
      </section>

      {/* Professional Disclaimer */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-700 rounded-lg p-6 sm:p-8 border border-slate-600">
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
  );
} 