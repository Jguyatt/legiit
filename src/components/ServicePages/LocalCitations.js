import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const features = [
  {
    label: '150x High DA Local Citations',
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

const requirements = [
  'Your/client website url',
  'Main target keyword & 10 supporting keywords',
  'NAP (business name, address, phone number)',
  'GBP link',
  'Short description of your company (110 characters)',
  'E-mail Address of your business'
];

export default function LocalCitations() {
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-primary-950 via-primary-900 to-black text-white">
      {/* Header Navigation */}
      <div className="w-full bg-[#10111a]/90 backdrop-blur-sm border-b border-[#3abef9]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-[#3abef9] hover:text-white font-semibold text-lg transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <div className="text-[#3abef9] font-bold text-xl">Rankly360</div>
          <button
            onClick={() => navigate('/packages')}
            className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Packages
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-electric-blue text-center drop-shadow-lg">Local Citations for Local SEO</h1>
          <p className="text-2xl text-gray-200 mb-10 text-center max-w-4xl mx-auto">Supercharge your online presence with 100% manually built, high-DA local citations—designed to boost your rankings on Google Maps and organic search.</p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-orange-400 text-center">What Will You Get?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col gap-1 bg-primary-800/70 rounded-xl p-4 border-l-4 border-electric-blue">
                <span className="font-semibold text-electric-blue text-lg">{feature.label}</span>
                <span className="text-gray-200 text-base">{feature.desc}</span>
              </div>
            ))}
          </div>
          <div className="bg-primary-800/50 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              These citations act as digital endorsements, signaling trust and legitimacy to search engines like Google and Bing. The more consistent and widespread your citations, the stronger your local ranking power.
            </p>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 border border-green-400/30">
              <h3 className="text-xl font-bold text-green-400 mb-2">📈 More visibility. More traffic. More business.</h3>
              <p className="text-gray-200">Start building your local authority—the smart way.</p>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-orange-400 text-center">Results</h2>
          <div className="flex flex-col items-center">
            <img src="/images/5.gif" alt="Results Example" className="rounded-xl shadow-lg max-w-xs md:max-w-sm mb-2 border-2 border-electric-blue" />
          </div>
        </div>
        
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">💼 Case Studies</h3>
            <a 
              href="https://www.bit.ly/CaseStudiesGmaps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              🔗 View Case Studies
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">❓ Question: Is the High DA Local Citations Strategy safe?</h3>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-lg font-semibold border border-green-400/30">
                <CheckCircle className="w-5 h-5" />
                Answer: Absolutely—100% safe, proven, and tested.
              </div>
            </div>
            <p className="text-gray-200 text-center mb-6">
              All citations are manually created with care based on our extensive experience in Local SEO. We only use trusted, search engine-friendly directories known to positively impact local rankings.
            </p>
            <div className="bg-primary-800/50 rounded-xl p-4 border border-blue-400/30">
              <h4 className="text-lg font-bold text-blue-400 mb-2">✨ And for your peace of mind:</h4>
              <p className="text-gray-200">
                If your website or Google Business Profile (GBP) gets suspended due to our work, we offer a full refund. That's how confident we are in the safety and effectiveness of our strategy.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-orange-400 text-center">What Do We Need From You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-primary-800/70 rounded-xl p-4 border-l-4 border-orange-400">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-electric-blue font-semibold text-lg">{r}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-6 mt-8">
          <a
            href="https://buy.stripe.com/cNicN508MfpK498bOKdAk05"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-electric-blue text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-block"
          >
            Get Started
          </a>
          <button
            onClick={() => navigate(-1)}
            className="text-electric-blue underline text-lg hover:text-orange-400 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Professional Disclaimer */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-600/30 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-300 mb-4 text-center">📋 Important Information & Disclaimers</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <strong>Results & Guarantees:</strong> While we are confident in our proven methodologies and have helped hundreds of businesses achieve significant ranking improvements, we cannot guarantee specific ranking positions or results. SEO success depends on various factors including market competition, website quality, and search engine algorithm changes. We commit to delivering our services with excellence and transparency.
              </p>
              <p>
                <strong>Service Delivery:</strong> We will work diligently to implement all promised features and strategies using our tested, white-hat techniques. Our team has extensive experience in local SEO and we stand behind the quality of our work. However, individual results may vary based on your specific market conditions and business factors.
              </p>
              <p>
                <strong>Client Responsibilities:</strong> To ensure optimal results, please ensure you have provided all required information accurately and have read through all service details. We're here to help guide you through the process, but your cooperation in providing necessary materials and information is essential for success.
              </p>
              <p>
                <strong>Our Commitment:</strong> We're committed to your success and will provide ongoing support throughout your service period. If you have any questions about our process or requirements, please don't hesitate to reach out before making your purchase decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 