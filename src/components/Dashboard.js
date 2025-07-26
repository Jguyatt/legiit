import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  FileText, 
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { customerAuth } from '../utils/customerAuth';
import { userAuth } from '../utils/userAuth';
import { purchaseHandler } from '../utils/purchaseHandler';
import { stripeLinks } from '../utils/stripeLinks';
import OnboardingForm from './OnboardingForm';

const Dashboard = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [currentService, setCurrentService] = useState('');
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const navigate = useNavigate();

  // Sync data with backend API
  const syncWithBackend = async (email) => {
    try {
      const response = await fetch(`https://rankly360.up.railway.app/api/customer-data/${email}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        console.log('🔄 Synced with backend:', result.data);
        setCustomerData(result.data);
        localStorage.setItem('customerData', JSON.stringify(result.data));
        return result.data;
      }
    } catch (error) {
      console.error('Failed to sync with backend:', error);
    }
    return null;
  };

  // Fix existing projects with old duration format
  const fixProjectDurations = (data) => {
    if (data?.activeProjects) {
      let updated = false;
      data.activeProjects.forEach(project => {
        if (project.estimatedDuration === '30-45 days') {
          project.estimatedDuration = '30 days';
          updated = true;
        }
      });
      
      if (updated) {
        localStorage.setItem('customerData', JSON.stringify(data));
        setCustomerData(data);
      }
    }
  };

  // Clear any old customer data that shouldn't be there
  const clearOldCustomerData = () => {
    // Clear any customer data that might have been created during signup
    localStorage.removeItem('customerData');
    localStorage.removeItem('customerToken');
    
    // Clear any customer keys that might have old data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('customer-') && !key.includes('billy')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      // Only remove if it has no actual projects (just signup data)
      if (!data.activeProjects || data.activeProjects.length === 0) {
        localStorage.removeItem(key);
        console.log('🧹 Cleared old customer data:', key);
      }
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Clear any old customer data first
        clearOldCustomerData();
        
        const session = userAuth.initSession();
        if (session.success) {
          // Only redirect to admin if explicitly an admin user
          if (userAuth.isAdmin() && session.data?.isAdmin === true) {
            // Redirect admin users to admin dashboard
            navigate('/admin');
            return;
          } else {
            // Regular users stay on customer dashboard
            setIsCustomer(true);
            
            // Get user session
            const userSession = userAuth.getSession();
            if (userSession?.email) {
              // Try to sync with backend first
              const backendData = await syncWithBackend(userSession.email);
              if (backendData) {
                // Set customer data from backend
                setCustomerData(backendData);
                fixProjectDurations(backendData);
              } else {
                // No backend data - show clean dashboard
                setCustomerData({
                  name: userSession.name,
                  email: userSession.email,
                  activeProjects: [], // Empty - no projects until purchase
                  orderTimeline: {},
                  recentActivity: []
                });
              }
            } else {
              // No user session, show clean dashboard
              setCustomerData({
                name: 'Customer',
                email: 'customer@example.com',
                activeProjects: [], // Empty - no projects until purchase
                orderTimeline: {},
                recentActivity: []
              });
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (when admin updates timeline)
    const handleStorageChange = () => {
      console.log('🔄 Storage changed, refreshing customer data...');
      const data = customerAuth.getCustomerData();
      if (data) {
        setCustomerData(data);
        fixProjectDurations(data);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from admin dashboard
    const handleTimelineUpdate = async (event) => {
      console.log('🔄 Timeline updated, refreshing customer data...', event.detail);
      
      // Get updated data from event
      const updatedData = event.detail?.updatedData;
      if (updatedData) {
        setCustomerData(updatedData);
        fixProjectDurations(updatedData);
        
        // Also sync with backend to ensure consistency
        try {
          const userSession = userAuth.getSession();
          if (userSession?.email) {
            await fetch('https://rankly360.up.railway.app/api/sync-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userSession.email,
                customerData: updatedData
              })
            });
            console.log('✅ Timeline update synced to backend');
          }
        } catch (error) {
          console.error('❌ Failed to sync timeline update:', error);
        }
      } else {
        // Fallback: refresh from backend
        const userSession = userAuth.getSession();
        if (userSession?.email) {
          const backendData = await syncWithBackend(userSession.email);
          if (backendData) {
            setCustomerData(backendData);
            fixProjectDurations(backendData);
          }
        }
      }
    };

    const handleProjectCancelled = async (event) => {
      console.log('🚫 Project cancelled, refreshing customer data...', event.detail);
      
      // Refresh data from backend to get updated state
      const userSession = userAuth.getSession();
      if (userSession?.email) {
        const backendData = await syncWithBackend(userSession.email);
        if (backendData) {
          setCustomerData(backendData);
          fixProjectDurations(backendData);
        }
      }
    };

    window.addEventListener('timelineUpdated', handleTimelineUpdate);
    window.addEventListener('projectCancelled', handleProjectCancelled);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('timelineUpdated', handleTimelineUpdate);
      window.removeEventListener('projectCancelled', handleProjectCancelled);
    };
  }, [navigate]);

  // Fix durations whenever customerData changes
  useEffect(() => {
    if (customerData) {
      fixProjectDurations(customerData);
      checkExpiredCancellations(customerData);
    }
  }, [customerData]);

  // Check for expired cancellations every hour
  useEffect(() => {
    const interval = setInterval(() => {
      if (customerData) {
        checkExpiredCancellations(customerData);
      }
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(interval);
  }, [customerData]);

  const handleGetStarted = () => {
    navigate('/packages');
  };

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };





  const handleCancelMembership = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancelMembership = async () => {
    // Get current customer data
    const currentData = customerAuth.getCustomerData();
    
    if (!currentData || !currentData.activeProjects || currentData.activeProjects.length === 0) {
      alert('No active projects to cancel');
      return;
    }
    
    const project = currentData.activeProjects[0];
    
    try {
      // Immediately cancel the project (no approval needed)
      const response = await fetch('https://rankly360.up.railway.app/api/cancel-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: currentData.email,
          projectId: project.id,
          cancelledBy: 'Customer'
        })
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        // Calculate billing period end date (30 days from now)
        const billingEndDate = new Date();
        billingEndDate.setDate(billingEndDate.getDate() + 30);
        
        // Update customer data to show immediate cancellation
        const updatedData = {
          ...currentData,
          activeProjects: [], // Remove from active projects
          completedProjects: [
            ...(currentData.completedProjects || []),
            {
              ...project,
              status: 'Cancelled',
              cancelledDate: new Date().toISOString(),
              cancelledBy: 'Customer',
              billingEndDate: billingEndDate.toISOString(),
              cancellationReason: 'Customer requested cancellation'
            }
          ],
          recentActivity: [
            {
              type: 'project_cancelled',
              message: 'Project cancelled by customer',
              date: new Date().toISOString().split('T')[0]
            },
            ...currentData.recentActivity
          ]
        };

        setCustomerData(updatedData);
        customerAuth.updateCustomerData(updatedData);
        setShowCancelConfirmation(false);

        // Show success message with billing end date
        alert(`✅ Your project has been successfully cancelled!\n\nYour service will remain active until ${billingEndDate.toLocaleDateString()} (end of billing period).\n\nAfter this date, your project will be moved to completed projects.`);
      } else {
        alert('Error cancelling project. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling project:', error);
      alert('Network error. Please try again.');
    }
  };



  const handleOnboardingSubmit = async (formData) => {
    // Update the timeline to mark onboarding as pending approval
    if (customerData) {
      const updatedData = {
        ...customerData,
        orderTimeline: {
          ...customerData.orderTimeline,
          onboardingForm: {
            status: 'pending_approval',
            date: new Date().toISOString().split('T')[0],
            completed: false
          }
        },
        recentActivity: [
          {
            type: 'onboarding_submitted',
            message: `${currentService} onboarding form submitted for approval`,
            date: new Date().toISOString().split('T')[0]
          },
          ...customerData.recentActivity
        ]
      };
      
      // Calculate progress based on completed timeline steps (20% per step)
      const completedSteps = Object.values(updatedData.orderTimeline).filter(step => step.completed).length;
      const newProgress = Math.min(completedSteps * 20, 100); // Each step is 20%, max 100%
      
      // Update progress and milestones in active projects
      if (updatedData.activeProjects && updatedData.activeProjects.length > 0) {
        const project = updatedData.activeProjects[0];
        project.progress = newProgress;
        project.milestones = {
          ...project.milestones,
          onboardingForm: { 
            status: 'pending_approval', 
            date: new Date().toISOString().split('T')[0] 
          }
        };
        project.currentPhase = 'Onboarding Pending Approval';
        project.nextMilestone = 'Awaiting Account Manager Review';
      }
      
      setCustomerData(updatedData);
      localStorage.setItem('customerData', JSON.stringify(updatedData));
      
      // SYNC TO BACKEND - CRITICAL FIX
      try {
        // Update customer data in backend
        const userSession = userAuth.getSession();
        if (userSession?.email) {
          await fetch(`https://rankly360.up.railway.app/api/sync-data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userSession.email,
              customerData: updatedData
            })
          });
        }
        
        // Create onboarding submission in backend
        const submissionData = {
          id: 'submission_' + Date.now(),
          submittedAt: new Date().toISOString(),
          status: 'pending_approval',
          service: currentService,
          customerEmail: userSession?.email || customerData.email,
          customerName: userSession?.name || customerData.name,
          formData: formData
        };
        
        // Send onboarding submission to backend
        await fetch(`https://rankly360.up.railway.app/api/onboarding-submission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
        
        console.log('✅ Onboarding submission synced to backend');
        
        // Dispatch event to notify admin dashboard
        window.dispatchEvent(new CustomEvent('onboardingSubmitted', { 
          detail: { submissionData } 
        }));
        
      } catch (error) {
        console.error('❌ Failed to sync onboarding submission:', error);
      }
    }
    
    setShowOnboardingForm(false);
  };

  const openOnboardingForm = (service) => {
    setCurrentService(service);
    setShowOnboardingForm(true);
  };

  // Helper function to calculate progress based on completed timeline steps
  // const calculateProgressFromTimeline = (orderTimeline) => {
  //   if (!orderTimeline) return 0;
  //   const completedSteps = Object.values(orderTimeline).filter(step => step.completed).length;
  //   return Math.min(completedSteps * 20, 100); // Each step is 20%, max 100%
  // };

  // Helper function to update timeline step and recalculate progress
  // const updateTimelineStep = (stepKey, status) => {
  //   if (!customerData) return;

  //   const updatedData = {
  //     ...customerData,
  //     orderTimeline: {
  //       ...customerData.orderTimeline,
  //       [stepKey]: {
  //         status: status,
  //         date: status === 'completed' ? new Date().toISOString().split('T')[0] : null,
  //         completed: status === 'completed'
  //       }
  //     }
  //   };

  //   // Calculate new progress based on completed steps
  //   const newProgress = calculateProgressFromTimeline(updatedData.orderTimeline);
    
  //   // Update progress in active projects
  //   if (updatedData.activeProjects && updatedData.activeProjects.length > 0) {
  //     updatedData.activeProjects[0].progress = newProgress;
  //   }

  //   // Add activity log entry
  //   const stepNames = {
  //     orderPlaced: 'Order Placed',
  //     onboardingForm: 'Onboarding Form',
  //     orderInProgress: 'Order In Progress',
  //     reviewDelivery: 'Review Delivery',
  //     orderComplete: 'Order Complete'
  //   };

  //   updatedData.recentActivity = [
  //     {
  //       type: 'timeline_update',
  //       message: `${stepNames[stepKey]} ${status === 'completed' ? 'completed' : 'started'}`,
  //       date: new Date().toISOString().split('T')[0]
  //     },
  //     ...updatedData.recentActivity
  //   ];

  //   setCustomerData(updatedData);
  //   localStorage.setItem('customerData', JSON.stringify(updatedData));
  // };

  const clearBillyData = () => {
    // Clear any existing fake data for Billy
    localStorage.removeItem('customerData');
    localStorage.removeItem('customerToken');
    
    // Set Billy to have no orders/projects
    const emptyBillyData = {
      name: 'Billy Bars',
      email: 'billy@billybars.com',
      activeProjects: [],
      orderTimeline: {},
      recentActivity: [],
      subscription: null
    };
    
    setCustomerData(emptyBillyData);
  };

  // Helper to move completed projects
  const moveCompletedProjects = (data) => {
    if (!data || !data.activeProjects) return data;
    
    const now = new Date();
    const updatedData = { ...data };
    
    // Check for cancelled projects that have passed their billing period
    if (updatedData.completedProjects) {
      updatedData.completedProjects = updatedData.completedProjects.map(project => {
        if (project.status === 'Cancelled' && project.billingEndDate) {
          const billingEnd = new Date(project.billingEndDate);
          if (now > billingEnd) {
            // Billing period has ended, mark as fully completed
            return {
              ...project,
              status: 'Completed',
              completedDate: billingEnd.toISOString(),
              billingEndDate: null // Clear billing end date
            };
          }
        }
        return project;
      });
    }
    
    return updatedData;
  };

  const checkExpiredCancellations = (data) => {
    if (!data || !data.completedProjects) return data;
    
    const now = new Date();
    let hasChanges = false;
    
    const updatedData = { ...data };
    updatedData.completedProjects = updatedData.completedProjects.map(project => {
      if (project.status === 'Cancelled' && project.billingEndDate) {
        const billingEnd = new Date(project.billingEndDate);
        if (now > billingEnd) {
          hasChanges = true;
          return {
            ...project,
            status: 'Completed',
            completedDate: billingEnd.toISOString(),
            billingEndDate: null
          };
        }
      }
      return project;
    });
    
    if (hasChanges) {
      setCustomerData(updatedData);
      customerAuth.updateCustomerData(updatedData);
    }
    
    return updatedData;
  };

  // Watch for project completion
  useEffect(() => {
    if (customerData && customerData.activeProjects && customerData.activeProjects.length > 0) {
      const justCompleted = customerData.activeProjects.find(
        (p) => p.progress === 100 || p.currentPhase === 'Order Complete' || p.status === 'Completed'
      );
      if (justCompleted) {
        setShowCompletionMessage(true);
        // Move to completedProjects
        const updated = moveCompletedProjects(customerData);
        setCustomerData(updated);
        localStorage.setItem('customerData', JSON.stringify(updated));
      }
    }
  }, [customerData]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If not a customer, redirect to admin dashboard or show loading
  if (!isCustomer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#10111a] to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3abef9] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Customer Dashboard - Professional Design
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Welcome back, {userAuth.getSession()?.name || customerData?.name || 'there'}
                </h1>
                <p className="text-slate-400 text-sm">Here's an overview of your local SEO campaigns.</p>
              </div>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={async () => {
                setLoading(true);
                const userSession = userAuth.getSession();
                if (userSession?.email) {
                  const backendData = await syncWithBackend(userSession.email);
                  if (backendData) {
                    setCustomerData(backendData);
                    fixProjectDurations(backendData);
                  }
                }
                setLoading(false);
              }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800 rounded border border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Active Projects</p>
                  <p className="text-lg font-semibold text-white">{customerData?.activeProjects?.length || 0}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 rounded border border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="text-lg font-semibold text-white">
                    {customerData?.activeProjects?.length > 0 ? 'Active' : 'Ready'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Check if customer has any projects */}
        {(!customerData?.activeProjects || customerData.activeProjects.length === 0) ? (
          <div className="bg-slate-800 rounded border border-slate-700 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h2 className="text-lg font-semibold mb-3 text-white">
                Ready to improve your Google Maps rankings?
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-base px-2 leading-relaxed">
                You don't have any active projects yet. Browse our local SEO packages to begin improving your Google Maps rankings and get found by local customers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-slate-500 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2 text-lg">Local SEO Services</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Improve your Google Maps rankings and get found by local customers searching for your services.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-slate-500 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2 text-lg">Proven Results</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Join businesses that have seen significant increases in local leads and calls.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={handleGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 mx-auto text-sm sm:text-base"
              >
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              

            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Projects</p>
                    <p className="text-xl font-semibold text-white">{customerData?.activeProjects?.length || 0}</p>
                  </div>
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Avg. Progress</p>
                    <p className="text-xl font-semibold text-white">
                      {customerData?.activeProjects?.length > 0 
                        ? Math.round(customerData.activeProjects.reduce((sum, project) => sum + project.progress, 0) / customerData.activeProjects.length)
                        : 0}%
                    </p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Reports</p>
                    <p className="text-xl font-semibold text-white">{customerData?.recentActivity?.length || 0}</p>
                  </div>
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Active Projects and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3abef9]/20"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3abef9]" />
                  Active Projects
                </h2>
                <div className="space-y-4">
                  {customerData?.activeProjects?.length === 0 && (
                    <p className="text-gray-400 text-sm">No active projects. Start a new project below!</p>
                  )}
                  {customerData?.activeProjects?.map((project) => (
                    <div key={project.id} className="bg-[#2a2a2a] rounded-lg border border-gray-700/50 overflow-hidden">
                      {/* Project Header */}
                      <div 
                        className="p-4 cursor-pointer hover:bg-[#333333] transition-colors"
                        onClick={() => toggleProjectExpansion(project.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white text-sm truncate">{project.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-[#3abef9] font-medium">{project.type}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-400">{project.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                              {project.status}
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 text-gray-400 transition-transform ${
                                expandedProjects.has(project.id) ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </div>
                        
                        {/* Progress Bar (always visible) */}
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Project Details */}
                      {expandedProjects.has(project.id) && (
                        <div className="border-t border-gray-700/50 p-4 bg-[#252525]">
                          {/* Project Details */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                            <div>
                              <span className="text-gray-400">Started:</span>
                              <p className="text-white">{project.startDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <p className="text-white">{project.estimatedDuration}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Current Phase:</span>
                              <p className="text-[#3abef9] font-medium">{project.currentPhase}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Next Milestone:</span>
                              <p className="text-white">{project.nextMilestone}</p>
                            </div>
                          </div>

                          {/* Order Progress Timeline for this project */}
                          <div className="mb-4">
                            <h4 className="text-xs font-medium text-gray-300 mb-3 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Order Progress Timeline
                            </h4>
                            <div className="space-y-3">
                              {[
                                { key: 'orderPlaced', label: 'Order Placed', description: 'Your order has been received' },
                                { key: 'onboardingForm', label: 'Onboarding Form', description: 'Complete your business information' },
                                { key: 'orderInProgress', label: 'Order In Progress', description: "We're working on your campaign" },
                                { key: 'reviewDelivery', label: 'Review Delivery', description: 'Review and approve deliverables' },
                                { key: 'orderComplete', label: 'Order Complete', description: 'Your campaign is live!' }
                              ].map((step, index) => {
                                const timelineData = customerData?.orderTimeline?.[step.key];
                                const isCompleted = timelineData?.completed || timelineData?.status === 'completed';
                                const isPendingApproval = timelineData?.status === 'pending_approval';
                                const isCurrent = !isCompleted && !isPendingApproval && index === 1; // Onboarding is current if not completed
                                
                                return (
                                  <div key={step.key} className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                        isCompleted 
                                          ? 'bg-green-500 text-white' 
                                          : isPendingApproval
                                            ? 'bg-yellow-500 text-white'
                                            : isCurrent
                                              ? 'bg-blue-500 text-white'
                                              : 'bg-gray-600 text-gray-400'
                                      }`}>
                                        {isCompleted ? (
                                          <CheckCircle className="w-3 h-3" />
                                        ) : (
                                          index + 1
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-white">{step.label}</span>
                                        {isCompleted && (
                                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                                            Completed
                                          </span>
                                        )}
                                        {isCurrent && (
                                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                                            In Progress
                                          </span>
                                        )}
                                        {isPendingApproval && (
                                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                                            Pending Approval
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-slate-400 text-xs mb-1">{step.description}</p>
                                      {timelineData?.date && (
                                        <p className="text-slate-500 text-xs">
                                          {isCompleted ? 'Completed: ' : isPendingApproval ? 'Submitted: ' : 'Started: '}{timelineData.date}
                                        </p>
                                      )}
                                      
                                      {/* Onboarding Form Button */}
                                      {step.key === 'onboardingForm' && !isCompleted && !isPendingApproval && (
                                        <button
                                          onClick={() => {
                                            const projectName = project.name || 'Service';
                                            const serviceName = projectName.replace(' Package', '').replace(' package', '');
                                            openOnboardingForm(serviceName);
                                          }}
                                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-md transition-colors duration-200 text-xs"
                                        >
                                          Complete Onboarding Form
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Requirements & Deliverables */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                {project.requirements?.map((req, index) => (
                                  <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                    <div className="w-1 h-1 bg-[#3abef9] rounded-full"></div>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Deliverables</h4>
                              <ul className="space-y-1">
                                {project.deliverables?.map((del, index) => (
                                  <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                    <div className="w-1 h-1 bg-[#3abef9] rounded-full"></div>
                                    {del}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={handleCancelMembership}
                              className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-2 rounded-md transition-colors duration-200 text-xs"
                            >
                              Cancel Project
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cancellation Messages */}
              {customerData?.cancellationRequest && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mr-3" />
                    <div>
                      <h3 className="text-orange-400 font-medium">Cancellation Request Submitted</h3>
                      <p className="text-orange-300 text-sm">{customerData.cancellationRequest.message}</p>
                      <p className="text-orange-300 text-xs mt-1">
                        Requested: {new Date(customerData.cancellationRequest.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Cancelled Message */}
              {customerData?.activeProjects?.length === 0 && customerData?.completedProjects?.some(p => p.status === 'Cancelled') && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-400 mr-3" />
                    <div>
                      <h3 className="text-red-400 font-medium">Project Cancelled</h3>
                      <p className="text-red-300 text-sm">
                        Your project has been cancelled and will expire at the end of your billing period.
                      </p>
                      {customerData?.completedProjects?.find(p => p.status === 'Cancelled')?.billingEndDate && (
                        <p className="text-red-300 text-xs mt-1">
                          Billing period ends: {new Date(customerData.completedProjects.find(p => p.status === 'Cancelled').billingEndDate).toLocaleDateString()}
                        </p>
                      )}
                      {customerData?.completedProjects?.find(p => p.status === 'Cancelled')?.cancellationReason && (
                        <p className="text-red-300 text-xs mt-1">
                          Reason: {customerData.completedProjects.find(p => p.status === 'Cancelled').cancellationReason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3abef9]/20"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#3abef9]" />
                  Recent Activity
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {customerData?.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#2a2a2a] rounded-lg sm:rounded-xl">
                      <div className="w-2 h-2 bg-[#3abef9] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs sm:text-sm leading-relaxed">{activity.message}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Add Another Service */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-[#3abef9]/10 to-[#6366f1]/10 rounded-xl sm:rounded-2xl p-6 border border-[#3abef9]/20"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#3abef9] to-[#6366f1] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Add Another Service</h3>
                  <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
                    Expand your local SEO presence with additional services. Each service works together to maximize your Google Maps rankings.
                  </p>
                  <button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-[#3abef9] to-[#6366f1] hover:from-[#3abef9]/90 hover:to-[#6366f1]/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Browse Services
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
      
      {/* Cancel Membership Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-[#3abef9]/20"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cancel Membership?</h3>
              <p className="text-gray-400 text-sm">
                Are you sure you want to cancel your membership? This action will submit a cancellation request for review.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirmation(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Keep Membership
              </button>
              <button
                onClick={confirmCancelMembership}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Yes, Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Onboarding Form Modal */}
      {showOnboardingForm && (
        <OnboardingForm
          isOpen={showOnboardingForm}
          service={currentService}
          onClose={() => setShowOnboardingForm(false)}
          onSubmit={handleOnboardingSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard; 