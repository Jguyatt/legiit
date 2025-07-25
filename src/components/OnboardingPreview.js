import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const OnboardingPreview = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || 'Local Citations';
  
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
    service: service
  });

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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Rankly360 Logo" 
                className="h-6 sm:h-8 w-auto"
              />
              <span className="text-white font-semibold text-sm sm:text-base">Rankly360</span>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Notice */}
      <div className="bg-blue-600/20 border-b border-blue-600/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/20 rounded flex items-center justify-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-blue-400">Onboarding Form Preview</h2>
              <p className="text-slate-300 text-xs sm:text-sm">This is a preview of the onboarding form for {service}. No data will be submitted.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Form Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {service} - Onboarding Form
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Please provide the following information to get started
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Preview Mode
              </span>
            </div>
          </div>

          {/* Form Content */}
          <form className="p-4 sm:p-6 space-y-4 sm:space-y-6">
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Preview - No data will be saved"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Preview - No data will be saved"
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
                        maxLength={field.maxLength}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Preview - ${field.label}`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Preview - ${field.label}`}
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

            {/* Preview Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-800 text-xs font-bold">!</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-yellow-800">Preview Mode</h4>
                  <p className="text-xs sm:text-sm text-yellow-700 mt-1 leading-relaxed">
                    This is a preview of the onboarding form. No data will be submitted or saved. 
                    To actually submit your information, please purchase the service and complete the real onboarding form.
                    You can close this tab when you're done previewing.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPreview; 