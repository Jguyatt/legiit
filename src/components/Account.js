import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Building, 
  Globe, 
  Users, 
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { userAuth } from '../utils/userAuth';

const Account = () => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {
    const loadUserData = () => {
      console.log('Loading user data...');
      
      // Initialize session first
      const initResult = userAuth.initSession();
      console.log('Init result:', initResult);
      
      const session = userAuth.getSession();
      console.log('Session:', session);
      
      if (session) {
        setUserSession(session);
        const data = userAuth.getUserData(session.email);
        console.log('User data:', data);
        setUserData(data);
        setEditForm({
          name: data?.name || '',
          businessName: data?.businessName || '',
          websiteUrl: data?.websiteUrl || '',
          activeClients: data?.activeClients || 0
        });
        

      } else {
        console.log('No session found');
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveStatus(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: userData?.name || '',
      businessName: userData?.businessName || '',
      websiteUrl: userData?.websiteUrl || '',
      activeClients: userData?.activeClients || 0
    });
    setSaveStatus(null);
  };

  const handleSave = () => {
    if (!userSession?.email) return;

    const result = userAuth.updateUserData(userSession.email, editForm);
    if (result.success) {
      setUserData(result.data);
      setIsEditing(false);
      setSaveStatus({ type: 'success', message: 'Account updated successfully!' });
      
      // Update session name if it was changed
      if (editForm.name !== userSession.name) {
        const updatedSession = { ...userSession, name: editForm.name };
        localStorage.setItem('userSession', JSON.stringify(updatedSession));
        setUserSession(updatedSession);
      }
    } else {
      setSaveStatus({ type: 'error', message: result.error || 'Failed to update account' });
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE') {
      return;
    }

    setDeleteLoading(true);
    
    try {
      // Remove user from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      delete users[userSession.email.toLowerCase()];
      localStorage.setItem('users', JSON.stringify(users));
      
      // Clear session
      localStorage.removeItem('userSession');
      localStorage.removeItem('customerData');
      localStorage.removeItem('customerToken');
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm">Loading account information...</p>
        </div>
      </div>
    );
  }

  if (!userSession || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-gray-300">Unable to load account information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3abef9] to-[#6366f1] rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Account Settings
                </h1>
                <p className="text-gray-300 text-lg">Manage your account information and preferences</p>
              </div>
            </div>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Save Status */}
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              saveStatus.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {saveStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{saveStatus.message}</span>
          </motion.div>
        )}

        {/* Account Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 border border-[#3abef9]/20"
        >
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <User className="w-6 h-6 text-[#3abef9]" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <p className="text-white font-medium">{userData.email}</p>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                  <p className="text-white font-medium">{userData.name}</p>
                </div>
              )}
            </div>

            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Business Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors"
                  placeholder="Enter your business name"
                />
              ) : (
                <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                  <p className="text-white font-medium">{userData.businessName}</p>
                </div>
              )}
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editForm.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                  <p className="text-white font-medium">
                    {userData.websiteUrl || 'Not provided'}
                  </p>
                </div>
              )}
            </div>

            {/* Active Clients */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Clients
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={editForm.activeClients}
                  onChange={(e) => handleInputChange('activeClients', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#3abef9] transition-colors"
                  placeholder="Number of active clients"
                  min="0"
                />
              ) : (
                <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                  <p className="text-white font-medium">{userData.activeClients} clients</p>
                </div>
              )}
            </div>

            {/* Account Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Account Status
              </label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-white font-medium">Active</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">Email verified</p>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#1a1a1a] rounded-2xl p-6 lg:p-8 border border-[#3abef9]/20 mt-6"
        >
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#3abef9]" />
            Account Details
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Since */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Member Since</label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <p className="text-white font-medium">
                  {new Date(userData.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Last Login */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Last Login</label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <p className="text-white font-medium">
                  {userSession.loginTime ? 
                    new Date(userSession.loginTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Unknown'
                  }
                </p>
              </div>
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Account Type</label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <p className="text-white font-medium">
                  {userData.isAdmin ? 'Administrator' : 'Standard User'}
                </p>
              </div>
            </div>

            {/* Email Verification */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Verification</label>
              <div className="bg-[#2a2a2a] rounded-lg p-4 border border-[#3abef9]/10">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-white font-medium">Not Required</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Email verification is not required for this account
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#6366f1] hover:to-[#3abef9] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </motion.button>
          </motion.div>
        )}

        {/* Delete Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 lg:p-8 mt-8"
        >
          <h2 className="text-xl lg:text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            Danger Zone
          </h2>
          
          <div className="space-y-4">
            <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Delete Account</h3>
              <p className="text-gray-300 text-sm mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-red-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Delete Account</h2>
                <p className="text-gray-400 text-sm">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">What will be deleted:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Your account and profile information</li>
                    <li>• All project data and progress</li>
                    <li>• Billing and subscription information</li>
                    <li>• All associated files and documents</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type "DELETE" to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-300"
                    placeholder="Type DELETE to confirm"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 font-semibold px-4 py-3 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'DELETE' || deleteLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Account; 