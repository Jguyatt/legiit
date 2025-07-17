import React from 'react';
import { CheckCircle, ExternalLink, Shield } from 'lucide-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const CloudStackBoost = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      label: '800x iFrame Stacking Map Embeds (with Youtube Geotagged Video Embeds)',
      desc: 'We strategically place 800 Google Maps embeds on high-authority websites, each containing your business location and YouTube geotagged videos. This creates powerful local signals that tell Google your business is important enough to be featured on trusted sites.'
    },
    {
      label: 'Exclusive Links from Web 2.0s with DA 20 & 30+ (MOZ Domain Authority)',
      desc: 'We build links from high Domain Authority Web 2.0 platforms (DA 20-30+), which are trusted by search engines. These platforms include sites like WordPress.com, Blogger, Medium, and other authoritative content platforms that pass strong ranking signals.'
    },
    {
      label: 'Local SEO strategy that works like a charm',
      desc: 'Our proven local SEO strategy combines multiple ranking factors including map embeds, geotagged content, and high-authority backlinks. This comprehensive approach ensures maximum visibility in local search results and Google Maps.'
    },
    {
      label: 'Search Engine Friendly Backlinks',
      desc: 'All backlinks are created using white-hat techniques that follow Google\'s guidelines. We use natural anchor text, diverse IP addresses, and tiered linking strategies to ensure maximum safety and effectiveness.'
    },
    {
      label: 'Full Backlink report (Google Sheet)',
      desc: 'You receive a comprehensive Google Sheets report with all your backlinks, including URLs, anchor text, Domain Authority scores, and indexing status. This transparency allows you to track progress and verify results.'
    },
    {
      label: 'High DA Do-Follow Backlinks with proven ranking boost',
      desc: 'We focus on building do-follow links from high Domain Authority websites, which pass the strongest ranking signals to your business. These links have been proven to significantly boost local search rankings.'
    },
    {
      label: '30 Days Drip Feed SSF (Slow Safe Stacking)',
      desc: 'All links are added gradually over 30 days using our Slow Safe Stacking (SSF) method. This natural approach prevents any red flags and ensures maximum indexing rates while maintaining safety.'
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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-electric-blue text-center drop-shadow-lg">Google Maps iFrame Cloud Stack Boost 🚀</h1>
          <p className="text-2xl text-gray-200 mb-6 text-center max-w-4xl mx-auto">Boost your Google Business Profile rankings with our powerful cloud stack + map embed strategy. Safe, proven, and effective for local visibility.</p>
          
          {/* Video Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={() => {
                const videoUrl = '/iframe.mp4';
                const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                newWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>Google Maps iFrame Cloud Stack Boost Video</title>
                    <style>
                      body { 
                        margin: 0; 
                        padding: 20px; 
                        background: #0f0f1a; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh;
                        font-family: 'Inter', 'Poppins', system-ui, sans-serif;
                      }
                      .video-container {
                        max-width: 100%;
                        max-height: 100vh;
                        box-shadow: 0 0 40px rgba(58, 190, 249, 0.3);
                        border-radius: 12px;
                        overflow: hidden;
                      }
                      video {
                        width: 100%;
                        height: auto;
                        transform: scale(1.2);
                        transform-origin: center;
                        object-fit: cover;
                      }
                      .close-btn {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(58, 190, 249, 0.9);
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                      }
                      .close-btn:hover {
                        background: rgba(58, 190, 249, 1);
                        transform: scale(1.05);
                      }
                    </style>
                  </head>
                  <body>
                    <button class="close-btn" onclick="window.close()">✕ Close</button>
                    <div class="video-container">
                      <video controls autoplay>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </body>
                  </html>
                `);
                newWindow.document.close();
              }}
              className="bg-transparent border-2 border-[#3abef9] text-[#3abef9] px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-[#3abef9] hover:text-white hover:shadow-[0_0_32px_0_rgba(58,190,249,0.3)] transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Overview Video
            </button>
          </div>
        </div>
        
        {/* What Will You Get Section */}
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
            <h3 className="text-xl font-bold text-orange-400 mb-4">🔗 Indexing & Verification Tools</h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">
              We are using <a href="http://www.indexification.com/" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline hover:text-orange-400">http://www.indexification.com/</a> to dripfed and index the links. To check if a link is indexed, you can use this bulk-checking index tool: <a href="https://indexchecking.com/" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline hover:text-orange-400">https://indexchecking.com/</a>
            </p>
            <p className="text-gray-200 text-base">
              <strong>Instructions:</strong> See the screenshot for instruction on how to use it: <a href="https://snipboard.io/52azpW.jpg" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline hover:text-orange-400">https://snipboard.io/52azpW.jpg</a>
            </p>
          </div>
        </div>

        {/* Safety Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-400/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">❓ Question: Is iFrame Stacking Map Embeds Strategy safe?</h3>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-lg font-semibold border border-green-400/30">
                <Shield className="w-5 h-5" />
                Answer: YES 100% safe proven & tested
              </div>
            </div>
            <p className="text-gray-200 text-center mb-6">
              They are carefully done using unique IP's and anchor texts are linked only to tier 2 & tier 3 links like the geotagged map, GBP page and youtube geotagged video only and NOT on the money site.
            </p>
            <div className="bg-primary-800/50 rounded-xl p-4 border border-blue-400/30">
              <h4 className="text-lg font-bold text-blue-400 mb-2">🤜🤛 And for your peace of mind:</h4>
              <p className="text-gray-200">
                We will refund your money if your site or GBP was suspended because of it.
              </p>
            </div>
          </div>
        </div>

        {/* After Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-orange-400 text-center">After Results</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <img src="/images/before 3.png" alt="After Example 1" className="rounded-xl shadow-lg max-w-xs md:max-w-sm mb-2 border-2 border-electric-blue" />
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/before 4.png" alt="After Example 2" className="rounded-xl shadow-lg max-w-xs md:max-w-sm mb-2 border-2 border-orange-400" />
            </div>
          </div>
        </div>

        {/* Sample Report Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">📊 Sample Report</h3>
            <a 
              href="https://docs.google.com/spreadsheets/d/1sQts3pvVb2PXoaIfBNWpkae99Z_BT9OA/edit#gid=117013576" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              🔗 View Sample Report
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Requirements Section */}
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

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <a
            href="https://buy.stripe.com/3cIeVdf3G2CY9ts7yudAk04"
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
      </div>
    </section>
  );
};

export default CloudStackBoost; 