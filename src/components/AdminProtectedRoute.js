import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAuth from '../utils/adminAuth';

const AdminProtectedRoute = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = () => {
      // Initialize admin session from localStorage
      const session = adminAuth.initSession();
      
      if (session.success && adminAuth.isLoggedIn()) {
        setIsAdminAuthenticated(true);
      } else {
        // Redirect to admin login if not authenticated as admin
        navigate('/admin-login');
      }
      setIsLoading(false);
    };

    checkAdminAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm">Checking admin authentication...</p>
        </div>
      </div>
    );
  }

  return isAdminAuthenticated ? children : null;
};

export default AdminProtectedRoute; 