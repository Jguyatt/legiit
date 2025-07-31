import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, AlertCircle, RefreshCw, LogOut, 
  Eye, XCircle, CheckCircle, Clock, BarChart3, Settings,
  TrendingUp, MessageSquare, Send
} from 'lucide-react';
import adminAuth from '../utils/adminAuth';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [onboardingSubmissions, setOnboardingSubmissions] = useState([]);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedOnboardingReview, setSelectedOnboardingReview] = useState(null);
  const [showOnboardingReviewModal, setShowOnboardingReviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingStates, setLoadingStates] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessages, setSuccessMessages] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Chat functionality
  const openChat = async (customer, projectId = null) => {
    setSelectedCustomer(customer);
    setCurrentProjectId(projectId);
    setShowChatModal(true);
    
    // Load existing chat messages for this customer/project
    const chatKey = projectId ? `${customer.email}_${projectId}` : customer.email;
    await loadChatMessages(chatKey);
  };

  const sendMessage = async (customerEmail, message, projectId = null) => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'admin',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    // Add message to chat
    const chatKey = projectId ? `${customerEmail}_${projectId}` : customerEmail;
    setChatMessages(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMsg]
    }));

    // Clear input
    setNewMessage('');

    // TODO: Send message to backend for persistence
    try {
      await fetch('https://rankly360.up.railway.app/api/chat-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          projectId,
          message: newMsg.message,
          sender: 'admin',
          timestamp: newMsg.timestamp
        })
      });
    } catch (error) {
      console.error('Failed to send message to backend:', error);
    }
  };

  const loadChatMessages = async (chatKey) => {
    try {
      setChatLoading(true);
      const response = await fetch(`https://rankly360.up.railway.app/api/chat-messages/${chatKey}`);
      const data = await response.json();
      
      if (data.success) {
        setChatMessages(prev => ({
          ...prev,
          [chatKey]: data.messages || []
        }));
      } else {
        console.error('❌ Failed to load chat messages:', data);
      }
    } catch (error) {
      console.error('❌ Error loading chat messages:', error);
    } finally {
      setChatLoading(false);
    }
  };

  // Event handlers
  const handleStorageChange = () => {
    console.log('🔄 Storage changed, refreshing admin dashboard...');
    loadAllData();
  };

  const handleCustomerAdded = (event) => {
    console.log('🆕 New customer/user added event received:', event.detail);
    console.log('🔄 Refreshing admin dashboard...');
    loadAllData();
  };

  const handleOnboardingSubmitted = (event) => {
    console.log('📋 New onboarding submission, refreshing admin dashboard...', event.detail);
    loadAllData();
  };

  const handleUserDeleted = (event) => {
    console.log('🗑️ User deleted:', event.detail.email);
    // Refresh data to remove deleted user
    loadAllData();
  };

  const handleNewPurchase = (event) => {
    console.log('💰 New purchase detected:', event.detail);
    // Show notification and refresh data
    alert(`🎉 New Project Started!\n\nCustomer: ${event.detail.customerName}\nEmail: ${event.detail.customerEmail}\nService: ${event.detail.packageName}\nAmount: $${event.detail.amount}\n\nCheck the "Current Projects" tab to manage this project.`);
    loadAllData();
    // Automatically switch to Current Projects tab
    setActiveTab('current-projects');
  };

  useEffect(() => {
    const session = adminAuth.initSession();
    if (!session.success) {
      window.location.href = '/admin-login';
      return;
    }

    loadAllData();
    
    // Listen for new customer additions
    window.addEventListener('customerAdded', handleCustomerAdded);
    window.addEventListener('onboardingSubmitted', handleOnboardingSubmitted);
    window.addEventListener('userDeleted', handleUserDeleted);
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for new purchases
    window.addEventListener('newPurchase', handleNewPurchase);
    
    return () => {
      window.removeEventListener('customerAdded', handleCustomerAdded);
      window.removeEventListener('onboardingSubmitted', handleOnboardingSubmitted);
      window.removeEventListener('userDeleted', handleUserDeleted);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('newPurchase', handleNewPurchase);
    };
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load customers from backend
      const response = await fetch('https://rankly360.up.railway.app/api/all-customers');
      const data = await response.json();
      
      if (data.success) {
        // Convert backend customers to frontend format - SHOW ALL CUSTOMERS (not just those with active projects)
        const backendCustomers = Object.values(data.customers || {})
          .map(customer => ({
            id: customer.email,
            name: customer.name,
            email: customer.email,
            service: customer.activeProjects?.[0]?.service || 'No Active Service',
            progress: customer.activeProjects?.[0]?.progress || 0,
            subscriptionStatus: customer.subscriptionStatus || 'Active',
            customerData: customer,
            recentActivity: customer.recentActivity || [],
            accountManager: {
              name: 'Jacob Guyatt',
              email: 'guyattj39@gmail.com',
              phone: '+1 (555) 123-4567'
            }
          }));
        
        setClients(backendCustomers);
        
        // Load users (all signed up users) - ensure uniqueness and filter out duplicates with customers
        const customerEmails = new Set(backendCustomers.map(customer => customer.email.toLowerCase()));
        const allUsers = Object.values(data.users || {})
          .filter(user => !customerEmails.has(user.email.toLowerCase())) // Filter out users that are already customers
          .filter((user, index, self) => 
            index === self.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase())
          )
          .map(user => ({
            id: user.email,
            name: user.name,
            email: user.email,
            businessName: user.businessName,
            activeClients: user.activeClients || 0,
            signupDate: user.signupDate || new Date().toISOString(),
            lastLogin: user.lastLogin || new Date().toISOString()
          }));
        
        setUsers(allUsers);
        
        // Load onboarding submissions - COMBINE BACKEND AND LOCAL STORAGE
        let backendSubmissions = [];
        try {
          const onboardingResponse = await fetch('https://rankly360.up.railway.app/api/onboarding-submissions');
          const onboardingData = await onboardingResponse.json();
          
          if (onboardingData.success) {
            backendSubmissions = onboardingData.submissions || [];
          }
        } catch (error) {
          console.log('Backend onboarding submissions not available, using local storage only');
        }
        
        // Get local storage submissions
        const localSubmissions = JSON.parse(localStorage.getItem('onboarding-submissions') || '[]');
        
        // Combine and deduplicate submissions
        const allSubmissions = [...backendSubmissions];
        localSubmissions.forEach(localSub => {
          const exists = allSubmissions.find(sub => sub.id === localSub.id || sub.customerEmail === localSub.customerEmail);
          if (!exists) {
            allSubmissions.push(localSub);
          }
        });
        
        setOnboardingSubmissions(allSubmissions);
        
        // Load cancellation requests

        
        console.log('✅ Admin dashboard data loaded successfully');
        console.log('📊 Active clients:', backendCustomers.length);
        console.log('📊 Total users:', allUsers.length);
        console.log('📊 Onboarding submissions:', allSubmissions.length);

        
      } else {
        console.error('❌ Failed to load admin dashboard data:', data.error);
      }
    } catch (error) {
      console.error('❌ Error loading admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to categorize clients and users
  const getActiveClients = () => {
    return clients.filter(client => client.subscriptionStatus === 'Active');
  };

  const getCurrentProjects = () => {
    return clients.filter(client => 
      // Show clients who have active projects (from purchases)
      client.customerData?.activeProjects && client.customerData.activeProjects.length > 0 &&
      client.subscriptionStatus === 'Active'
    );
  };

  const getUniqueUsers = () => {
    // Combine customers and users, filtering out duplicates by email
    const allUsers = [...clients, ...users];
    const uniqueUsers = allUsers.filter((user, index, self) => 
      index === self.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase())
    );
    
    // Filter to show only users with active projects or completed projects
    return uniqueUsers.filter(user => {
      const hasActiveProjects = user.customerData?.activeProjects?.length > 0 || user.activeProjects?.length > 0;
      const hasCompletedProjects = user.customerData?.completedProjects?.length > 0 || user.completedProjects?.length > 0;
      return hasActiveProjects || hasCompletedProjects;
    });
  };

  const getCompletedProjects = () => {
    return clients.filter(client => {
      // Check if all timeline steps are completed
      const timeline = client.customerData?.orderTimeline;
      if (timeline) {
        const allStepsCompleted = Object.values(timeline).every(step => 
          step.completed === true || step.status === 'completed'
        );
        if (allStepsCompleted) return true;
      }
      
      // Check other completion conditions
      return client.progress === 100 || 
        client.customerData?.activeProjects?.some(project => project.status === 'Cancelled') ||
        client.subscriptionStatus === 'Cancelled';
    });
  };

  const handleLogout = () => {
    adminAuth.logout();
    window.location.href = '/admin-login';
  };

  const handleRefresh = async () => {
    console.log('🔄 Manual refresh triggered...');
    setIsRefreshing(true);
    setShowSuccessMessage(false);
    
    try {
      await loadAllData();
      console.log('✅ Refresh completed successfully');
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('❌ Refresh failed:', error);
    } finally {
      // Add a small delay to show the animation
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  const handleTimelineStepUpdate = async (email, stepKey, action) => {
    const actionKey = `${email}-${stepKey}-${action}`;
    
    try {
      // Set loading state
      setLoadingStates(prev => ({ ...prev, [actionKey]: true }));
      setErrorMessages(prev => ({ ...prev, [actionKey]: null }));
      setSuccessMessages(prev => ({ ...prev, [actionKey]: null }));
      
      await updateCustomerTimelineStep(email, stepKey, action);
      
      // Show success message
      const stepDisplayName = stepKey
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      setSuccessMessages(prev => ({ 
        ...prev, 
        [actionKey]: `${stepDisplayName} ${action === 'completed' ? 'completed' : action === 'in_progress' ? 'started' : 'reset'} successfully!` 
      }));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessages(prev => ({ ...prev, [actionKey]: null }));
      }, 3000);
      
      // Refresh admin dashboard data
      setTimeout(() => {
        loadAllData();
      }, 500);
    } catch (error) {
      console.error('Error updating timeline step:', error);
      setErrorMessages(prev => ({ 
        ...prev, 
        [actionKey]: `Failed to update ${stepKey.replace(/([A-Z])/g, ' $1').trim()}. Please try again.` 
      }));
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessages(prev => ({ ...prev, [actionKey]: null }));
      }, 5000);
    } finally {
      // Clear loading state
      setLoadingStates(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const updateCustomerTimelineStep = async (customerEmail, stepName, action) => {
    try {
      // Find the customer in the current clients data
      const customer = clients.find(client => client.email === customerEmail);
      
      if (!customer) {
        console.error('Customer not found for timeline update:', customerEmail);
        throw new Error('Customer not found');
      }
      
      // Update timeline
      const updatedTimeline = {
        ...customer.customerData?.orderTimeline,
        [stepName]: {
          status: action === 'completed' ? 'completed' : action === 'in_progress' ? 'in_progress' : 'pending',
          completed: action === 'completed',
          date: new Date().toISOString()
        }
      };
      
      // Calculate new progress based on completed steps
      const timelineSteps = ['orderPlaced', 'onboardingForm', 'orderInProgress', 'reviewDelivery', 'orderComplete'];
      const completedSteps = timelineSteps.filter(step => 
        updatedTimeline[step]?.completed || updatedTimeline[step]?.status === 'completed'
      ).length;
      const newProgress = Math.round((completedSteps / timelineSteps.length) * 100);
      
      // Update customer data
      const updatedCustomerData = {
        ...customer.customerData,
        orderTimeline: updatedTimeline,
        recentActivity: [
          {
            type: 'timeline_update',
            message: `${stepName.replace(/([A-Z])/g, ' $1').trim()} ${action === 'completed' ? 'completed' : action === 'in_progress' ? 'started' : 'reset'}`,
            date: new Date().toISOString().split('T')[0]
          },
          ...(customer.customerData?.recentActivity || [])
        ]
      };
      
      // Update progress in active projects
      if (updatedCustomerData.activeProjects && updatedCustomerData.activeProjects.length > 0) {
        updatedCustomerData.activeProjects[0].progress = newProgress;
        updatedCustomerData.activeProjects[0].currentPhase = action === 'completed' ? 
          stepName === 'orderComplete' ? 'Completed' : 'Next Phase' : 
          action === 'in_progress' ? 'In Progress' : 'Pending';
      }
      
      // SYNC TO BACKEND - CRITICAL FIX
      try {
        const response = await fetch('https://rankly360.up.railway.app/api/sync-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customerEmail,
            customerData: updatedCustomerData
          })
        });
        
        if (!response.ok) {
          throw new Error(`Backend sync failed: ${response.status}`);
        }
        
        console.log('✅ Timeline update synced to backend');
        
        // Update local state
        setClients(prevClients => 
          prevClients.map(client => 
            client.email === customerEmail 
              ? { ...client, customerData: updatedCustomerData }
              : client
          )
        );
        
      } catch (error) {
        console.error('❌ Failed to sync timeline update to backend:', error);
        throw error;
      }
      
      // Dispatch event to notify customer dashboard
      window.dispatchEvent(new CustomEvent('timelineUpdated', { 
        detail: { customerEmail, updatedData: updatedCustomerData } 
      }));
      
      console.log(`✅ Timeline updated for ${customerEmail}: ${stepName} -> ${action} (Progress: ${newProgress}%)`);
      
    } catch (error) {
      console.error('Error updating timeline:', error);
      throw error;
    }
  };

  const handleProjectCancellation = async (customerEmail, projectId) => {
    if (!customerEmail) {
      console.error('❌ No customer email provided');
      alert('Error: No customer email provided');
      return;
    }
    
    if (!projectId) {
      console.error('❌ No project ID provided');
      alert('Error: No project ID provided');
      return;
    }
    
    if (window.confirm(`Are you sure you want to cancel the project for ${customerEmail}?`)) {
      try {
        console.log('🚫 Cancelling project for:', customerEmail, 'Project ID:', projectId);
        
        // Call backend API to cancel project
        const response = await fetch('https://rankly360.up.railway.app/api/cancel-project', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerEmail: customerEmail,
            projectId: projectId,
            cancelledBy: 'Admin'
          })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          console.log('✅ Backend cancellation successful:', result);
          
          // Update local state immediately
          setClients(prevClients => {
            return prevClients.map(client => {
              if (client.email === customerEmail) {
                return {
                  ...client,
                  subscriptionStatus: 'Cancelled',
                  progress: 100 // Mark as completed
                };
              }
              return client;
            });
          });
          
          // Update onboarding submissions
          setOnboardingSubmissions(prevSubmissions => {
            return prevSubmissions.map(submission => {
              if (submission.customerEmail === customerEmail) {
                return {
                  ...submission,
                  status: 'cancelled'
                };
              }
              return submission;
            });
          });
          
          // Dispatch event to notify customer dashboard of cancellation
          window.dispatchEvent(new CustomEvent('projectCancelled', { 
            detail: { customerEmail, projectId } 
          }));
          
          // Show success notification
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
          notification.textContent = `✅ Project cancelled - moved to Completed Projects`;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 3000);
          
          alert(`✅ Project cancelled successfully for ${customerEmail}`);
          
        } else {
          console.error('❌ Backend cancellation failed:', response.status, result);
          alert(`Error cancelling project: ${result.error || 'Unknown error'}`);
        }
        
      } catch (error) {
        console.error('❌ Network error cancelling project:', error);
        alert('Network error cancelling project. Please try again.');
      }
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black text-white">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Rankly360 Logo" className="h-8 w-auto" />
            <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage customers and projects</p>
            </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`inline-flex items-center px-3 py-2 border border-white/20 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isRefreshing 
                    ? 'text-blue-400 bg-blue-500/10 border-blue-500/30 cursor-not-allowed' 
                    : 'text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              {showSuccessMessage && (
                <div className="inline-flex items-center px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-sm font-medium text-green-400 animate-pulse">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Data Updated!
                </div>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-red-500/20 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex overflow-x-auto space-x-1 mb-8 bg-white/5 rounded-lg p-1 backdrop-blur-sm"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'current-projects', label: 'Current Projects', icon: TrendingUp },
            { id: 'completed-projects', label: 'Completed Projects', icon: CheckCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-6">
              <div 
                onClick={() => setActiveTab('users')}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Users</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{Object.values(clients || {}).length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Active Clients</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{getActiveClients().length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Current Projects</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{getCurrentProjects().length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">Pending Approvals</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').length}</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Onboarding Approval Section */}
            {onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-lg font-medium text-white">Pending Onboarding Approvals</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').map((submission) => (
                      <div key={submission.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-white">{submission.customerName}</h4>
                            <p className="text-sm text-gray-400">{submission.customerEmail}</p>
                            <p className="text-sm text-gray-400">{submission.service}</p>
                            <p className="text-xs text-gray-500">Submitted: {new Date(submission.submittedAt || submission.submittedDate).toLocaleDateString()}</p>
                          </div>
                <button
                            onClick={() => {
                              // Show detailed onboarding form review
                              setSelectedOnboardingReview(submission);
                              setShowOnboardingReviewModal(true);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-blue-500/20 rounded-md text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                </button>
              </div>
            </div>
                    ))}
          </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
              </div>
          <div className="p-6">
                <div className="space-y-4">
                  {clients.slice(0, 5).map((client) => (
                    <div key={client.id} className="flex items-center justify-between">
                        <div>
                        <p className="text-white font-medium">{client.name}</p>
                        <p className="text-sm text-gray-400">{client.service} • {client.progress}% Complete</p>
                        </div>
                        <div className="text-right">
                        <p className="text-white font-medium">{client.amount}</p>
                        <p className="text-sm text-gray-400">{client.subscriptionStatus}</p>
                          </div>
                        </div>
                  ))}
                      </div>
                                </div>
                              </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-white">Users ({getUniqueUsers().length})</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Show unique users by combining customers and users */}
                {getUniqueUsers().map((user) => (
                  <div key={user.email} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{user.name || user.firstName + ' ' + user.lastName}</h4>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-400">{user.businessName || user.customerData?.businessName || 'No business name'}</p>
                        <p className="text-xs text-gray-500">Account Type: {user.customerData?.activeProjects?.length > 0 ? 'Customer' : 'User'}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.customerData?.activeProjects?.length > 0 || user.activeProjects?.length > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.customerData?.activeProjects?.length > 0 || user.activeProjects?.length > 0 ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'current-projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-white">Current Projects ({getCurrentProjects().length})</h3>
          </div>
          <div className="p-6">
              <div className="space-y-6">
                {getCurrentProjects().map((client) => {
                  const project = client.customerData?.activeProjects?.[0];
                  const projectName = project?.name || client.service || 'Unknown Project';
                  const projectType = project?.type || 'Local SEO';
                  const startDate = project?.startDate || 'Unknown';
                  const nextUpdate = project?.nextUpdate || 'Unknown';
                  
                  return (
                    <div key={client.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-white">{client.name}</h4>
                          <p className="text-sm text-gray-400">{client.email}</p>
                          <p className="text-sm text-gray-400">{client.customerData?.business || client.business}</p>
                          <p className="text-sm font-medium text-white">{projectName} • {client.customerData?.subscriptionStatus || client.subscriptionStatus}</p>
                          {/* Account Manager Information */}
                          <div className="mt-2 p-2 bg-blue-500/10 rounded border border-blue-500/20">
                            <p className="text-xs text-blue-300 font-medium">Account Manager</p>
                            <p className="text-xs text-white">{client.accountManager?.name || 'Jacob Guyatt'}</p>
                            <p className="text-xs text-gray-400">{client.accountManager?.email || 'guyattj39@gmail.com'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-white">${project?.monthlyRate || client.customerData?.monthlyRate || 'N/A'}</p>
                          <p className="text-sm text-gray-400">{client.progress || project?.progress || 0}% Complete</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{client.progress || project?.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${client.progress || project?.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Project Details */}
                      <div className="mb-4 p-3 bg-white/5 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Project Type:</span>
                            <p className="text-white">{projectType}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Started:</span>
                            <p className="text-white">{startDate}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Next Update:</span>
                            <p className="text-white">{nextUpdate}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Status:</span>
                            <p className="text-white">{project?.status || 'Active'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openChat(client)}
                          className="inline-flex items-center px-3 py-1.5 border border-blue-500/20 rounded-md text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          General Chat
                        </button>
                        <button
                          onClick={() => {
                            const timelineSubmission = {
                              id: client.id,
                              formData: {
                                email: client.email,
                                firstName: client.name.split(' ')[0],
                                lastName: client.name.split(' ').slice(1).join(' ')
                              },
                              timelineStatus: client.customerData?.orderTimeline || {}
                            };
                            setSelectedSubmission(timelineSubmission);
                            setShowSubmissionModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Manage Timeline
                        </button>
                        <button
                          onClick={() => handleProjectCancellation(client.email, project?.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-500/20 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Cancel Project
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
          </motion.div>
        )}

        {activeTab === 'completed-projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
          >
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-white">Completed Projects ({getCompletedProjects().length})</h3>
          </div>
          <div className="p-6">
              <div className="space-y-4">
                {getCompletedProjects().map((client) => {
                  const isCancelled = client.subscriptionStatus === 'Cancelled' || 
                    client.customerData?.activeProjects?.some(project => project.status === 'Cancelled');
                  const cancelledProject = client.customerData?.activeProjects?.find(project => project.status === 'Cancelled');
                  
                  return (
                    <div key={client.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">{client.name}</h4>
                          <p className="text-sm text-gray-400">{client.email}</p>
                          <p className="text-sm text-gray-400">{client.business}</p>
                          <p className="text-sm font-medium text-white">{client.service}</p>
                          {isCancelled && cancelledProject?.cancelledDate && (
                            <p className="text-xs text-red-400">
                              Cancelled: {new Date(cancelledProject.cancelledDate).toLocaleDateString()}
                            </p>
                          )}
                </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-white">{client.amount}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            isCancelled 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {isCancelled ? 'Cancelled' : 'Completed'}
                          </span>
              </div>
                            </div>
                            </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}




      </div>

      {/* Customer Dashboard Modal */}
      {showSubmissionModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-xl bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-white">
                Manage Timeline - {selectedSubmission.formData.firstName} {selectedSubmission.formData.lastName}
              </h3>
              <button
                onClick={() => {
                  setShowSubmissionModal(false);
                  setSelectedSubmission(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
                  <div>
                <h4 className="text-md font-medium text-white mb-4">Order Timeline Steps</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'orderPlaced', title: 'Order Placed', description: 'Payment received and order confirmed' },
                      { key: 'onboardingForm', title: 'Onboarding Form', description: 'Customer has completed business information form' },
                      { key: 'orderInProgress', title: 'Order In Progress', description: 'Work has begun on the customer\'s campaign' },
                      { key: 'reviewDelivery', title: 'Review Delivery', description: 'Deliverables ready for customer review' },
                      { key: 'orderComplete', title: 'Order Complete', description: 'All work completed and delivered' }
                    ].map((step) => {
                    const stepData = selectedSubmission.timelineStatus?.[step.key] || {};
                    const isCompleted = stepData.completed || false;
                    const isInProgress = stepData.status === 'in_progress';
                      
                      return (
                      <div key={step.key} className="relative flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${
                                isCompleted ? 'bg-green-500' : 
                              isInProgress ? 'bg-yellow-500' : 'bg-gray-500'
                              }`}></span>
                            <span className="font-medium text-white">{step.title}</span>
                            </div>
                          <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                          {stepData.date && (
                              <p className="text-xs text-gray-500 mt-1">
                              {isCompleted ? 'Completed' : 'Started'}: {new Date(stepData.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {/* Success/Error Messages */}
                            {successMessages[`${selectedSubmission.formData.email}-${step.key}-completed`] && (
                              <div className="absolute -top-8 left-0 right-0 bg-green-500/20 text-green-400 text-xs p-2 rounded-md border border-green-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                {successMessages[`${selectedSubmission.formData.email}-${step.key}-completed`]}
                              </div>
                            )}
                            {errorMessages[`${selectedSubmission.formData.email}-${step.key}-completed`] && (
                              <div className="absolute -top-8 left-0 right-0 bg-red-500/20 text-red-400 text-xs p-2 rounded-md border border-red-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                {errorMessages[`${selectedSubmission.formData.email}-${step.key}-completed`]}
                              </div>
                            )}
                            
                            <button
                              onClick={() => handleTimelineStepUpdate(selectedSubmission.formData.email, step.key, 'completed')}
                              disabled={loadingStates[`${selectedSubmission.formData.email}-${step.key}-completed`]}
                              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                isCompleted 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                : 'bg-white/5 text-white border-white/20 hover:bg-green-500/20 hover:border-green-500/30'
                              } ${loadingStates[`${selectedSubmission.formData.email}-${step.key}-completed`] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {loadingStates[`${selectedSubmission.formData.email}-${step.key}-completed`] ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                                  Updating...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {isCompleted ? 'Completed' : 'Mark Complete'}
                                </>
                              )}
                            </button>
                            
                            {!isCompleted && (
                              <>
                                {successMessages[`${selectedSubmission.formData.email}-${step.key}-in_progress`] && (
                                  <div className="absolute -top-8 left-0 right-0 bg-green-500/20 text-green-400 text-xs p-2 rounded-md border border-green-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                    {successMessages[`${selectedSubmission.formData.email}-${step.key}-in_progress`]}
                                  </div>
                                )}
                                {errorMessages[`${selectedSubmission.formData.email}-${step.key}-in_progress`] && (
                                  <div className="absolute -top-8 left-0 right-0 bg-red-500/20 text-red-400 text-xs p-2 rounded-md border border-red-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                    {errorMessages[`${selectedSubmission.formData.email}-${step.key}-in_progress`]}
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => handleTimelineStepUpdate(selectedSubmission.formData.email, step.key, 'in_progress')}
                                  disabled={loadingStates[`${selectedSubmission.formData.email}-${step.key}-in_progress`]}
                                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                    isInProgress 
                                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                                    : 'bg-white/5 text-white border-white/20 hover:bg-yellow-500/20 hover:border-yellow-500/30'
                                  } ${loadingStates[`${selectedSubmission.formData.email}-${step.key}-in_progress`] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {loadingStates[`${selectedSubmission.formData.email}-${step.key}-in_progress`] ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                                      Updating...
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-4 h-4 mr-1" />
                                      {isInProgress ? 'In Progress' : 'Mark In Progress'}
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                            
                            {(isCompleted || isInProgress) && (
                              <>
                                {successMessages[`${selectedSubmission.formData.email}-${step.key}-pending`] && (
                                  <div className="absolute -top-8 left-0 right-0 bg-green-500/20 text-green-400 text-xs p-2 rounded-md border border-green-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                    {successMessages[`${selectedSubmission.formData.email}-${step.key}-pending`]}
                                  </div>
                                )}
                                {errorMessages[`${selectedSubmission.formData.email}-${step.key}-pending`] && (
                                  <div className="absolute -top-8 left-0 right-0 bg-red-500/20 text-red-400 text-xs p-2 rounded-md border border-red-500/30 animate-in slide-in-from-top-2 duration-300 z-10">
                                    {errorMessages[`${selectedSubmission.formData.email}-${step.key}-pending`]}
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => handleTimelineStepUpdate(selectedSubmission.formData.email, step.key, 'pending')}
                                  disabled={loadingStates[`${selectedSubmission.formData.email}-${step.key}-pending`]}
                                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border bg-white/5 text-red-400 border-red-500/30 hover:bg-red-500/20 transition-colors ${
                                    loadingStates[`${selectedSubmission.formData.email}-${step.key}-pending`] ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {loadingStates[`${selectedSubmission.formData.email}-${step.key}-pending`] ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                                      Updating...
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Reset
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onboarding Review Modal */}
        {showOnboardingReviewModal && selectedOnboardingReview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-xl border border-white/10 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Onboarding Form Review</h3>
                <button
                  onClick={() => {
                    setShowOnboardingReviewModal(false);
                    setSelectedOnboardingReview(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-md font-medium text-white mb-4">Customer Information</h4>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Name</p>
                        <p className="text-sm text-white">{selectedOnboardingReview.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Email</p>
                        <p className="text-sm text-white">{selectedOnboardingReview.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Service</p>
                        <p className="text-sm text-white">{selectedOnboardingReview.service}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedOnboardingReview.status === 'pending_approval' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : selectedOnboardingReview.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedOnboardingReview.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Submitted</p>
                        <p className="text-sm text-white">{new Date(selectedOnboardingReview.submittedAt || selectedOnboardingReview.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Data */}
                <div>
                  <h4 className="text-md font-medium text-white mb-4">Form Data</h4>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="space-y-4">
                      {Object.entries(selectedOnboardingReview.formData || {}).map(([key, value]) => (
                        <div key={key} className="border-b border-white/10 pb-3 last:border-b-0">
                          <p className="text-sm font-medium text-gray-400 capitalize mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm text-white break-words">{value || 'Not provided'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowOnboardingReviewModal(false);
                      setSelectedOnboardingReview(null);
                    }}
                    className="px-4 py-2 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to timeline management for this customer
                      const customer = clients.find(c => c.email === selectedOnboardingReview.customerEmail);
                      if (customer) {
                        const timelineSubmission = {
                          id: customer.id,
                          formData: {
                            email: customer.email,
                            firstName: customer.name.split(' ')[0],
                            lastName: customer.name.split(' ').slice(1).join(' ')
                          },
                          timelineStatus: customer.customerData?.orderTimeline || {}
                        };
                        setSelectedSubmission(timelineSubmission);
                        setShowSubmissionModal(true);
                        setShowOnboardingReviewModal(false);
                        setSelectedOnboardingReview(null);
                      }
                    }}
                    className="px-4 py-2 border border-blue-500/20 rounded-md text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-1 inline" />
                    Manage Timeline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      {/* Chat Modal */}
      {showChatModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-white">Chat with {selectedCustomer.name}</h3>
                <p className="text-sm text-gray-400">
                  {currentProjectId 
                    ? `${selectedCustomer.email} - Project: ${selectedCustomer.customerData?.activeProjects?.find(p => p.id === currentProjectId)?.name || 'Unknown Project'}`
                    : selectedCustomer.email
                  }
                </p>
              </div>
              <button
                onClick={() => {
                  setShowChatModal(false);
                  setSelectedCustomer(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {chatLoading ? (
                <div className="text-center text-gray-400 py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p>Loading messages...</p>
                </div>
              ) : (() => {
                const chatKey = currentProjectId ? `${selectedCustomer.email}_${currentProjectId}` : selectedCustomer.email;
                const messages = chatMessages[chatKey] || [];
                
                return messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'admin'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                );
              })()}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(selectedCustomer.email, newMessage, currentProjectId);
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => sendMessage(selectedCustomer.email, newMessage, currentProjectId)}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 