import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Mail, 
  ArrowLeft,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userAuth } from '../utils/userAuth';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5002/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email })
        });

        const result = await response.json();

        if (result.success) {
          // Complete the signup process
          const signupResult = userAuth.completeSignup(email);
          
          if (signupResult.success) {
            setStatus('success');
            setMessage('Email verified successfully! Your account is now active.');
          } else {
            setStatus('error');
            setMessage('Account activation failed. Please contact support.');
          }
        } else {
          setStatus('error');
          setMessage(result.message || 'Verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Verification failed. Please try again or contact support.');
      }

      setLoading(false);
    };

    verifyEmail();
  }, [searchParams]);

  const handleResendEmail = async () => {
    const email = searchParams.get('email');
    if (!email) {
      setMessage('Email not found. Please sign up again.');
      return;
    }

    setLoading(true);
    try {
              const response = await fetch('http://localhost:5002/api/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name: 'User' })
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage('Verification email sent successfully! Please check your inbox.');
      } else {
        setMessage(result.message || 'Failed to send verification email.');
      }
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
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
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
              status === 'success' ? 'bg-green-500' : 
              status === 'error' ? 'bg-red-500' : 
              'bg-gradient-to-r from-[#3abef9] to-[#6366f1]'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : status === 'error' ? (
                <XCircle className="w-8 h-8 text-white" />
              ) : (
                <Mail className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {status === 'success' ? 'Email Verified!' : 
               status === 'error' ? 'Verification Failed' : 
               'Verifying Email'}
            </h1>
            <p className="text-gray-400 text-sm">
              {status === 'success' ? 'Your account is now active' : 
               status === 'error' ? 'Please try again or contact support' : 
               'Please wait while we verify your email'}
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
              <p className="text-gray-400">Verifying your email address...</p>
            </motion.div>
          )}

          {/* Message */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${
                status === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <p className={`text-sm ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {message}
              </p>
            </motion.div>
          )}

          {/* Action buttons */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {status === 'success' ? (
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue to Login
                </button>
              ) : status === 'error' ? (
                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Resend Verification Email
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="w-full bg-transparent border-2 border-[#3abef9] text-[#3abef9] hover:bg-[#3abef9] hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Create New Account
                  </button>
                </div>
              ) : null}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification; 