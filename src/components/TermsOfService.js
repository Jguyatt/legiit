import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CreditCard, Shield } from 'lucide-react';

const TermsOfService = () => {
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
              <FileText className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Terms of Service
              </h1>
            </div>
            
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Please read these terms carefully before using our services.
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
                These Terms of Service ("Terms") govern your use of Rankly360's website and services. By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-[#3ABEF9]" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-600">
                By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-600 mb-4">
                Rankly360 provides local SEO services, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Google Maps optimization and ranking services</li>
                <li>Local citation building and management</li>
                <li>Google Business Profile optimization</li>
                <li>Map embed stacking and authority building</li>
                <li>Local SEO consulting and strategy</li>
                <li>Performance reporting and analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#3ABEF9]" />
                Payment Terms
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing and Payment</h3>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>All prices are listed in USD unless otherwise specified</li>
                    <li>Payment is due at the time of service purchase</li>
                    <li>We use Stripe for secure payment processing</li>
                    <li>All payments are non-refundable unless otherwise stated</li>
                    <li>Prices may be subject to change with notice</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Refund Policy</h3>
                  <p className="text-gray-600">
                    Due to the nature of our services, refunds are not typically provided. However, we may consider refunds on a case-by-case basis for extenuating circumstances. Contact us to discuss any concerns.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Delivery and Timeline</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Timeline</h3>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Services typically begin within 24-48 hours of payment confirmation</li>
                    <li>Initial results may be visible within 30-60 days</li>
                    <li>Full optimization may take 90-120 days depending on the package</li>
                    <li>Timelines may vary based on market competition and other factors</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Client Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                    <li>Provide accurate business information and requirements</li>
                    <li>Respond to requests for additional information promptly</li>
                    <li>Maintain your Google Business Profile and website</li>
                    <li>Follow our recommendations for best results</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Rights</h3>
                  <p className="text-gray-600">
                    All content, trademarks, logos, and intellectual property on our website and in our services are owned by Rankly360 or our licensors. You may not use, reproduce, or distribute this content without our written permission.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Rights</h3>
                  <p className="text-gray-600">
                    You retain ownership of your business information and content. We have the right to use your business information solely for the purpose of providing our services.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">
                You agree not to use our services for any unlawful or prohibited purpose, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting harmful, offensive, or inappropriate content</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper functioning of our services</li>
                <li>Using our services for spam or other malicious activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-[#3ABEF9]" />
                Disclaimers and Limitations
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Results</h3>
                  <p className="text-gray-600">
                    While we strive to deliver excellent results, we cannot guarantee specific ranking positions or outcomes. SEO results depend on various factors beyond our control, including algorithm changes, competition, and market conditions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Warranty</h3>
                  <p className="text-gray-600">
                    Our services are provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-600">
                    In no event shall Rankly360 be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify and hold harmless Rankly360, its officers, directors, employees, and agents from and against any claims, damages, losses, and expenses arising out of or relating to your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your access to our services at any time, with or without cause, with or without notice. Upon termination, your right to use our services will cease immediately.
              </p>
              <p className="text-gray-600">
                You may terminate your relationship with us at any time by discontinuing use of our services. However, no refunds will be provided for services already rendered.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Ontario, Canada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
              <p className="text-gray-600">
                These Terms constitute the entire agreement between you and Rankly360 regarding the use of our services and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-2">
                  <strong>Email:</strong> legal@rankly360.com
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

export default TermsOfService; 