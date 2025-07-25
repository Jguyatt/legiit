import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Store, 
  BarChart3, 
  LogOut, 
  HelpCircle, 
  Menu,
  X,
  Bell,
  Settings,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';
import { userAuth } from '../utils/userAuth';

const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userSession, setUserSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = userAuth.getSession();
    setUserSession(session);
  }, []);

  const handleLogout = () => {
    userAuth.logout();
    navigate('/');
  };

  const navigationItems = [
    {
      name: 'My Dashboard',
      icon: BarChart3,
      path: '/dashboard',
      description: 'View your projects and progress',
      badge: null
    },
    {
      name: 'Store',
      icon: Store,
      path: '/packages',
      description: 'Browse and purchase services',
      badge: 'New'
    },
    {
      name: 'Account',
      icon: User,
      path: '/account',
      description: 'Manage your profile and settings',
      badge: null
    },
    {
      name: 'Help & Support',
      icon: HelpCircle,
      path: '/help',
      description: 'Get help and contact support',
      badge: 'Live'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-slate-800 p-2 rounded border border-slate-600 shadow-lg"
        >
          {isSidebarOpen ? <X className="w-4 h-4 text-slate-300" /> : <Menu className="w-4 h-4 text-slate-300" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 z-40 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Rankly360</h1>
                <p className="text-xs text-slate-400">Local SEO Platform</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-white font-medium text-sm">{userSession?.name || 'User'}</h2>
                <p className="text-xs text-slate-400">{userSession?.email || 'user@example.com'}</p>
              </div>
            </div>
            <div className="bg-slate-700 rounded p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Status</span>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-6">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Navigation</h3>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-2 p-2 rounded text-left ${
                      isActiveRoute(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActiveRoute(item.path) ? 'text-white' : 'text-slate-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.name}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                            item.badge === 'New' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout Section */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-2 rounded text-slate-300 hover:bg-slate-700 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="min-h-screen bg-slate-900">
          {children}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AuthenticatedLayout; 