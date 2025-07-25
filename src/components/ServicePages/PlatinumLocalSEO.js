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
  '+SEO Recommendations'
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
              Platinum Local SEO Package
            </h1>
          </div>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            The ultimate local SEO solution for businesses serious about dominating their local market. 
            Comprehensive strategy combining all our premium services with dedicated support.
          </p>
          
          {/* Business Types Section */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
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
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 mb-8">
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
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Started Now
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
            <button
              onClick={() => {
                window.open('/onboarding-preview?service=Platinum Local SEO', '_blank');
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
            Why Choose Platinum Local SEO?
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Dominate Your Local Market?
          </h2>
          <p className="text-slate-400 mb-8">
            Join businesses that have achieved top rankings with our comprehensive local SEO strategy.
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