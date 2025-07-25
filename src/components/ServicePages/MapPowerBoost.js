import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Target, Navigation, Zap, Globe, TrendingUp } from 'lucide-react';

const features = [
  {
    label: '300 Local Places (Geotagged Google Map Points)',
    desc: 'We create 300 unique map points around your business location, each tagged with your info to boost your local presence.'
  },
  {
    label: '45 | 15 | 10 mile Radius Geotagged Map',
    desc: 'Your business is mapped out in circles of 45, 15, and 10 miles, helping you rank in a wide and targeted area.'
  },
  {
    label: '20 driving point directions',
    desc: 'We add 20 different driving routes to your map, making it look natural and helping Google see your business as active.'
  },
  {
    label: '10 Geotagged photos embedded inside Google MyMaps',
    desc: 'We embed 10 photos with your location data directly into your custom Google map.'
  },
  {
    label: 'NAP embedding on the Geotagged Map',
    desc: 'Your Name, Address, and Phone (NAP) are included on the map for trust and consistency.'
  },
  {
    label: 'Bonus 5-Mile Radius',
    desc: 'We add an extra 5-mile radius to your map for even more local reach.'
  },
  {
    label: 'Bonus Youtube Geotagged Video',
    desc: 'A YouTube video, tagged with your location, is added to your map for extra authority.'
  },
  {
    label: '10 Google Stacking Photos',
    desc: '10 more photos are stacked in Google for even more local signals.'
  },
  {
    label: 'Bonus 99 High DA Backlinks with Google Map CID',
    desc: 'We build 99 powerful backlinks to your map, boosting its authority safely.'
  },
  {
    label: 'Safe 30-Days Drip-fed Paid Links Indexing',
    desc: 'All links are added slowly over 30 days for maximum safety and natural growth.'
  },
  {
    label: 'SEO Recommendations + Secret Recipe',
    desc: 'You get expert tips and our proven strategies for even better results.'
  }
];

const deliverables = [
  {
    label: 'Geotagged Map (Google Indexable)',
    link: 'https://www.google.com/maps/d/u/0/viewer?mid=1xtSpEfEhlK0MfaQ4ofaWhBuxt5p5K1mi&ll=42.0424237471575%2C-87.67813797205928&z=10',
    desc: 'A live, custom Google Map showing all your optimized points.'
  },
  {
    label: 'Bonus Google Stacking Photos',
    link: 'https://photos.google.com/share/AF1QipOto-Ov33tT11GLeNtS9GaR_El1eZgQAJYxX7rz2wOEbiKad-3Puf6Ruw3ehbBHyQ/photo/AF1QipMj5Za9et7lKkZhF1M3sB54azQ9trqQprvEQUNM?key=cWVXMFdwM0lyQVNpUG1QTHFwZVlCTFhfX3BSQnFB',
    desc: 'A gallery of extra photos stacked for your business.'
  }
];

const requirements = [
  {
    label: 'Your/client website URL',
    desc: 'The main website you want to rank higher in Google Maps.'
  },
  {
    label: 'Main target keyword & 10 supporting keywords',
    desc: 'The main search phrase (like "plumber Toronto") and 10 related phrases you want to show up for.'
  },
  {
    label: 'NAP (business name, address, phone number)',
    desc: 'Your business name, address, and phone number—must match your Google profile.'
  },
  {
    label: 'GBP link (formerly known as GMB)',
    desc: 'A link to your Google Business Profile (Google My Business).' 
  },
  {
    label: 'Short description of your company (110 characters)',
    desc: 'A quick summary of what your business does, for your map listing.'
  }
];

export default function MapPowerBoost() {
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
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Map PowerBoost
            </h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Dominate Google Maps with our comprehensive geotagging strategy. 
            Create 300+ map points, build authority, and boost your local visibility.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Get Started Now
              <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
            </a>
            <button
              onClick={() => {
                window.open('/onboarding-preview?service=Map PowerBoost', '_blank');
              }}
              className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-sm sm:text-base"
            >
              Preview Onboarding Form
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What's Included
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What We Need From You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
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

      {/* Deliverables Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            What You'll Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start gap-3 mb-4">
                  <Navigation className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white">{deliverable.label}</h3>
                    <p className="text-slate-400 text-sm">{deliverable.desc}</p>
                  </div>
                </div>
                <a
                  href={deliverable.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                >
                  View Example
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Analysis & Setup</h3>
              <p className="text-slate-400 text-sm">We analyze your market and set up your geotagging strategy</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Implementation</h3>
              <p className="text-slate-400 text-sm">Create 300+ map points and build backlinks over 30 days</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Results & Support</h3>
              <p className="text-slate-400 text-sm">Monitor rankings and provide ongoing optimization support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Boost Your Google Maps Rankings?
          </h2>
          <p className="text-slate-400 mb-8">
            Join businesses that have achieved top rankings with our proven geotagging strategy.
          </p>
          <a
            href="https://buy.stripe.com/6oU3cvcVy5PaeNM7yudAk03"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
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