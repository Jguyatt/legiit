import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MessageCircle, 
  Clock, 
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';

const Help = () => {

  const contactOptions = [
    {
      id: 'account-manager',
      title: 'Contact Your Dedicated Account Manager',
      description: 'Your personal account manager is here to help with anything you need',
      icon: User,
      color: 'from-blue-500 to-purple-600',
      details: {
        email: 'guyattj39@gmail.com',
        availability: 'Monday - Friday, 9:00 AM - 5:00 PM EST',
        responseTime: 'Your account manager will respond within 24 hours',
        features: [
          'Personalized account support',
          'Regular project updates',
          'Strategy consultations',
          'Priority assistance'
        ]
      }
    },
    {
      id: 'ai-chat',
      title: 'Chat with AI Assistant',
      description: 'Get quick answers anytime, day or night',
      icon: MessageCircle,
      color: 'from-green-500 to-teal-600',
      details: {
        availability: '24/7 - Always available',
        responseTime: 'Instant answers',
        features: [
          'Quick answers to common questions',
          'Help with technical issues',
          'Account and billing info',
          'Service explanations'
        ]
      }
    }
  ];

  const faqItems = [
    {
      question: 'When will I start seeing results?',
      answer: 'Most clients see some improvement in 30-45 days, with bigger changes usually happening around 60-90 days. Your account manager will keep you updated on your specific progress.'
    },
    {
      question: 'What do you need from me to get started?',
      answer: 'Your account manager will need your basic business info, target keywords, service areas, and website details. They\'ll walk you through the entire onboarding process.'
    },
    {
      question: 'Can I switch to a different package?',
      answer: 'Absolutely. You can upgrade or change your package anytime. Just contact your account manager and they\'ll help you find the right solution for your business.'
    },
    {
      question: 'How do I know if it\'s working?',
      answer: 'You can check your dashboard anytime to see your rankings, traffic, and project progress. Your account manager will also provide regular updates and reports.'
    },
    {
      question: 'What if I\'m not happy with the results?',
      answer: 'Your account manager is committed to your success. If things aren\'t going as expected, they\'ll work with you to adjust strategies and optimize your campaign.'
    }
  ];

  const handleEmailClick = () => {
    window.open(`mailto:guyattj39@gmail.com?subject=Rankly360 Support Request`, '_blank');
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-[#3abef9] to-[#6366f1] rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Need Help?
            </h1>
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Got questions about your local SEO campaign? Your dedicated account manager is here to help.
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#3abef9]/20 hover:border-[#3abef9]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                    <p className="text-gray-400">{option.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {option.id === 'account-manager' && (
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Business Hours:</span>
                      <span>{option.details.availability}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Response Time:</span>
                    <span>{option.details.responseTime}</span>
                  </div>

                                     <div className="mt-6">
                     <h4 className="font-semibold text-white mb-3">What your account manager can help with:</h4>
                     <ul className="space-y-2">
                       {option.details.features.map((feature, idx) => (
                         <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                           <div className="w-1.5 h-1.5 bg-[#3abef9] rounded-full"></div>
                           {feature}
                         </li>
                       ))}
                     </ul>
                   </div>

                  {option.id === 'account-manager' && (
                                         <button
                       onClick={handleEmailClick}
                       className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                     >
                       <Mail className="w-4 h-4" />
                       Email Your Account Manager
                     </button>
                  )}

                                     {option.id === 'ai-chat' && (
                     <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                       <div className="flex items-center gap-2 text-green-400 mb-2">
                         <MessageCircle className="w-4 h-4" />
                         <span className="font-medium">Available Now</span>
                       </div>
                       <p className="text-sm text-gray-300">
                         Chat with our AI assistant anytime - it's in the bottom right corner of your screen.
                       </p>
                     </div>
                   )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

                 {/* Business Hours Notice */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-12"
         >
           <div className="flex items-start gap-4">
             <Clock className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
             <div>
               <h3 className="text-lg font-semibold text-white mb-2">Your Account Manager's Hours</h3>
               <p className="text-gray-300 mb-3">
                 Your dedicated account manager is available <strong>Monday through Friday, 9:00 AM to 5:00 PM EST</strong>. 
                 For urgent matters outside business hours, the AI chat is always available.
               </p>
               <div className="flex items-center gap-4 text-sm text-gray-400">
                 <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4" />
                   <span>Mon-Fri</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4" />
                   <span>9:00 AM - 5:00 PM EST</span>
                 </div>
               </div>
             </div>
           </div>
         </motion.div>

                 {/* FAQ Section */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#3abef9]/20"
         >
           <h2 className="text-2xl font-bold text-white mb-8 text-center">Common Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3abef9]/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

                 {/* Additional Support Info */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.6 }}
           className="mt-12 text-center"
         >
           <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#3abef9]/20">
             <h3 className="text-xl font-bold text-white mb-4">Something Urgent?</h3>
             <p className="text-gray-300 mb-6">
               The AI chat is always there if you need help right away.
             </p>
             <div className="flex items-center justify-center gap-2 text-green-400">
               <MessageCircle className="w-5 h-5" />
               <span className="font-medium">Chat is ready when you are</span>
             </div>
           </div>
         </motion.div>
      </div>
    </div>
  );
};

export default Help; 