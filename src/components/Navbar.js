import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Home', to: 'hero' },
  { name: 'Why Us?', to: 'why-us' },
  { name: 'FAQ', to: 'faq' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to handle nav click from any page
  const handleNavClick = (section) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Wait for navigation, then scroll
      window.localStorage.setItem('scrollToSection', section);
    } else {
      scroll.scrollToTop(); // fallback for Home
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    setIsOpen(false);
  };

  // Listen for scrollToSection after navigation
  useEffect(() => {
    const section = window.localStorage.getItem('scrollToSection');
    if (location.pathname === '/' && section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.localStorage.removeItem('scrollToSection');
      }, 200);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 font-sans ${
      scrolled 
        ? 'bg-[#0f0f0f]/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scroll.scrollToTop()}
          >
            <img 
              src="/images/logo.png" 
              alt="Rankly360 Logo" 
              className="h-10 w-auto"
            />
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-white'
            }`}>
              Rankly360
            </span>
          </motion.div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <span
                key={item.name}
                onClick={() => handleNavClick(item.to)}
                className={`relative px-3 py-2 font-medium cursor-pointer transition-all duration-300 tracking-wide group ${
                  scrolled 
                    ? 'text-gray-300 hover:text-[#3ABEF9]' 
                    : 'text-white hover:text-[#3ABEF9]'
                }`}
                style={{ userSelect: 'none' }}
              >
                <span>{item.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#3ABEF9] transition-all duration-300 group-hover:w-full"></span>
              </span>
            ))}
          </div>

          {/* CTA Button - Right Side */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/packages')}
              className="bg-gradient-to-r from-[#3ABEF9] to-[#007BFF] hover:from-[#007BFF] hover:to-[#0052CC] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] focus:ring-offset-2 border-2 border-[#3ABEF9]/30 hover:border-[#3ABEF9]/50"
              style={{
                boxShadow: '0 4px 20px rgba(58, 190, 249, 0.3), 0 0 0 1px rgba(58, 190, 249, 0.1)',
              }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-300 focus:outline-none ${
                scrolled ? 'text-gray-300 hover:text-[#3ABEF9]' : 'text-white hover:text-[#3ABEF9]'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-sm shadow-lg border-t border-[#3ABEF9]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <span
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  className="block text-gray-300 font-medium py-2 cursor-pointer hover:text-[#3ABEF9] transition-colors duration-300"
                  style={{ userSelect: 'none' }}
                >
                  {item.name}
                </span>
              ))}
              <div className="pt-4 border-t border-[#3ABEF9]/20">
                <button 
                  onClick={() => {
                    navigate('/packages');
                    setIsOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#3ABEF9] to-[#007BFF] hover:from-[#007BFF] hover:to-[#0052CC] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] focus:ring-offset-2 border-2 border-[#3ABEF9]/30 hover:border-[#3ABEF9]/50"
                  style={{
                    boxShadow: '0 4px 20px rgba(58, 190, 249, 0.3), 0 0 0 1px rgba(58, 190, 249, 0.1)',
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 