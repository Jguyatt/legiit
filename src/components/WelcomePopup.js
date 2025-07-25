import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userAuth } from '../utils/userAuth';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('');

    useEffect(() => {
    // Check if welcome popup should be shown
    const shouldShowPopup = localStorage.getItem('showWelcomePopup');
    const session = userAuth.getSession();
    
    console.log('WelcomePopup check:', { shouldShowPopup, session });
    
    if (shouldShowPopup === 'true' && session && session.name) {
      console.log('Showing welcome popup for:', session.name);
      setUserName(session.name);
      setShowPopup(true);
      
      // Clear the flag
      localStorage.removeItem('showWelcomePopup');
      
      // Auto-dismiss after 2 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Add a manual trigger for testing (remove this later)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'w' && e.ctrlKey) {
        const session = userAuth.getSession();
        if (session && session.name) {
          console.log('Manual trigger - showing popup for:', session.name);
          setUserName(session.name);
          setShowPopup(true);
          
          const timer = setTimeout(() => {
            setShowPopup(false);
          }, 2000);
          
          return () => clearTimeout(timer);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] rounded-2xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm max-w-sm w-full">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
            >
              <motion.svg 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            </motion.div>
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white font-semibold text-lg mb-1"
              >
                Welcome back, {userName}! 👋
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-white/80 text-sm"
              >
                Great to see you again. Your dashboard is ready.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePopup; 