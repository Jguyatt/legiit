import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

const OnboardingForm = ({ isOpen, onClose, service, onSubmit }) => {
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
        { name: 'website', label: 'Your/client website URL', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Main target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: '10 supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessName', label: 'Business name (NAP consistency)', required: true, type: 'text' },
        { name: 'address', label: 'Business address (NAP consistency)', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number (NAP consistency)', required: true, type: 'tel' },
        { name: 'googleBusinessProfile', label: 'GBP link', required: true, type: 'url' },
        { name: 'businessDescription', label: 'Short description of your company (110 characters max)', required: true, type: 'textarea', maxLength: 110 },
        { name: 'email', label: 'E-mail Address of your business', required: true, type: 'email' }
      ],
      'Map PowerBoost': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
                   'Cloud Stack Boost': [
               { name: 'businessName', label: 'Business name', required: true, type: 'text' },
               { name: 'website', label: 'Website URL', required: true, type: 'url' },
               { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
               { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
               { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
               { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
               { name: 'geotaggedMapLink', label: 'Geotagged Map Link from Map PowerBoost Package', required: true, type: 'url' },
               { name: 'email', label: 'Business email', required: true, type: 'email' }
             ],
      'Platinum Local SEO': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
      'Google Business Profile': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Current Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
      'Review Management': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
      'Performance Reporting': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
      'Local Citation Building': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ],
      'Map Embed Stacking': [
        { name: 'businessName', label: 'Business name', required: true, type: 'text' },
        { name: 'address', label: 'Business address', required: true, type: 'textarea' },
        { name: 'phoneNumber', label: 'Business phone number', required: true, type: 'tel' },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'googleBusinessProfile', label: 'Google Business Profile link', required: true, type: 'url' },
        { name: 'targetKeyword', label: 'Primary target keyword', required: true, type: 'text' },
        { name: 'supportingKeywords', label: 'Supporting keywords (comma separated)', required: true, type: 'textarea' },
        { name: 'businessDescription', label: 'Business description', required: true, type: 'textarea' },
        { name: 'email', label: 'Business email', required: true, type: 'email' }
      ]
    };

    return requirements[serviceName] || requirements['Local Citations'];
  };

  const currentRequirements = getServiceRequirements(service);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {service} - Onboarding Form
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Please provide the following information to get started
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
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