import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Shield,
  AlertCircle,
  User,
  LogIn
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userAuth } from '../utils/userAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Removed auto-redirect - user must always enter credentials

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    // Use the proper userAuth system
    const result = userAuth.login(email, password);
    
    if (result.success) {
      setLoading(false);
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
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
            Back to Home
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
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
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

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3abef9]/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors duration-300"
                  placeholder="Enter your email"
                />
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
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>



          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  console.log('Sign up button clicked');
                  console.log('Attempting to navigate to /signup');
                  try {
                    navigate('/signup');
                    console.log('Navigation successful');
                  } catch (error) {
                    console.error('Navigation error:', error);
                    // Fallback to window.location
                    window.location.href = '/signup';
                  }
                }}
                className="text-[#3abef9] hover:text-white font-semibold transition-colors duration-300"
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 