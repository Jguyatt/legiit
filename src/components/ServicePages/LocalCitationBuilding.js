import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Globe, Shield, Target, ArrowLeft, Database } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const LocalCitationBuilding = () => {
  const features = [
    {
      icon: Database,
      title: 'NAP Consistency',
      description: 'Ensure your Name, Address, and Phone number are consistent across all online platforms.'
    },
    {
      icon: Globe,
      title: 'Industry-Specific Citations',
      description: 'Targeted citation building on platforms relevant to your specific industry and market.'
    },
    {
      icon: Shield,
      title: 'High DA Backlinks',
      description: 'Acquisition of high Domain Authority backlinks to strengthen your website authority.'
    },
    {
      icon: Target,
      title: 'Local Directory Submissions',
      description: 'Strategic submissions to local business directories and industry-specific platforms.'
    },
    {
      icon: CheckCircle,
      title: 'Citation Cleanup',
      description: 'Identification and correction of inconsistent or incorrect business information online.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Citation Audit',
      description: 'Comprehensive analysis of existing citations and identification of inconsistencies.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Custom citation building strategy tailored to your industry and local market.'
    },
    {
      step: '03',
      title: 'Citation Building',
      description: 'Systematic building of citations across high-quality, relevant platforms.'
    },
    {
      step: '04',
      title: 'Monitoring & Maintenance',
      description: 'Ongoing monitoring and maintenance of citations to ensure consistency and accuracy.'
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
                <TrendingUp className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Local Citation Building</h1>
            </div>
            <p className="text-xl text-gray-200 max-w-3xl">
              Strengthen your local search presence with comprehensive citation building and high-quality backlink acquisition.
            </p>
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
          <h2 className="text-3xl font-bold text-primary-900 mb-6">The Power of Local Citations</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Local citations are mentions of your business name, address, and phone number (NAP) across the web. 
            These citations are crucial ranking factors for local search, helping Google understand your business 
            location and authority in your local market.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our comprehensive citation building service ensures your business information is accurate, consistent, 
            and present on all the platforms that matter for local SEO success.
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
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-12">Our Citation Building Process</h2>
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
              <div className="text-4xl font-bold text-green-600 mb-2">50-100</div>
              <p className="text-gray-700">Quality citations per month</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-700">NAP consistency across platforms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">60-90</div>
              <p className="text-gray-700">Days to see ranking improvements</p>
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
              Ready to Build Your Local Authority?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join businesses that have strengthened their local search presence with our comprehensive citation building services.
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

export default LocalCitationBuilding; 