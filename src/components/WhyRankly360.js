import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Phone, Star, TrendingUp, MessageCircle } from 'lucide-react';

const WhyRankly360 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No BS Approach",
      description: "We don't promise overnight results or guarantee #1 rankings. SEO takes time, and we're upfront about that. What we do promise is honest work and clear communication.",
      color: "from-[#3abef9] to-[#1e40af]",
      bgColor: "from-[#3abef9]/10 to-[#1e40af]/5"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real Results, Real Stories",
      description: "We've helped local businesses go from getting 2-3 calls a month to 20-30 calls. But we also have clients who saw slower growth. Every business is different.",
      color: "from-[#a3e635] to-[#3abef9]",
      bgColor: "from-[#a3e635]/10 to-[#3abef9]/5"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "You Can Actually Talk to Us",
      description: "No call centers, no ticket systems, no automated responses. You get our direct phone numbers and email addresses. We answer our own phones.",
      color: "from-[#f59e0b] to-[#3abef9]",
      bgColor: "from-[#f59e0b]/10 to-[#3abef9]/5"
    }
  ];

  const testimonials = [
    {
      name: "Mike Chen",
      business: "Auto Repair Shop",
      rating: 5,
      text: "Finally found an SEO company that actually answers the phone. My calls went from like 2-3 a month to around 8-12. Takes time but it's working.",
      avatar: "🔧"
    },
    {
      name: "Sarah Martinez",
      business: "Dental Practice",
      rating: 5,
      text: "They don't use all that technical jargon. When something doesn't work, they tell you and try something else. Refreshing honestly.",
      avatar: "🦷"
    },
    {
      name: "David Thompson",
      business: "Plumber",
      rating: 5,
      text: "Wasn't sure about SEO but they showed me what they do. Now my site shows up when people search for plumbers around here.",
      avatar: "🔧"
    }
  ];

  return (
    <section id="why-us" className="relative py-24 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#3abef9]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-[#a3e635]/10 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#f59e0b]/10 to-transparent rounded-full blur-xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3abef9]/20 to-[#1e40af]/20 rounded-full border border-[#3abef9]/30 mb-6">
            <Star className="w-4 h-4 text-[#3abef9]" />
            <span className="text-[#3abef9] text-sm font-medium">Trusted by 200+ Local Businesses</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Why Local Businesses
            <span className="block bg-gradient-to-r from-[#3abef9] to-[#1e40af] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not a big agency with fancy offices. We're a small team that actually cares about your business getting found online.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105`}>
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h3>
            <p className="text-gray-300 text-lg">Real results from real local businesses</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-300 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#3abef9] to-[#1e40af] rounded-full flex items-center justify-center text-2xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.business}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-[#181c2a]/80 to-[#0f0f1a]/80 backdrop-blur-xl border border-[#3abef9]/30 rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3abef9]/10 via-[#1e40af]/5 to-[#3abef9]/10 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3abef9]/20 to-[#1e40af]/20 rounded-full border border-[#3abef9]/30 mb-6">
                <MessageCircle className="w-4 h-4 text-[#3abef9]" />
                <span className="text-[#3abef9] text-sm font-medium">Ready to get started?</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Transform Your Local Business Today
              </h3>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of local businesses that have already improved their online visibility and increased their customer base.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/packages"
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#3abef9] to-[#1e40af] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <span className="relative z-10">See Our Packages</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#3abef9] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <a
                  href="/help"
                  className="px-8 py-4 border-2 border-[#3abef9] text-[#3abef9] font-semibold rounded-xl hover:bg-[#3abef9] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRankly360; 