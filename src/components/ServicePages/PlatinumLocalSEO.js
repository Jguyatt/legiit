import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, ArrowLeft, Target, Users, Shield, Award, Crown, TrendingUp } from 'lucide-react';

const features = [
  '+195 Miles Radius Google Map Pack Upgrade',
  '+100 Local Places (Map Citations)',
  '+1000 iFrame Stacking Map Embeds',
  '+5 Geotagged photos',
  '+5 Google Stacking Photos (Bonus)',
  '+5 driving point directions',
  '+200 Bonus backlinks with Google Map CID hyperlinked anchor text',
  '+Safe Dripfed Links Indexing',
  '+SEO Recommendations',
  '+Secret Recipe'
];

const benefits = [
  {
    icon: Target,
    title: 'Maximum Local Visibility',
    description: 'Dominate Google Maps with comprehensive local SEO strategies'
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: 'Data-driven approach with measurable ranking improvements'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal account manager for ongoing guidance and support'
  },
  {
    icon: Shield,
    title: 'White-Hat Methods',
    description: 'Safe, sustainable SEO techniques that build lasting authority'
  }
];

export default function PlatinumLocalSEO() {
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
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Platinum Local SEO Package
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate local SEO solution for businesses serious about dominating their local market. 
              Comprehensive strategy combining all our premium services with dedicated support.
            </p>
            
            {/* Business Types Section */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-8 border border-slate-700/50 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Works on ANY Local Business You Can Think of…
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                <span className="text-slate-300">Auto Mechanic</span>
                <span className="text-slate-300">Windshield Repair</span>
                <span className="text-slate-300">Kitchen Remodeling</span>
                <span className="text-slate-300">Plumbers</span>
                <span className="text-slate-300">Roofers</span>
                <span className="text-slate-300">Cleaning Company</span>
                <span className="text-slate-300">Moving Company</span>
                <span className="text-slate-300">Landscaping</span>
                <span className="text-slate-300">Lawyer</span>
                <span className="text-slate-300">Dentist</span>
                <span className="text-slate-300">Electrician</span>
                <span className="text-slate-300">Pest Control</span>
                <span className="text-slate-300">HVAC</span>
                <span className="text-slate-300">Construction</span>
                <span className="text-slate-300">Carpet Cleaning</span>
                <span className="text-slate-300">Appliance Store</span>
                <span className="text-slate-300">Water Damage</span>
                <span className="text-slate-300">Brokers</span>
                <span className="text-slate-300">Computer Repair</span>
                <span className="text-slate-300">Building Inspector</span>
                <span className="text-slate-300">Bail Bonds</span>
                <span className="text-slate-300">Tutoring</span>
                <span className="text-slate-300">Tax Services</span>
                <span className="text-slate-300">Tree Service</span>
                <span className="text-slate-300">Web Design</span>
                <span className="text-slate-300">SEO</span>
                <span className="text-slate-300">VoIP Services</span>
                <span className="text-slate-300">Insurances</span>
                <span className="text-slate-300">Security Systems</span>
                <span className="text-slate-300">Hair Removal</span>
                <span className="text-slate-300">Salons</span>
                <span className="text-slate-300">Locksmith</span>
                <span className="text-slate-300">Restorators</span>
                <span className="text-slate-300">Painters</span>
                <span className="text-slate-300">Garage Doors</span>
                <span className="text-slate-300">Roofing</span>
                <span className="text-slate-300">Chiropractors</span>
                <span className="text-slate-300">etc.</span>
              </div>
            </div>
            
            {/* Opportunity Message */}
            <div className="bg-blue-600/20 rounded-lg p-6 border border-blue-600/30 mb-8">
              <p className="text-lg text-blue-400 font-semibold text-center mb-2">
                "The opportunity to help local businesses to rank on Google Maps is wide open for YOU to profit."
              </p>
              <p className="text-slate-300 text-center">
                Remember guys that Local Businesses are the LIFEBLOOD of the economy.
              </p>
            </div>
            
            {/* Marketer Message */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 shadow-lg mb-8">
              <p className="text-slate-300 text-center">
                If you're a local marketer, consultant, or agency owner, you know one thing. 
                <span className="text-white font-semibold"> Ranking on Google are everything!</span>
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                Get Started Now
                <ArrowLeft className="w-4 h-4 rotate-180 flex-shrink-0" />
              </a>
              <button
                onClick={() => {
                  window.open('/onboarding-preview?service=Platinum Local SEO', '_blank');
                }}
                className="inline-flex items-center justify-center gap-2 bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600/80 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 text-sm sm:text-base border border-slate-600/50"
              >
                Preview Onboarding Form
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
              Why Choose Platinum Local SEO?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ready to Dominate Your Local Market?
            </h2>
            <p className="text-slate-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Join businesses that have achieved top rankings with our comprehensive local SEO strategy.
            </p>
            <a
              href="https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06"
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