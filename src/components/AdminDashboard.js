import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, DollarSign, AlertCircle, RefreshCw, LogOut, 
  Eye, Edit, XCircle, CheckCircle, Clock 
} from 'lucide-react';
import adminAuth from '../utils/adminAuth';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [onboardingSubmissions, setOnboardingSubmissions] = useState([]);
  const [selectedOnboarding, setSelectedOnboarding] = useState(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [onboardingNotes, setOnboardingNotes] = useState('');
  const [customerViewData, setCustomerViewData] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
      console.log('📦 Customer data:', event.detail.customerData);
      loadAllData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('customerAdded', handleCustomerAdded);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customerAdded', handleCustomerAdded);
    };
  }, []);

  const loadAllData = async () => {
    try {
      console.log('🔄 Loading all admin dashboard data...');
      
      // Try to sync with backend first
      try {
        const response = await fetch('https://rankly360.up.railway.app/api/all-customers');
        const backendData = await response.json();
        
        if (backendData.success) {
          console.log('🔄 Synced with backend:', backendData);
          
          // Update local storage with backend data
          if (backendData.customers) {
            Object.entries(backendData.customers).forEach(([key, data]) => {
              localStorage.setItem(key, JSON.stringify(data));
            });
          }
          
          if (backendData.users) {
            localStorage.setItem('users', JSON.stringify(backendData.users));
          }
          
          if (backendData.onboardingSubmissions) {
            localStorage.setItem('onboarding-submissions', JSON.stringify(backendData.onboardingSubmissions));
          }
        }
      } catch (error) {
        console.error('Failed to sync with backend:', error);
      }
      
      const submissionsData = JSON.parse(localStorage.getItem('form-submissions') || '[]');
      setSubmissions(submissionsData);

      const onboardingData = JSON.parse(localStorage.getItem('onboarding-submissions') || '[]');
      console.log('📋 Loaded onboarding submissions:', onboardingData.length);
      setOnboardingSubmissions(onboardingData);

      // Load users from localStorage
      const usersData = JSON.parse(localStorage.getItem('users') || '{}');
      const usersArray = Object.values(usersData).filter(user => user && user.email);
      setUsers(usersArray);
      console.log('👥 Loaded users:', usersArray.length);

      const allClients = [];
      
      // First, check all localStorage keys for customer data
      const localStorageKeys = Object.keys(localStorage);
      const customerKeys = localStorageKeys.filter(key => 
        key.includes('customer') || key === 'billy-customer-data'
      );
      
      console.log('🔍 Found customer keys:', customerKeys);
      
      for (const key of customerKeys) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data && data.email && !allClients.find(c => c.email === data.email)) {
            console.log('📊 Loading customer data from key:', key, data.email);
            allClients.push({
              id: data.email,
              name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
              email: data.email,
              business: data.businessName || data.business || 'Unknown',
              service: data.activeProjects?.[0]?.name || 'Local SEO Service',
              amount: data.activeProjects?.[0]?.amount || data.activeProjects?.[0]?.monthlyRate || '$249',
              subscriptionStatus: data.subscriptionStatus || 'Active',
              customerData: data,
              progress: (() => {
                // Calculate progress based on timeline completion
                const timelineSteps = ['orderPlaced', 'onboardingForm', 'orderInProgress', 'reviewDelivery', 'orderComplete'];
                const completedSteps = timelineSteps.filter(step => 
                  data.orderTimeline?.[step]?.completed || data.orderTimeline?.[step]?.status === 'completed'
                ).length;
                return Math.round((completedSteps / timelineSteps.length) * 100);
              })()
            });
          }
        } catch (e) {
          console.error('Error parsing localStorage key:', key, e);
        }
      }

      // Additional check for any other customer data keys we might have missed
      for (const key of localStorageKeys) {
        if (key.includes('customer') && !customerKeys.includes(key)) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.email && !allClients.find(c => c.email === data.email)) {
              console.log('📊 Loading additional customer data from key:', key, data.email);
              allClients.push({
                id: data.email,
                name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
                email: data.email,
                business: data.businessName || data.business || 'Unknown',
                service: data.activeProjects?.[0]?.name || 'Local SEO Service',
                amount: data.activeProjects?.[0]?.amount || data.activeProjects?.[0]?.monthlyRate || '$249',
                subscriptionStatus: data.subscriptionStatus || 'Active',
                customerData: data,
                progress: (() => {
                  // Calculate progress based on timeline completion
                  const timelineSteps = ['orderPlaced', 'onboardingForm', 'orderInProgress', 'reviewDelivery', 'orderComplete'];
                  const completedSteps = timelineSteps.filter(step => 
                    data.orderTimeline?.[step]?.completed || data.orderTimeline?.[step]?.status === 'completed'
                  ).length;
                  return Math.round((completedSteps / timelineSteps.length) * 100);
                })()
              });
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }

      setClients(allClients);
      console.log(`✅ Admin dashboard loaded ${allClients.length} clients:`, allClients.map(c => ({ name: c.name, email: c.email })));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  // Helper functions to categorize clients and users
  const getActiveUsers = () => {
    return users.filter(user => !user.isAdmin);
  };

  const getActiveClients = () => {
    return clients.filter(client => 
      client.customerData?.activeProjects?.some(project => 
        project.status === 'Active' || project.status === 'In Progress'
      )
    );
  };

  const getCurrentProjects = () => {
    return clients.filter(client => 
      client.customerData?.activeProjects?.some(project => 
        project.status === 'Active' || project.status === 'In Progress'
      )
    );
  };

  const getCompletedProjects = () => {
    return clients.filter(client => 
      client.customerData?.activeProjects?.some(project => 
        project.status === 'Completed' || project.status === 'Cancelled'
      )
    );
  };

  const getTotalUniqueUsers = () => {
    // Get all unique emails from both users and clients
    const userEmails = new Set(users.map(user => user.email.toLowerCase()));
    const clientEmails = new Set(clients.map(client => client.email.toLowerCase()));
    
    // Combine all unique emails
    const allEmails = new Set([...userEmails, ...clientEmails]);
    
    return allEmails.size;
  };

  const handleLogout = () => {
    adminAuth.logout();
    window.location.href = '/admin-login';
  };

  const handleRefresh = () => {
    loadAllData();
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
      
      console.log('🔄 Timeline Update Debug:');
      console.log('Step being updated:', stepName);
      console.log('Action:', action);
      console.log('Completed steps:', completedSteps);
      console.log('Total steps:', timelineSteps.length);
      console.log('New progress:', newProgress);
      console.log('Updated timeline:', updatedTimeline);
      
      // Update project status and progress
      const updatedProjects = customerData.activeProjects?.map(project => {
        let newStatus = project.status;
        let newPhase = project.currentPhase;
        let newMilestone = project.nextMilestone;
        
        // Update status based on timeline
        if (action === 'completed') {
          if (stepName === 'orderPlaced') {
            newPhase = 'Order Placed';
            newMilestone = 'Onboarding Form';
          } else if (stepName === 'onboardingForm') {
            newPhase = 'Onboarding Form';
            newMilestone = 'Order In Progress';
          } else if (stepName === 'orderInProgress') {
            newPhase = 'Order In Progress';
            newMilestone = 'Review Delivery';
          } else if (stepName === 'reviewDelivery') {
            newPhase = 'Review Delivery';
            newMilestone = 'Order Complete';
          } else if (stepName === 'orderComplete') {
            newPhase = 'Order Complete';
            newMilestone = 'Project Complete';
            newStatus = 'Completed';
          }
        }
        
        return {
          ...project,
          progress: newProgress,
          currentPhase: newPhase,
          nextMilestone: newMilestone,
          status: newStatus
        };
      }) || [];
      
      // Add activity to recent activity
      const activityMessage = action === 'completed' 
        ? `Step "${stepName}" marked as complete`
        : action === 'in_progress'
        ? `Step "${stepName}" started`
        : `Step "${stepName}" reset`;
      
      const updatedCustomerData = {
        ...customerData,
        orderTimeline: updatedTimeline,
        activeProjects: updatedProjects,
        recentActivity: [
        {
          type: 'timeline_update',
            message: activityMessage,
            date: new Date().toISOString().split('T')[0],
            step: stepName,
            action: action
          },
          ...(customerData.recentActivity || [])
        ]
      };
      
      localStorage.setItem(storageKey, JSON.stringify(updatedCustomerData));
      console.log('Timeline updated for:', customerEmail, stepName, action);
      console.log('New progress:', newProgress);
      console.log('Updated customer data:', updatedCustomerData);
      
      // Dispatch custom event to notify customer dashboard
      window.dispatchEvent(new CustomEvent('timelineUpdated', {
        detail: {
          customerEmail,
          stepName,
          action,
          newProgress
        }
      }));
      
      // Update the clients state immediately for instant feedback
      setClients(prevClients => {
        return prevClients.map(client => {
          if (client.email === customerEmail) {
            return {
              ...client,
              customerData: updatedCustomerData,
              progress: newProgress
            };
          }
          return client;
        });
      });
      
      // Force immediate refresh of admin dashboard data
      loadAllData();
      
      // Show success message with more details
      const stepDisplayNames = {
        'orderPlaced': 'Order Placed',
        'onboardingForm': 'Onboarding Form',
        'orderInProgress': 'Order In Progress',
        'reviewDelivery': 'Review Delivery',
        'orderComplete': 'Order Complete'
      };
      
      const actionText = action === 'completed' ? 'completed' : action === 'in_progress' ? 'started' : 'reset';
      const displayStepName = stepDisplayNames[stepName] || stepName;
      
      alert(`✅ Timeline step "${displayStepName}" ${actionText} successfully!\n\nProgress: ${newProgress}%\nCustomer: ${customerEmail}`);
    } catch (error) {
      console.error('Error updating customer timeline:', error);
      alert('Error updating timeline. Please try again.');
    }
  };

  const handleProjectCancellation = (customerEmail, projectId) => {
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
        alert('Customer not found!');
        return;
      }
      
      const updatedProjects = customerData.activeProjects.map(project => {
        if (project.id === projectId || projectId === 'all') {
          return {
            ...project,
            status: 'Cancelled',
            cancelledDate: new Date().toISOString().split('T')[0],
            cancelledBy: 'Admin'
          };
        }
        return project;
      });
      
      const updatedCustomerData = {
        ...customerData,
        activeProjects: updatedProjects,
        recentActivity: [
          {
            type: 'project_cancelled',
            message: `Project cancelled by admin`,
            date: new Date().toISOString().split('T')[0]
          },
          ...(customerData.recentActivity || [])
        ]
      };
      
      localStorage.setItem(storageKey, JSON.stringify(updatedCustomerData));
      
      // Update the clients state immediately for instant feedback
      setClients(prevClients => {
        return prevClients.map(client => {
          if (client.email === customerEmail) {
            return {
              ...client,
              customerData: updatedCustomerData
            };
          }
          return client;
        });
      });
      
      // Refresh admin dashboard data in background
      setTimeout(() => {
        loadAllData();
      }, 100);
      
      alert(`✅ Project cancelled successfully!\n\nCustomer: ${customerEmail}\nStatus: Cancelled`);
    } catch (error) {
      console.error('Error cancelling project:', error);
      alert('Error cancelling project. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
        
        <nav className="mt-6">
          <div className="px-4 space-y-2">
              <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Overview
              </button>
            
              <button 
              onClick={() => setActiveTab('active-users')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'active-users'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CheckCircle className="w-5 h-5 mr-3" />
              Active Users ({getActiveUsers().length})
            </button>
            
            <button
              onClick={() => setActiveTab('current-projects')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'current-projects'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock className="w-5 h-5 mr-3" />
              Current Projects ({getCurrentProjects().length})
            </button>
            
            <button
              onClick={() => setActiveTab('completed-projects')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'completed-projects'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              Completed Projects ({getCompletedProjects().length})
            </button>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
              </button>
              <button
                onClick={handleLogout}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
              <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="bg-white shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'active-users' && 'Active Users'}
              {activeTab === 'current-projects' && 'Current Projects'}
              {activeTab === 'completed-projects' && 'Completed Projects'}
            </h2>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Dashboard
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                      <Users className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                        <dd className="text-lg font-medium text-gray-900">{getTotalUniqueUsers()}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Form Submissions</dt>
                        <dd className="text-lg font-medium text-gray-900">{submissions.length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                      <DollarSign className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                        <dd className="text-lg font-medium text-gray-900">{getActiveClients().length}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                      <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                        <dd className="text-lg font-medium text-gray-900">{onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

              {/* Onboarding Approval Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Onboarding Approval</h3>
                  <button
                    onClick={() => {
                      console.log('🔄 Manually refreshing onboarding submissions...');
                      loadAllData();
                    }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </button>
          </div>
          <div className="p-6">
                  {onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').length > 0 ? (
                    <div className="space-y-4">
                      {onboardingSubmissions.filter(s => s.status === 'pending' || s.status === 'pending_approval').map((submission) => (
                        <div key={submission.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                        <div>
                              <h4 className="font-medium text-gray-900">{submission.customerName}</h4>
                              <p className="text-sm text-gray-600">{submission.customerEmail}</p>
                              <p className="text-sm text-gray-600">{submission.service}</p>
                              <p className="text-xs text-gray-500">Submitted: {new Date(submission.submittedAt || submission.submittedDate).toLocaleDateString()}</p>
                              </div>
                              <button
                                onClick={() => {
                                setSelectedOnboarding(submission);
                                setShowOnboardingModal(true);
                              }}
                              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                              Review
                              </button>
                            </div>
                          </div>
                        ))}
              </div>
            ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No pending onboarding submissions</p>
                      <p className="text-sm text-gray-400">Total submissions: {onboardingSubmissions.length}</p>
                      <p className="text-sm text-gray-400">Statuses: {onboardingSubmissions.map(s => s.status).join(', ') || 'None'}</p>
                    </div>
            )}
          </div>
        </div>

        {/* Order Timeline Overview */}
              <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Order Timeline Overview</h3>
          </div>
          <div className="p-6">
                  {clients.length > 0 ? (
                    <div className="space-y-6">
                      {clients.map((client) => (
                        <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                        <div>
                              <h4 className="font-medium text-gray-900">{client.name}</h4>
                          <p className="text-sm text-gray-600">{client.email}</p>
                              <p className="text-sm text-gray-600">{client.business}</p>
                              <p className="text-sm font-medium text-gray-900">{client.service} • {client.subscriptionStatus}</p>
                        </div>
                        <div className="text-right">
                              <p className="text-lg font-medium text-gray-900">{client.amount}</p>
                              <p className="text-sm text-gray-600">{client.progress}% Complete</p>
                        </div>
                      </div>
                      
                        <div className="mb-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                              <span>{client.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${client.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      
                          <div className="flex space-x-2">
                        <button
                              onClick={() => setCustomerViewData(client.customerData || client)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
                                    firstName: client.name.split(' ')[0] || client.name,
                                    lastName: client.name.split(' ').slice(1).join(' ') || '',
                                    businessName: client.business
                                  },
                                  service: client.service,
                                  amount: client.amount,
                                  timelineStatus: client.customerData?.orderTimeline || null
                                };
                                setSelectedSubmission(timelineSubmission);
                              setShowSubmissionModal(true);
                          }}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Manage Timeline
                        </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to cancel the project for ${client.name}?`)) {
                                  handleProjectCancellation(client.email, 'all');
                                }
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel Project
                            </button>
                      </div>

                          {/* Customer Projects */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h5 className="text-sm font-medium text-gray-900 mb-2">Customer Projects</h5>
                            {client.customerData?.activeProjects?.map((project, index) => (
                              <div key={index} className="bg-white rounded p-3 mb-2">
                                <div className="flex items-center justify-between mb-2">
                                  <h6 className="font-medium text-gray-900">{project.name}</h6>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    project.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    project.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                    project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {project.status}
                                  </span>
                    </div>
                                <p className="text-xs text-gray-600">{project.type}</p>
                                <p className="text-xs text-gray-600">Started: {project.startDate}</p>
                                <p className="text-xs text-gray-600">Duration: {project.estimatedDuration}</p>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
              </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div 
                                      className="bg-blue-600 h-1 rounded-full" 
                                      style={{ width: `${project.progress}%` }}
                                    ></div>
          </div>
        </div>
          </div>
                            ))}
                </div>
              </div>
                      ))}
                            </div>
                          ) : (
                    <p className="text-gray-500">No clients found</p>
                  )}
                </div>
              </div>
                            </div>
                          )}

          {activeTab === 'active-clients' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Active Clients</h3>
                        </div>
              <div className="p-6">
                {getActiveClients().length > 0 ? (
                  <div className="space-y-4">
                    {getActiveClients().map((client) => (
                      <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{client.name}</h4>
                        <p className="text-sm text-gray-600">{client.email}</p>
                            <p className="text-sm text-gray-600">{client.service}</p>
                            <p className="text-sm font-medium text-green-600">Active</p>
                      </div>
                      <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">{client.amount}</p>
                            <p className="text-sm text-gray-600">{client.progress}% Complete</p>
                        </div>
                      </div>
                    </div>
                              ))}
                            </div>
                ) : (
                  <p className="text-gray-500">No active clients</p>
                )}
                          </div>
                            </div>
          )}

          {activeTab === 'active-users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
                          </div>
              <div className="p-6">
                {getActiveUsers().length > 0 ? (
                  <div className="space-y-4">
                    {getActiveUsers().map((user) => (
                      <div key={user.email} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-600">{user.businessName}</p>
                            <p className="text-xs text-gray-500">
                              Account Created: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                            {user.activeClients > 0 && (
                              <p className="text-xs text-blue-600">
                                Active Clients: {user.activeClients}
                              </p>
                            )}
                            {user.websiteUrl && (
                              <p className="text-xs text-gray-500">
                                Website: {user.websiteUrl}
                              </p>
                            )}
                        </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active Account
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {user.emailVerified ? 'Email Verified' : 'Email Pending'}
                            </p>
                      </div>
                        </div>
                  </div>
                ))}
              </div>
                ) : (
                  <p className="text-gray-500">No active users found</p>
            )}
          </div>
        </div>
          )}

          {activeTab === 'current-projects' && (
            <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Current Projects</h3>
              </div>
              <div className="p-6">
                {getCurrentProjects().length > 0 ? (
                  <div className="space-y-4">
                    {getCurrentProjects().map((client) => (
                      <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{client.name}</h4>
                            <p className="text-sm text-gray-600">{client.email}</p>
                            <p className="text-sm text-gray-600">{client.service}</p>
                            <p className="text-sm font-medium text-blue-600">In Progress</p>
            </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">{client.amount}</p>
                            <p className="text-sm text-gray-600">{client.progress}% Complete</p>
          </div>
              </div>
                      </div>
                    ))}
            </div>
          ) : (
                  <p className="text-gray-500">No current projects</p>
                )}
                      </div>
                    </div>
          )}

          {activeTab === 'completed-projects' && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Completed Projects</h3>
                        </div>
              <div className="p-6">
                {getCompletedProjects().length > 0 ? (
                  <div className="space-y-4">
                    {getCompletedProjects().map((client) => (
                      <div key={client.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{client.name}</h4>
                            <p className="text-sm text-gray-600">{client.email}</p>
                            <p className="text-sm text-gray-600">{client.service}</p>
                            {client.customerData?.activeProjects?.map((project, index) => (
                              <div key={index}>
                                <p className={`text-sm font-medium ${
                                  project.status === 'Completed' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {project.status}
                                </p>
                                {project.status === 'Cancelled' && project.cancelledDate && (
                                  <p className="text-xs text-gray-500">
                                    Cancelled: {new Date(project.cancelledDate).toLocaleDateString()}
                                  </p>
                                )}
                                {project.status === 'Completed' && (
                                  <p className="text-xs text-gray-500">
                                    Completed: {new Date(project.startDate).toLocaleDateString()}
                                  </p>
                                )}
                      </div>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">{client.amount}</p>
                            <p className="text-sm text-gray-600">100% Complete</p>
                          </div>
                  </div>
                </div>
              ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No completed projects</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Dashboard Modal */}
      {customerViewData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                {customerViewData.name}'s Dashboard
              </h3>
              <button
                onClick={() => setCustomerViewData(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
                  <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{customerViewData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{customerViewData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Business</p>
                    <p className="font-medium">{customerViewData.businessName || customerViewData.business}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium">{customerViewData.subscriptionStatus || 'Active'}</p>
                  </div>
                  </div>
                  </div>

                  <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Active Projects</h4>
                {customerViewData.activeProjects?.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{project.name}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Active' ? 'bg-green-100 text-green-800' :
                        project.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                  </div>
                    <p className="text-sm text-gray-600 mb-2">{project.type}</p>
                    <p className="text-sm text-gray-600 mb-2">Started: {project.startDate}</p>
                    <p className="text-sm text-gray-600 mb-2">Duration: {project.estimatedDuration}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Current Phase: {project.currentPhase}</p>
                      <p>Next Milestone: {project.nextMilestone}</p>
                    </div>
                  </div>
                ))}
              </div>

                    <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h4>
                {customerViewData.recentActivity?.slice(0, 5).map((activity, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                ))}
                    </div>
                      </div>
                  </div>
                </div>
      )}

      {/* Timeline Management Modal */}
      {showSubmissionModal && selectedSubmission && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Manage Timeline - {selectedSubmission.formData.firstName} {selectedSubmission.formData.lastName}
              </h3>
                    <button
                      onClick={() => {
                  setShowSubmissionModal(false);
                  setSelectedSubmission(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                    </button>
                </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Order Timeline Steps</h4>
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
                      <div key={step.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-3 h-3 rounded-full ${
                                isCompleted ? 'bg-green-500' : 
                                isInProgress ? 'bg-yellow-500' : 'bg-gray-300'
                              }`}></span>
                              <span className="font-medium text-gray-900">{step.title}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          {stepData.date && (
                              <p className="text-xs text-gray-500 mt-1">
                              {isCompleted ? 'Completed' : 'Started'}: {new Date(stepData.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'completed')}
                              className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border ${
                                isCompleted 
                                  ? 'bg-green-100 text-green-800 border-green-300' 
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                              }`}
                            >
                            <CheckCircle className="w-4 h-4 mr-1" />
                              {isCompleted ? 'Completed' : 'Mark Complete'}
                            </button>
                            {!isCompleted && (
                              <button
                                onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'in_progress')}
                                className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border ${
                                  isInProgress 
                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-300' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-50'
                                }`}
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                {isInProgress ? 'In Progress' : 'Mark In Progress'}
                              </button>
                            )}
                            {(isCompleted || isInProgress) && (
                              <button
                                onClick={() => updateCustomerTimelineStep(selectedSubmission.formData.email, step.key, 'pending')}
                                className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium border bg-white text-red-700 border-red-300 hover:bg-red-50"
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
    </div>
  );
};

export default AdminDashboard; 