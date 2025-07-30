import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

const OnboardingForm = ({ isOpen, onClose, service, onSubmit }) => {
  console.log('OnboardingForm received service:', service);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    address: '',
    website: '',
    googleBusinessProfile: '',
    businessDescription: '',
    targetKeyword: '',
    supportingKeywords: '',
    service: service || 'Local Citations'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Service-specific requirements
  const getServiceRequirements = (serviceName) => {
    const requirements = {
      'Local Citations': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea', note: 'Use the exact same address format as your Google Business Profile' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel', note: 'Use the exact same phone number as your Google Business Profile' },
        { name: 'website', label: 'Your business website URL', required: true, type: 'url', note: 'Must be a live, working website' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your current Google Business Profile' },
        { name: 'targetKeyword', label: 'Main target keyword (e.g., "plumber near me")', required: true, type: 'text', note: 'The primary keyword you want to rank for' },
        { name: 'supportingKeywords', label: '10 supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Example: emergency plumber, residential plumber, commercial plumber, etc.' },
        { name: 'businessDescription', label: 'Business description (110 characters max)', required: true, type: 'textarea', maxLength: 110, note: 'Brief description of your services' },
        { name: 'email', label: 'Business email address', required: true, type: 'email', note: 'Primary contact email for your business' },
        { name: 'geotaggedMapLink', label: 'Geo-tagged Map Link (Required)', required: true, type: 'url', note: 'If you don\'t have a geo-tagged map, please purchase the Map PowerBoost service first.' }
      ],
      'Map PowerBoost': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea', note: 'Full street address including city, state, and zip code' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel', note: 'Primary business phone number' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Current Google Business Profile link', required: true, type: 'url', note: 'Link to your existing Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'The main keyword you want to rank for in Google Maps' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords related to your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Detailed description of your services and what makes you unique' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Cloud Stack Boost': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text', note: 'Your business name as it appears online' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords for your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Description of your services' },
        { name: 'geotaggedMapLink', label: 'Geotagged Map Link from Map PowerBoost Package', required: true, type: 'url', note: 'You must have completed the Map PowerBoost service first' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Platinum Local SEO': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea', note: 'Use the exact same address format as your Google Business Profile' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel', note: 'Use the exact same phone number as your Google Business Profile' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your current Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords for your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Detailed description of your services' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Google Business Profile': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea', note: 'Use the exact same address format as your Google Business Profile' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel', note: 'Use the exact same phone number as your Google Business Profile' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Current Google Business Profile link', required: true, type: 'url', note: 'Link to your existing Google Business Profile that needs optimization' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for in Google Maps' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords related to your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Detailed description of your services and what makes you unique' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Review Management': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text', note: 'Your business name as it appears online' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords for your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Description of your services' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Performance Reporting': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text', note: 'Your business name as it appears online' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to track' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords to track' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Description of your services' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Local Citation Building': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea', note: 'Use the exact same address format as your Google Business Profile' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel', note: 'Use the exact same phone number as your Google Business Profile' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your current Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords for your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Detailed description of your services' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ],
      'Map Embed Stacking': [
        { name: 'businessName', label: 'Business name (exactly as it appears on Google)', required: true, type: 'text', note: 'Must match your Google Business Profile exactly' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea', note: 'Use the exact same address format as your Google Business Profile' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel', note: 'Use the exact same phone number as your Google Business Profile' },
        { name: 'website', label: 'Website URL', required: true, type: 'url', note: 'Your business website homepage' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url', note: 'Link to your current Google Business Profile' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text', note: 'Main keyword you want to rank for' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea', note: 'Additional keywords for your business' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea', note: 'Detailed description of your services' },
        { name: 'email', label: 'Business email', required: true, type: 'email', note: 'Contact email for your business' }
      ]
    };

    return requirements[serviceName] || requirements['Local Citations'];
  };

  // Service-specific descriptions and instructions
  const getServiceDescription = (serviceName) => {
    const descriptions = {
      'Local Citations': {
        title: 'Local Citations Service',
        description: 'We\'ll build citations on high-authority local directories to improve your local SEO rankings. This service requires a geo-tagged map from our Map PowerBoost service.',
        instructions: 'Please provide accurate business information that matches your Google Business Profile exactly. NAP consistency is crucial for local SEO success.'
      },
      'Map PowerBoost': {
        title: 'Map PowerBoost Service',
        description: 'We\'ll create and optimize your geo-tagged map to improve your Google Maps rankings and local visibility.',
        instructions: 'Please provide your current business information. We\'ll use this to create an optimized geo-tagged map for your business.'
      },
      'Cloud Stack Boost': {
        title: 'Cloud Stack Boost Service',
        description: 'We\'ll implement advanced cloud-based SEO techniques to boost your rankings across multiple platforms.',
        instructions: 'This service requires a completed Map PowerBoost geo-tagged map. Please provide the map link from your previous Map PowerBoost service.'
      },
      'Platinum Local SEO': {
        title: 'Platinum Local SEO Service',
        description: 'Our comprehensive local SEO package that includes citations, GBP optimization, and advanced local ranking strategies.',
        instructions: 'Please provide complete business information. We\'ll use this for comprehensive local SEO optimization across all platforms.'
      },
      'Google Business Profile': {
        title: 'Google Business Profile Optimization',
        description: 'We\'ll optimize your Google Business Profile to improve your local search rankings and visibility.',
        instructions: 'Please provide your current GBP information. We\'ll optimize your profile for better local search performance.'
      },
      'Review Management': {
        title: 'Review Management Service',
        description: 'We\'ll help you manage and improve your online reviews across various platforms.',
        instructions: 'Please provide your business information. We\'ll use this to set up review monitoring and management.'
      },
      'Performance Reporting': {
        title: 'Performance Reporting Service',
        description: 'We\'ll provide detailed reports on your SEO performance and rankings.',
        instructions: 'Please provide your business information. We\'ll set up comprehensive tracking and reporting.'
      },
      'Local Citation Building': {
        title: 'Local Citation Building Service',
        description: 'We\'ll build citations on local directories to improve your local search rankings.',
        instructions: 'Please provide accurate business information that matches your Google Business Profile exactly.'
      },
      'Map Embed Stacking': {
        title: 'Map Embed Stacking Service',
        description: 'We\'ll embed multiple maps across various platforms to boost your local visibility.',
        instructions: 'Please provide accurate business information that matches your Google Business Profile exactly.'
      }
    };

    return descriptions[serviceName] || descriptions['Local Citations'];
  };

  const currentRequirements = getServiceRequirements(service);
  const serviceInfo = getServiceDescription(service);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {serviceInfo.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {serviceInfo.description}
            </p>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              {serviceInfo.instructions}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 ml-4"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                  onChange={handleChange}
                required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                  onChange={handleChange}
                required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
            </div>
          </div>

          {/* Service Requirements */}
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Service Requirements</h3>
            <div className="space-y-3 sm:space-y-4">
              {currentRequirements.map((field, index) => (
                <div key={index}>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && '*'}
            </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      maxLength={field.maxLength}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={field.label}
                    />
                  ) : (
            <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={field.label}
                    />
                  )}
                  {field.maxLength && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formData[field.name]?.length || 0}/{field.maxLength} characters
                    </p>
                  )}
                  {field.note && (
                    <p className="text-xs text-orange-600 mt-1 font-medium">
                      {field.note}
                    </p>
                  )}
          </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 sm:pt-6 border-t">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Submit Onboarding Form
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm; 