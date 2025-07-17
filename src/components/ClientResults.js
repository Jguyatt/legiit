import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Emily Carter",
    business: "Boutique Owner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Rankly360 helped my shop show up higher in Google search and on Maps within just a few months. Their team handled everything and I’ve seen a big increase in calls and website visits. Highly recommend!"
  },
  {
    name: "Marcus Lee",
    business: "Basketball Trainer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Rankly360 took my basketball training business to the next level. I started getting way more client inquiries through my website. Super professional and easy to work with."
  },
  {
    name: "Sofia Martinez",
    business: "Dental Clinic Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "We went from barely being found to dominating our local market. Our patient bookings are up and our Google profile looks amazing."
  },
  {
    name: "James O'Connor",
    business: "Auto Repair Shop Owner",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    quote: "I was skeptical at first, but the results speak for themselves. We're now the first auto shop people see when they search locally. Business has never been better."
  },
  {
    name: "Priya Desai",
    business: "Yoga Studio Director",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "The Rankly360 team made everything easy. We’re getting more calls and new students every week. I love how transparent and responsive they are."
  }
];

const CARD_WIDTH = 340; // px, including margin
const ANIMATION_DURATION = 20; // seconds for one full loop (was 8)

const ClientResults = () => {
  const controls = useAnimation();
  const stripRef = useRef(null);

  // Duplicate testimonials for seamless looping
  const loopTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    controls.start({
      x: -CARD_WIDTH * testimonials.length,
      transition: {
        duration: ANIMATION_DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
    // No cleanup needed, Framer Motion handles repeat
  }, [controls]);

  return (
    <section id="client-results" className="relative py-20 bg-gradient-to-b from-[#0f0f1a] to-[#09090f] overflow-hidden">
      {/* Top gradient fade for smooth transition from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-t from-transparent to-[#0f0f1a] pointer-events-none z-20" />
      {/* Space background effects */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-28 left-1/5 w-1 h-1 bg-[#3abef9]/40 rounded-full blur-[1px]" />
        <div className="absolute top-52 right-1/5 w-0.5 h-0.5 bg-white/30 rounded-full blur-[0.8px]" />
        <div className="absolute bottom-28 left-1/4 w-1.5 h-1.5 bg-[#00ffff]/50 rounded-full blur-[1.2px]" />
        <div className="absolute bottom-52 right-1/3 w-0.8 h-0.8 bg-[#3abef9]/35 rounded-full blur-[1px]" />
        {/* Extra stars */}
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full blur-[1px]" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#00ffff]/30 rounded-full blur-[1.2px]" />
      </div>
      {/* Before & After Comparison */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Before & After: Real Local SEO Results</h2>
        <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto">
          Visual proof: Real Google Map Pack rankings before and after our local SEO campaigns.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="flex-1 text-center">
            <div className="mb-2 font-semibold text-gray-300">Before</div>
            <img
              src="/images/eBHbpbY.gif"
              alt="Local SEO Map Rankings Before"
              className="rounded-2xl shadow-lg border border-[#3ABEF9]/20 w-full max-w-md mx-auto"
              style={{objectFit: 'contain'}}
            />
          </div>
          <div className="flex-1 text-center">
            <div className="mb-2 font-semibold text-gray-300">After</div>
            <img
              src="/images/XMgbFwE.gif"
              alt="Local SEO Map Rankings After"
              className="rounded-2xl shadow-lg border border-[#a3e635]/20 w-full max-w-md mx-auto"
              style={{objectFit: 'contain'}}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proven Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real clients, real rankings, real business growth
          </p>
        </motion.div>

        {/* Perpetual Strip Carousel */}
        <div className="overflow-hidden w-full max-w-5xl mx-auto">
          <motion.div
            ref={stripRef}
            animate={controls}
            className="flex"
            style={{ width: `${CARD_WIDTH * loopTestimonials.length}px` }}
          >
            {loopTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-8 md:p-12 m-4 flex-shrink-0 shadow-lg relative border border-[#3ABEF9]/20"
                style={{ width: CARD_WIDTH - 32 }}
              >
                <div className="absolute top-8 right-8">
                  <Quote className="w-12 h-12 text-[#3ABEF9]/20" />
                </div>
                <div className="flex flex-col items-center text-center gap-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#3ABEF9]/30"
                  />
                  <h3 className="font-bold text-white text-lg">{t.name}</h3>
                  <p className="text-gray-300 mb-2">{t.business}</p>
                  <blockquote className="text-xl text-gray-200 leading-relaxed italic">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-1 justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#a3e635] fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#3ABEF9] mb-2">500+</div>
              <div className="text-gray-300">Local Rankings Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#a3e635] mb-2">150+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#00FFFF] mb-2">30</div>
              <div className="text-gray-300">Day Average to Results</div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#0f0f1a] pointer-events-none z-20" />
    </section>
  );
};

export default ClientResults; 