import React from 'react';
import { motion } from 'framer-motion';
import { Link, Globe, TrendingUp, Shield, Target, ArrowLeft, Zap } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const MapEmbedStacking = () => {
  const features = [
    {
      icon: Globe,
      title: 'High DA Website Placement',
      description: 'Strategic placement on high Domain Authority websites to build powerful local search signals.'
    },
    {
      icon: Shield,
      title: 'White-Hat Methodology',
      description: 'All embedding follows Google\'s guidelines using legitimate, safe techniques that won\'t risk penalties.'
    },
    {
      icon: TrendingUp,
      title: 'Tiered Link Building',
      description: 'Multi-tier approach that creates natural, sustainable link building patterns for long-term success.'
    },
    {
      icon: Target,
      title: 'Geographic Targeting',
      description: 'Precise targeting of relevant local areas to maximize the impact of your map embeds.'
    },
    {
      icon: Zap,
      title: 'Rapid Authority Building',
      description: 'Accelerated authority building across multiple domains to boost your local search rankings quickly.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Authority Analysis',
      description: 'Comprehensive analysis of high-DA websites and their relevance to your local market.'
    },
    {
      step: '02',
      title: 'Strategic Placement',
      description: 'Careful placement of your Google Maps embed on selected high-authority websites.'
    },
    {
      step: '03',
      title: 'Signal Amplification',
      description: 'Implementation of tiered strategies to amplify local search signals and authority.'
    },
    {
      step: '04',
      title: 'Performance Monitoring',
      description: 'Continuous monitoring and optimization of embed performance and ranking impact.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RouterLink to="/#packages" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </RouterLink>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Link className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Strategic Map Embed Stacking</h1>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl mb-6">
              Dominate local search with our advanced map embed stacking strategy that builds powerful authority signals across high-DA websites.
            </p>
            
            {/* Video Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const videoUrl = '/iframe.mp4';
                  const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                  newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Map Embed Stacking Video</title>
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
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-white hover:text-primary-900 hover:shadow-[0_0_32px_0_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Overview Video
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-900 mb-6">What is Map Embed Stacking?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Map Embed Stacking is an advanced local SEO technique that strategically places your Google Maps embed 
            across high-authority websites to build powerful local search signals. This method creates a network 
            of authoritative references to your business location, significantly boosting your local search rankings.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Unlike traditional link building, map embeds provide direct location signals to Google, making them 
            one of the most effective strategies for local SEO domination.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">Our Map Embed Strategy</h2>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-6"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-8">Expected Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200-400%</div>
              <p className="text-gray-700">Increase in local ranking signals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15-30</div>
              <p className="text-gray-700">High-DA websites with your map embed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">45-90</div>
              <p className="text-gray-700">Days to see significant ranking improvements</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Dominate Local Search?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join businesses that have achieved top 3 Google Maps rankings with our proven map embed stacking strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>

        {/* Professional Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 mb-8"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default MapEmbedStacking; 