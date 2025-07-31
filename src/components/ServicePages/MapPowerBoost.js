import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Target, Navigation, Zap, Globe, TrendingUp } from 'lucide-react';

// Map PowerBoost payment link: https://buy.stripe.com/4gM9AT4p2cdycFE2eadAk08
// Updated payment link - force deployment

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
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Map PowerBoost
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Dominate Google Maps with our comprehensive geotagging strategy. Create 300+ map points, build authority, and boost your local visibility.
            </p>
            
            {/* CTA Buttons */}
            <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://buy.stripe.com/4gM9AT4p2cdycFE2eadAk08"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Get Started Now
                <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
              </a>
              <button
                onClick={() => {
                  window.open('/onboarding-preview?service=Map PowerBoost', '_blank');
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

        {/* Deliverables Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
              What You'll Receive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {deliverables.map((deliverable, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/20 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-semibold text-xs sm:text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{deliverable.label}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">{deliverable.desc}</p>
                      <a
                        href={deliverable.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs sm:text-sm transition-colors"
                      >
                        View Example
                        <ArrowLeft className="w-3 h-3 rotate-180" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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
              Ready to Dominate Google Maps?
            </h2>
            <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Join businesses that have achieved top rankings with our comprehensive map optimization strategy.
            </p>
            <a
              href="https://buy.stripe.com/4gM9AT4p2cdycFE2eadAk08"
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