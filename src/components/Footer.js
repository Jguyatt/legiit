import React from 'react';
import { 
  Instagram, 
  ArrowUp,
  Phone,
  Mail
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'GBP Optimization', href: '#services' },
      { name: 'Map Embed Stacking', href: '#services' },
      { name: 'Review Generation', href: '#services' },
      { name: 'Link Building', href: '#services' },
      { name: 'Monthly Reporting', href: '#services' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#process' },
      { name: 'Case Studies', href: '#results' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/rankly360', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#0f0f0f] text-white border-t border-[#3ABEF9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo.png" 
                alt="Rankly360 Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Rankly360</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Local SEO specialists helping businesses dominate Google Maps and increase local leads through proven strategies and transparent results.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#3ABEF9]" />
                <span className="text-gray-300">+1-647-323-6969</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#3ABEF9]" />
                <span className="text-gray-300">tryranklyai@gmail.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#3ABEF9] rounded-full flex items-center justify-center transition-colors duration-300 border border-[#3ABEF9]/20"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#3ABEF9]">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#3ABEF9] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#a3e635]">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#a3e635] transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#3ABEF9]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Rankly360. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-[#1a1a1a] hover:bg-[#3ABEF9] rounded-full flex items-center justify-center transition-colors duration-300 border border-[#3ABEF9]/20"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 