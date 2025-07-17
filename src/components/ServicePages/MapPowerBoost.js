import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white">
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

      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-electric-blue drop-shadow-lg tracking-tight">Map PowerBoost</h1>
          <p className="text-2xl text-gray-200 mb-6 max-w-4xl mx-auto leading-relaxed">Supercharge your local rankings with our Google Map PowerBoost package. Designed for businesses who want to dominate the Map Pack and drive real, local leads.</p>
          
          {/* Video Button */}
          <div className="flex justify-center mb-10">
            <button
              onClick={() => {
                const videoUrl = '/powerboost.mp4';
                const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                newWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>Map PowerBoost Video</title>
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

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold mb-8 text-orange-400 flex items-center gap-2 justify-center"><span>What You Get</span> <span className="text-2xl">🚀</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-[#181c2a] rounded-2xl p-6 border-l-4 border-[#3abef9] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="font-semibold text-electric-blue text-lg mb-1 flex items-center gap-2"><span>•</span> {f.label}</div>
                <div className="text-gray-300 text-base leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold mb-8 text-orange-400 text-center tracking-tight">Before & After Results</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="bg-[#181c2a] rounded-2xl p-4 shadow-lg border-2 border-[#3abef9] flex flex-col items-center">
              <img src="/images/Before 1.gif" alt="Before Example 1" className="rounded-xl max-w-xs md:max-w-sm mb-2" />
            </div>
            <div className="bg-[#181c2a] rounded-2xl p-4 shadow-lg border-2 border-orange-400 flex flex-col items-center">
              <img src="/images/before 2.gif" alt="Before Example 2" className="rounded-xl max-w-xs md:max-w-sm mb-2" />
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold mb-8 text-orange-400 flex items-center gap-2 justify-center"><span>Sample Deliverables</span> <span className="text-lg">📦</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {deliverables.map((d, i) => (
              <div key={i} className="bg-[#181c2a] rounded-2xl p-6 border-l-4 border-orange-400 shadow-md">
                <a href={d.link} target="_blank" rel="noopener noreferrer" className="underline text-electric-blue hover:text-orange-400 font-semibold text-lg mb-2 block">{d.label}</a>
                <div className="text-gray-300 text-base leading-relaxed">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold mb-8 text-orange-400 flex items-center gap-2 justify-center"><span>What We Need From You</span> <span className="text-lg">📝</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((r, i) => (
              <div key={i} className="bg-[#181c2a] rounded-2xl p-6 border-l-4 border-orange-400 shadow-md">
                <div className="text-electric-blue font-semibold text-lg mb-1 flex items-center gap-2"><span>•</span> {r.label}</div>
                <div className="text-gray-300 text-base leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="text-xl text-center text-gray-200 mb-2">Ready to dominate Google Maps? Get started today!</div>
          <a
            href="https://buy.stripe.com/6oU3cvcVy5PaeNM7yudAk03"
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