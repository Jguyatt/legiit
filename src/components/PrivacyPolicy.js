import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye, Users, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3ABEF9] to-[#007BFF] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
            
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Privacy Policy
              </h1>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-gray-600">
                Rankly360 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-[#3ABEF9]" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <p className="text-gray-600">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Business information and details</li>
                    <li>Payment information (processed securely through Stripe)</li>
                    <li>Communication preferences</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-600">
                    When you visit our website, we automatically collect certain information, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website information</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-[#3ABEF9]" />
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Providing and improving our services</li>
                <li>Processing payments and transactions</li>
                <li>Communicating with you about our services</li>
                <li>Sending marketing materials (with your consent)</li>
                <li>Analyzing website usage and trends</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-[#3ABEF9]" />
                Information Sharing and Disclosure
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-[#3ABEF9]" />
                Data Security
              </h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing through Stripe</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. These technologies help us:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 mb-4">
                Our website may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
              </p>
              <p className="text-gray-600">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 mt-2 space-y-1">
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>Meta Pixel:</strong> For advertising and conversion tracking</li>
                <li><strong>OpenAI:</strong> For AI-powered chat functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Complaints:</strong> Lodge a complaint with relevant authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2">
                  <strong>Email:</strong> privacy@rankly360.com
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Phone:</strong> +1-647-323-6969
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> Toronto, Ontario, Canada
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 