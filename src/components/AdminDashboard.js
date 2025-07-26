import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, AlertCircle, RefreshCw, LogOut, 
  Eye, XCircle, CheckCircle, Clock, BarChart3, Settings,
  TrendingUp
} from 'lucide-react';
import adminAuth from '../utils/adminAuth';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [onboardingSubmissions, setOnboardingSubmissions] = useState([]);
  const [selectedOnboarding, setSelectedOnboarding] = useState(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [onboardingNotes, setOnboardingNotes] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const session = adminAuth.initSession();
    if (!session.success) {
      window.location.href = '/admin-login';
      return;
    }

    loadAllData();

    const handleStorageChange = () => {
      console.log('🔄 Storage changed, refreshing admin dashboard...');
      loadAllData();
    };

    const handleCustomerAdded = (event) => {
      console.log('🆕 New customer added, refreshing admin dashboard...', event.detail);
      loadAllData();
    };

    const handleOnboardingSubmitted = (event) => {
      console.log('📋 New onboarding submission, refreshing admin dashboard...', event.detail);
      loadAllData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('customerAdded', handleCustomerAdded);
    window.addEventListener('onboardingSubmitted', handleOnboardingSubmitted);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customerAdded', handleCustomerAdded);
      window.removeEventListener('onboardingSubmitted', handleOnboardingSubmitted);
    };
  }, []);

  const loadAllData = async () => {
    try {
      console.log('🔄 Loading all data from backend...');
      
      // ALWAYS sync with backend first
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://rankly360.up.railway.app/api/all-customers', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend sync successful');
        
        if (data.success) {
          // Convert backend customers to frontend format
          const backendCustomers = Object.values(data.customers || {}).map(customer => ({
            id: customer.email,
            name: customer.name,
            email: customer.email,
            business: customer.business,
            service: customer.package,
            amount: customer.monthlyRate ? `$${customer.monthlyRate}` : '$249',
            progress: customer.activeProjects?.[0]?.progress || 20,
            subscriptionStatus: customer.subscriptionStatus || 'Active',
            customerData: customer,
            activeProjects: customer.activeProjects || []
          }));
          
          setClients(backendCustomers);
          setUsers(data.users || {});
          setOnboardingSubmissions(data.onboardingSubmissions || []);
          
          console.log(`📊 Loaded ${backendCustomers.length} customers from backend`);
          console.log(`📊 Loaded ${Object.keys(data.users || {}).length} users from backend`);
          console.log(`📊 Loaded ${(data.onboardingSubmissions || []).length} onboarding submissions from backend`);
        } else {
          console.error('❌ Backend sync failed:', data.error);
        }
      } else {
        console.error('❌ Backend sync failed:', response.status);
      }
      
    } catch (error) {
      console.error('❌ Error loading data:', error);
      if (error.name === 'AbortError') {
        console.error('❌ Request timed out');
      }
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
      client.progress > 0 && 
      client.progress < 100 && 
      client.subscriptionStatus !== 'Cancelled' &&
      !client.customerData?.activeProjects?.some(project => project.status === 'Cancelled')
    );
  };

  const getCompletedProjects = () => {
    return clients.filter(client => 
      client.progress === 100 || 
      client.customerData?.activeProjects?.some(project => project.status === 'Cancelled') ||
      client.subscriptionStatus === 'Cancelled'
    );
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

  const handleOnboardingAction = async (submissionId, action) => {
    try {
      const session = adminAuth.initSession();
      const adminEmail = session.data?.email || 'admin@rankly360.com';
      
      const submissions = JSON.parse(localStorage.getItem('onboarding-submissions') || '[]');
      const submission = submissions.find(s => s.id === submissionId);
      
      if (!submission) {
        alert('Onboarding submission not found!');
        return;
      }
      
      const updatedSubmissions = submissions.map(s => {
        if (s.id === submissionId) {
          return {
            ...s,
            status: action === 'approve' ? 'approved' : 'rejected',
            adminNotes: onboardingNotes,
            processedDate: new Date().toISOString(),
            processedBy: adminEmail
          };
        }
        return s;
      });
      
      localStorage.setItem('onboarding-submissions', JSON.stringify(updatedSubmissions));
      
      if (action === 'approve') {
        updateCustomerTimelineStep(submission.customerEmail, 'onboardingForm', 'completed');
        updateCustomerTimelineStep(submission.customerEmail, 'orderInProgress', 'in_progress');
      } else {
        updateCustomerTimelineStep(submission.customerEmail, 'onboardingForm', 'pending');
      }
      
      // Update onboarding submissions state immediately
      setOnboardingSubmissions(updatedSubmissions);
      
      setShowOnboardingModal(false);
      setSelectedOnboarding(null);
      setOnboardingNotes('');
      
      // Refresh admin dashboard data in background
      setTimeout(() => {
        loadAllData();
      }, 100);
      
      const actionText = action === 'approve' ? 'approved' : 'rejected';
      alert(`✅ Onboarding ${actionText} successfully!\n\nCustomer: ${submission.customerEmail}\nAction: ${actionText.toUpperCase()}`);
    } catch (error) {
      console.error('Error processing onboarding action:', error);
      alert('Error processing onboarding action. Please try again.');
    }
  };

  const updateCustomerTimelineStep = (customerEmail, stepName, action) => {
    try {
      let customerData = null;
      let storageKey = null;
      
      const possibleKeys = ['customerData', 'billy-customer-data'];
      for (const key of possibleKeys) {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data && data.email === customerEmail) {
          customerData = data;
          storageKey = key;
          break;
        }
      }
      
      if (!customerData) {
        const localStorageKeys = Object.keys(localStorage);
        for (const key of localStorageKeys) {
          if (key.includes('customer')) {
            try {
              const data = JSON.parse(localStorage.getItem(key));
              if (data && data.email === customerEmail) {
                customerData = data;
                storageKey = key;
                break;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
      
      if (!customerData) {
        console.error('Customer not found for timeline update:', customerEmail);
        return;
      }
      
      // Update timeline
      const updatedTimeline = {
        ...customerData.orderTimeline,
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
        ...customerData,
        orderTimeline: updatedTimeline,
        recentActivity: [
          {
            type: 'timeline_update',
            message: `${stepName.replace(/([A-Z])/g, ' $1').trim()} ${action === 'completed' ? 'completed' : action === 'in_progress' ? 'started' : 'reset'}`,
            date: new Date().toISOString().split('T')[0]
          },
          ...customerData.recentActivity
        ]
      };
      
      // Update progress in active projects
      if (updatedCustomerData.activeProjects && updatedCustomerData.activeProjects.length > 0) {
        updatedCustomerData.activeProjects[0].progress = newProgress;
        updatedCustomerData.activeProjects[0].currentPhase = action === 'completed' ? 
          stepName === 'orderComplete' ? 'Completed' : 'Next Phase' : 
          action === 'in_progress' ? 'In Progress' : 'Pending';
      }
      
      // Save updated data
      localStorage.setItem(storageKey, JSON.stringify(updatedCustomerData));
      
      // Dispatch event to notify customer dashboard
      window.dispatchEvent(new CustomEvent('timelineUpdated', { 
        detail: { customerEmail, updatedData: updatedCustomerData } 
      }));
      
      console.log(`✅ Timeline updated for ${customerEmail}: ${stepName} -> ${action} (Progress: ${newProgress}%)`);
      
    } catch (error) {
      console.error('Error updating timeline:', error);
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
          className="flex space-x-1 mb-8 bg-white/5 rounded-lg p-1 backdrop-blur-sm"
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
              className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div 
                onClick={() => setActiveTab('users')}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Users</p>
                    <p className="text-2xl font-bold text-white">{Object.values(users || {}).length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Active Clients</p>
                    <p className="text-2xl font-bold text-white">{getActiveClients().length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Current Projects</p>
                    <p className="text-2xl font-bold text-white">{getCurrentProjects().length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-8 w-8 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
                    <p className="text-2xl font-bold text-white">{onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').length}</p>
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
                              setSelectedOnboarding(submission);
                              setShowOnboardingModal(true);
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
              <h3 className="text-lg font-medium text-white">Users ({Object.values(users || {}).length + clients.length})</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Show all users from users object */}
                {Object.values(users || {}).map((user) => (
                  <div key={user.email} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{user.name || user.firstName + ' ' + user.lastName}</h4>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-400">{user.businessName || 'No business name'}</p>
                        <p className="text-xs text-gray-500">Account Type: User</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show all customers from clients object */}
                {clients.map((client) => (
                  <div key={client.email} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{client.name}</h4>
                        <p className="text-sm text-gray-400">{client.email}</p>
                        <p className="text-sm text-gray-400">{client.business}</p>
                        <p className="text-xs text-gray-500">
                          Projects: {client.activeProjects?.length || 0} • 
                          Status: {client.subscriptionStatus}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.activeProjects?.length > 0 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {client.activeProjects?.length > 0 ? 'Has Projects' : 'No Projects'}
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
                {getCurrentProjects().map((client) => (
                  <div key={client.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-white">{client.name}</h4>
                        <p className="text-sm text-gray-400">{client.email}</p>
                        <p className="text-sm text-gray-400">{client.business}</p>
                        <p className="text-sm font-medium text-white">{client.service} • {client.subscriptionStatus}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-white">{client.amount}</p>
                        <p className="text-sm text-gray-400">{client.progress}% Complete</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{client.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${client.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          // View dashboard functionality - could be expanded later
                          console.log('View dashboard for:', client.name);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Dashboard
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
                        onClick={() => handleProjectCancellation(client.email, client.customerData?.activeProjects?.[0]?.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-500/20 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel Project
                      </button>
                    </div>
                  </div>
                ))}
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
                      <div key={step.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
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
                          <button
                            onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'completed')}
                            className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                              isCompleted 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                : 'bg-white/5 text-white border-white/20 hover:bg-green-500/20 hover:border-green-500/30'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                          </button>
                          {!isCompleted && (
                            <button
                              onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'in_progress')}
                              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                isInProgress 
                                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' 
                                  : 'bg-white/5 text-white border-white/20 hover:bg-yellow-500/20 hover:border-yellow-500/30'
                              }`}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              {isInProgress ? 'In Progress' : 'Mark In Progress'}
                            </button>
                          )}
                          {(isCompleted || isInProgress) && (
                            <button
                              onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'pending')}
                              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border bg-white/5 text-red-400 border-red-500/30 hover:bg-red-500/20 transition-colors"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reset
                            </button>
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
        {showOnboardingModal && selectedOnboarding && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-xl bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-white">
                  Review Onboarding - {selectedOnboarding.customerName}
                </h3>
                <button
                  onClick={() => {
                    setShowOnboardingModal(false);
                    setSelectedOnboarding(null);
                    setOnboardingNotes('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-md font-medium text-white mb-4">Customer Information</h4>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-400">Name</p>
                        <p className="text-sm text-white">{selectedOnboarding.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Email</p>
                        <p className="text-sm text-white">{selectedOnboarding.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Service</p>
                        <p className="text-sm text-white">{selectedOnboarding.service}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-400">Submitted</p>
                        <p className="text-sm text-white">{new Date(selectedOnboarding.submittedAt || selectedOnboarding.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Data */}
                <div>
                  <h4 className="text-md font-medium text-white mb-4">Form Data</h4>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="space-y-3">
                      {Object.entries(selectedOnboarding.formData || {}).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-sm font-medium text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-sm text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <h4 className="text-md font-medium text-white mb-4">Admin Notes (Optional)</h4>
                  <textarea
                    value={onboardingNotes}
                    onChange={(e) => setOnboardingNotes(e.target.value)}
                    placeholder="Add any notes about this submission..."
                    className="w-full p-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/5 text-white placeholder-gray-400"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowOnboardingModal(false);
                      setSelectedOnboarding(null);
                      setOnboardingNotes('');
                    }}
                    className="px-4 py-2 border border-white/20 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleOnboardingAction(selectedOnboarding.id, 'reject')}
                    className="px-4 py-2 border border-red-500/20 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <XCircle className="w-4 h-4 mr-1 inline" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleOnboardingAction(selectedOnboarding.id, 'approve')}
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-1 inline" />
                    Approve
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