import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  ArrowLeft,
  AlertCircle,
  UserPlus,
  CheckCircle,
  Mail,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../utils/userAuth';

// Form data persistence keys
const FORM_STORAGE_KEY = 'rankly360_signup_form_data';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [activeClients, setActiveClients] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  // Load saved form data on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedFormData) {
      try {
        const formData = JSON.parse(savedFormData);
        setName(formData.name || '');
        setEmail(formData.email || '');
        setBusinessName(formData.businessName || '');
        setActiveClients(formData.activeClients || '');
        setWebsiteUrl(formData.websiteUrl || '');
        setPassword(formData.password || '');
        setConfirmPassword(formData.confirmPassword || '');
        setAgreeToTerms(formData.agreeToTerms || false);
      } catch (error) {
        console.error('Error loading saved form data:', error);
        // Clear corrupted data
        localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }
  }, []);

  // Save form data whenever any field changes
  useEffect(() => {
    const formData = {
      name,
      email,
      businessName,
      activeClients,
      websiteUrl,
      password,
      confirmPassword,
      agreeToTerms
    };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [name, email, businessName, activeClients, websiteUrl, password, confirmPassword, agreeToTerms]);

  // Clear saved form data after successful signup
  const clearSavedFormData = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  // Temporarily disabled session check to fix navigation issue
  // useEffect(() => {
  //   // Check if already logged in
  //   const session = userAuth.initSession();
  //   if (session.success) {
  //     // Only redirect to admin if explicitly an admin user
  //     if (userAuth.isAdmin() && session.data?.isAdmin === true) {
  //       navigate('/admin');
  //     } else {
  //       // Regular users go to dashboard
  //       navigate('/dashboard');
  //     }
  //   }
  // }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!name || !email || !businessName || !activeClients || !password || !confirmPassword) {
      setError('All required fields must be filled');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const result = await userAuth.signup(email, password, name, businessName, activeClients, websiteUrl);
      
      if (result.success) {
        // Clear saved form data on successful signup
        clearSavedFormData();
        
        // Auto-login the user after successful signup
        const loginResult = userAuth.login(email, password);
        if (loginResult.success) {
          // Create customer data structure for admin dashboard
          const customerData = {
            name: name,
            email: email,
            business: businessName,
            businessName: businessName,
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ').slice(1).join(' ') || '',
            subscriptionStatus: 'Active',
            activeProjects: [],
            orderTimeline: {
              orderPlaced: {
                status: 'pending',
                date: null,
                completed: false
              },
              onboardingForm: {
                status: 'pending',
                date: null,
                completed: false
              },
              orderInProgress: {
                status: 'pending',
                date: null,
                completed: false
              },
              reviewDelivery: {
                status: 'pending',
                date: null,
                completed: false
              },
              orderComplete: {
                status: 'pending',
                date: null,
                completed: false
              }
            },
            recentActivity: [
              {
                type: 'account_created',
                message: 'Account created successfully',
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
          
          // Store customer data in localStorage with unique key
          const customerKey = `customer-${email.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          localStorage.setItem(customerKey, JSON.stringify(customerData));
          
          // Dispatch event to notify admin dashboard of new customer
          window.dispatchEvent(new CustomEvent('customerAdded', { 
            detail: { customerData } 
          }));
          
          setShowSuccessModal(true);
        } else {
          setError('Account created but login failed. Please try logging in.');
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred during signup. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-[#3abef9]/40 rounded-full blur-[1px]" />
        <div className="absolute top-40 right-1/3 w-0.5 h-0.5 bg-white/30 rounded-full blur-[0.8px]" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-[#00ffff]/50 rounded-full blur-[1.2px]" />
        <div className="absolute bottom-20 right-1/4 w-0.8 h-0.8 bg-[#3abef9]/35 rounded-full blur-[1px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to home button */}
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate('/')}
            className="text-[#3abef9] hover:text-white font-semibold text-sm transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a1a1a] rounded-3xl p-8 border border-[#3abef9]/20 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#3abef9] to-[#6366f1] rounded-2xl mb-4">
              <img 
                src="/images/logo.png" 
                alt="Rankly360 Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Join us to access your dashboard</p>
          </div>



          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Signup form */}
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Enter your full name"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Enter your email"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Business Name field */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                Business Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Enter your business name"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            {/* Number of Active Clients field */}
            <div>
              <label htmlFor="activeClients" className="block text-sm font-medium text-gray-300 mb-2">
                Number of Active Clients *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="activeClients"
                  value={activeClients}
                  onChange={(e) => setActiveClients(e.target.value)}
                  required
                  min="0"
                  className="w-full px-4 py-3 pl-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Enter number of active clients"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>

            {/* Website URL field */}
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Website URL (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="https://yourwebsite.com"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <a 
                  href="/terms-of-service" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#3abef9] hover:underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Signup button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#3abef9] hover:text-white font-semibold transition-colors duration-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a1a1a] rounded-3xl p-8 border border-[#3abef9]/20 shadow-2xl max-w-md w-full"
          >
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Rankly360!</h2>
              <p className="text-gray-400 text-sm">
                Your account has been created successfully
              </p>
            </div>

            {/* Success Details */}
            <div className="bg-[#2a2a2a] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-5 h-5 text-[#3abef9]" />
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-[#3abef9]" />
                <span className="text-gray-300">{email}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-[#3abef9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-gray-300">{businessName}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-[#3abef9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-300">{activeClients} active clients</span>
              </div>
              {websiteUrl && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#3abef9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span className="text-gray-300">{websiteUrl}</span>
                </div>
              )}
            </div>

            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
              <p className="text-green-400 text-sm text-center">
                🎉 Your account is ready! You can now access your dashboard and start optimizing your business.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/dashboard');
                }}
                className="w-full bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/login');
                }}
                className="w-full bg-transparent border-2 border-[#3abef9] text-[#3abef9] hover:bg-[#3abef9] hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Sign In Instead
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Signup; 