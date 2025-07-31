import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  FolderOpen,
  User,
  Bell,
  MessageSquare,
  Send
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
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [currentService, setCurrentService] = useState('');
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const [notifiedMessages, setNotifiedMessages] = useState(new Set());
  const [lastNotificationCheck, setLastNotificationCheck] = useState(null);
  const chatMessagesEndRef = useRef(null);

  // Load notification state from localStorage on component mount
  useEffect(() => {
    const userSession = userAuth.getSession();
    if (userSession?.email) {
      const userEmail = userSession.email;
      const notificationsKey = `rankly360_notifications_${userEmail}`;
      const unreadCountKey = `rankly360_unread_count_${userEmail}`;
      const notifiedMessagesKey = `rankly360_notified_messages_${userEmail}`;
      const lastNotificationCheckKey = `rankly360_last_notification_check_${userEmail}`;
      
      // For new users, clear any old global notification data
      if (!localStorage.getItem(notificationsKey)) {
        console.log('🧹 Clearing old global notification data for new user:', userEmail);
        localStorage.removeItem('rankly360_notifications');
        localStorage.removeItem('rankly360_unreadCount');
        localStorage.removeItem('rankly360_notifiedMessages');
        localStorage.removeItem('rankly360_lastNotificationCheck');
        localStorage.removeItem('rankly360_chat_messages');
        localStorage.removeItem('rankly360_chat_messages_tryranklyai@gmail.com');
        localStorage.removeItem('rankly360_chat_messages_billybars07@gmail.com');
      }
      
      const savedNotifications = localStorage.getItem(notificationsKey);
      const savedUnreadCount = localStorage.getItem(unreadCountKey);
      const savedNotifiedMessages = localStorage.getItem(notifiedMessagesKey);
      const savedLastNotificationCheck = localStorage.getItem(lastNotificationCheckKey);
      
      if (savedNotifications) {
        const notifications = JSON.parse(savedNotifications);
        setNotifications(notifications);
        // Sync unread count with actual notifications
        const actualUnreadCount = notifications.filter(n => n.unread).length;
        setUnreadCount(actualUnreadCount);
        localStorage.setItem(unreadCountKey, actualUnreadCount.toString());
      }
      if (savedUnreadCount && !savedNotifications) {
        setUnreadCount(parseInt(savedUnreadCount));
      }
      if (savedNotifiedMessages) {
        setNotifiedMessages(new Set(JSON.parse(savedNotifiedMessages)));
      }
      if (savedLastNotificationCheck) {
        setLastNotificationCheck(parseInt(savedLastNotificationCheck));
      }
      
      // Clear all notifications for this user to reset the current state
      console.log('🧹 Clearing all notifications for user:', userEmail);
      setNotifications([]);
      setUnreadCount(0);
      setNotifiedMessages(new Set());
      setLastNotificationCheck(null);
      localStorage.setItem(notificationsKey, JSON.stringify([]));
      localStorage.setItem(unreadCountKey, '0');
      localStorage.setItem(notifiedMessagesKey, JSON.stringify([]));
      localStorage.setItem(lastNotificationCheckKey, null);
      
      // Ensure unread count is always 0 for new users
      console.log('✅ Reset notification count to 0 for user:', userEmail);
    }
  }, []);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Request notification permissions and set up periodic message checking
  useEffect(() => {
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Set up periodic message checking (every 30 seconds)
    const messageCheckInterval = setInterval(() => {
      if (customerData?.email) {
        loadChatMessages();
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(messageCheckInterval);
  }, [customerData?.email]);

  // Check for new admin messages and show notifications
  const checkForNewAdminMessages = (messages) => {
    if (messages.length > lastMessageCount) {
      // Find new admin messages
      const newMessages = messages.slice(lastMessageCount);
      const adminMessages = newMessages.filter(msg => msg.sender === 'admin');
      
      adminMessages.forEach(message => {
        // Check if this message has already been notified
        if (notifiedMessages.has(message.id)) {
          return; // Skip if already notified
        }
        
        // Play notification sound
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
          audio.volume = 0.3;
          audio.play().catch(e => console.log('Audio notification failed:', e));
        } catch (e) {
          console.log('Audio notification not supported');
        }
        
        // Show browser notification
        if (Notification.permission === 'granted') {
          new Notification('New Message from Jacob Guyatt', {
            body: message.message,
            icon: '/images/logo.png',
            badge: '/images/logo.png',
            tag: 'admin-message'
          });
        }
        
        // Add to notifications list
        const newNotification = {
          id: `admin-message-${message.id}`,
          type: 'admin-message',
          message: `New message from Jacob Guyatt: "${message.message.substring(0, 50)}${message.message.length > 50 ? '...' : ''}"`,
          timestamp: new Date().toISOString(),
          unread: true
        };
        
        setNotifications(prev => {
          // Check if this notification already exists to prevent duplicates
          const notificationExists = prev.some(notification => notification.id === newNotification.id);
          if (notificationExists) {
            return prev; // Don't add duplicate
          }
          
          const updatedNotifications = [newNotification, ...prev];
          const userSession = userAuth.getSession();
          if (userSession?.email) {
            localStorage.setItem(`rankly360_notifications_${userSession.email}`, JSON.stringify(updatedNotifications));
            
            // Update unread count to match actual notifications
            const unreadCount = updatedNotifications.filter(n => n.unread).length;
            setUnreadCount(unreadCount);
            localStorage.setItem(`rankly360_unread_count_${userSession.email}`, unreadCount.toString());
          }
          return updatedNotifications;
        });
        
        // Mark this message as notified
        setNotifiedMessages(prev => {
          const updatedSet = new Set([...prev, message.id]);
          localStorage.setItem('rankly360_notifiedMessages', JSON.stringify([...updatedSet]));
          return updatedSet;
        });
      });
      
      setLastMessageCount(messages.length);
    }
  };

  const navigate = useNavigate();

  // Generate notifications from timeline updates
  const generateNotifications = (customerData) => {
    const notifications = [];
    
    // Only generate notifications for new admin messages, not from recent activity
    // This prevents random notifications from popping up on page refresh
    
    return notifications;
  };

  // Sync data with backend API
  const syncWithBackend = async (email) => {
    try {
      const response = await fetch('https://rankly360.up.railway.app/api/all-customers');
      const result = await response.json();
      
      if (result.success && result.customers) {
        // Find the customer data for this email
        let customerData = null;
        let bestMatch = null;
        
        // Try to find by email in different key formats
        for (const [key, customer] of Object.entries(result.customers)) {
          if (customer.email && customer.email.toLowerCase() === email.toLowerCase()) {
            // Prioritize entries with active projects OR completed projects
            if ((customer.activeProjects && customer.activeProjects.length > 0) || 
                (customer.completedProjects && customer.completedProjects.length > 0)) {
              bestMatch = customer;
              break; // Found one with projects, use this one
            } else if (!customerData) {
              customerData = customer; // Keep this as fallback
            }
          }
        }
        
        // Use the best match (with projects) if found, otherwise use the fallback
        const finalCustomerData = bestMatch || customerData;
        
        if (finalCustomerData) {
          // Apply completion logic to ensure projects are in the right state
          const processedData = moveCompletedProjects(finalCustomerData);
          
          console.log('🔄 Synced with backend:', processedData);
          console.log('📊 Active projects count:', processedData?.activeProjects?.length);
          console.log('📊 Active projects:', processedData?.activeProjects);
          console.log('📊 Completed projects count:', processedData?.completedProjects?.length);
          setCustomerData(processedData);
          localStorage.setItem('customerData', JSON.stringify(processedData));
          
          // Sync the processed data back to backend if there were changes
          if (JSON.stringify(processedData) !== JSON.stringify(finalCustomerData)) {
            await fetch('https://rankly360.up.railway.app/api/sync-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                customerData: processedData
              })
            });
            console.log('✅ Processed data synced back to backend');
          }
          
          return processedData;
        } else {
          console.log('❌ Customer not found in backend data');
        }
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
          project.estimatedDuration = '14 days';
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

    const handlePurchaseCompleted = async (event) => {
      console.log('📊 Purchase completed event received:', event.detail);
      console.log('📊 Event detail type:', typeof event.detail);
      console.log('📊 Event detail keys:', Object.keys(event.detail || {}));
      const newCustomerData = event.detail;
      console.log('📊 Active projects count:', newCustomerData?.activeProjects?.length);
      console.log('📊 Active projects:', newCustomerData?.activeProjects);
      console.log('📊 Full customer data structure:', JSON.stringify(newCustomerData, null, 2));
      if (newCustomerData) {
        console.log('✅ Setting new customer data with', newCustomerData.activeProjects?.length, 'active projects');
        setCustomerData(newCustomerData);
        fixProjectDurations(newCustomerData);
        
        // Also sync to backend to ensure consistency
        const userSession = userAuth.getSession();
        if (userSession?.email) {
          try {
            await fetch('https://rankly360.up.railway.app/api/sync-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userSession.email,
                customerData: newCustomerData
              })
            });
            console.log('✅ Purchase data synced to backend');
          } catch (error) {
            console.error('❌ Failed to sync purchase data:', error);
          }
        }
      } else {
        console.log('❌ No customer data received in event');
      }
    };

    window.addEventListener('timelineUpdated', handleTimelineUpdate);
    window.addEventListener('projectCancelled', handleProjectCancelled);
    window.addEventListener('purchaseCompleted', handlePurchaseCompleted);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('timelineUpdated', handleTimelineUpdate);
      window.removeEventListener('projectCancelled', handleProjectCancelled);
      window.removeEventListener('purchaseCompleted', handlePurchaseCompleted);
    };
  }, [navigate]);

  // Fix durations whenever customerData changes
  useEffect(() => {
    if (customerData) {
      fixProjectDurations(customerData);
      checkExpiredCancellations(customerData);
      
      // Check for project completion and move to completed if needed
      const processedData = moveCompletedProjects(customerData);
      if (JSON.stringify(processedData) !== JSON.stringify(customerData)) {
        console.log('🔄 Moving completed projects...');
        setCustomerData(processedData);
        localStorage.setItem('customerData', JSON.stringify(processedData));
        
        // Sync the updated data to backend
        const userSession = userAuth.getSession();
        if (userSession?.email) {
          fetch('https://rankly360.up.railway.app/api/sync-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userSession.email,
              customerData: processedData
            })
          }).then(response => response.json())
          .then(result => {
            if (result.success) {
              console.log('✅ Completed projects synced to backend');
            }
          })
          .catch(error => {
            console.error('❌ Failed to sync completed projects:', error);
          });
        }
      }
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

      // Check for pending purchases on page load
    useEffect(() => {
      console.log('🔄 Checking for pending purchases on page load...');
      const pendingPurchase = purchaseHandler.checkForPendingPurchases();
      if (pendingPurchase) {
        console.log('💰 Found pending purchase, updating dashboard...');
        console.log('💰 Pending purchase data:', pendingPurchase);
        console.log('💰 Active projects count:', pendingPurchase?.activeProjects?.length);
        setCustomerData(pendingPurchase);
        fixProjectDurations(pendingPurchase);
      } else {
        console.log('📊 No pending purchases found');
      }
      
      // Also try to process any unprocessed purchases from localStorage
      const userSession = userAuth.getSession();
      if (userSession?.email) {
        const unprocessedPurchases = JSON.parse(localStorage.getItem('unprocessedPurchases') || '[]');
        if (unprocessedPurchases.length > 0) {
          console.log('🔄 Found unprocessed purchases, attempting to process...');
          unprocessedPurchases.forEach(async (purchase) => {
            try {
              const response = await fetch('https://rankly360.up.railway.app/api/manual-purchase', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userSession.email,
                  packageName: purchase.packageName,
                  amount: purchase.amount,
                  sessionId: purchase.sessionId
                })
              });
              
              if (response.ok) {
                console.log('✅ Unprocessed purchase processed successfully');
                // Remove from unprocessed list
                const updatedPurchases = unprocessedPurchases.filter(p => p.sessionId !== purchase.sessionId);
                localStorage.setItem('unprocessedPurchases', JSON.stringify(updatedPurchases));
                
                // Refresh customer data
                const backendData = await syncWithBackend(userSession.email);
                if (backendData) {
                  setCustomerData(backendData);
                  fixProjectDurations(backendData);
                }
              }
            } catch (error) {
              console.error('❌ Failed to process unprocessed purchase:', error);
            }
          });
        }
        
        // Force sync with backend to get latest data
        console.log('🔄 Force syncing with backend for latest purchase data...');
        syncWithBackend(userSession.email).then(backendData => {
          if (backendData) {
            console.log('✅ Backend sync successful, updating dashboard');
            setCustomerData(backendData);
            fixProjectDurations(backendData);
          }
        }).catch(error => {
          console.error('❌ Backend sync failed:', error);
        });
      }
    }, []);

  // Auto-refresh customer data every 30 seconds to catch new purchases
  useEffect(() => {
    const interval = setInterval(async () => {
      const userSession = userAuth.getSession();
      if (userSession?.email) {
        console.log('🔄 Auto-refreshing customer data...');
        const backendData = await syncWithBackend(userSession.email);
        if (backendData) {
          console.log('✅ Auto-refresh: Found updated data from backend');
          console.log('📊 Active projects count:', backendData?.activeProjects?.length);
          setCustomerData(backendData);
          fixProjectDurations(backendData);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/packages');
  };

  const toggleProjectExpansion = (projectId) => {
    try {
      setExpandedProjects(prev => {
        const newSet = new Set(prev);
        if (newSet.has(projectId)) {
          newSet.delete(projectId);
        } else {
          newSet.add(projectId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling project expansion:', error);
      // Fallback to prevent black screen
      setExpandedProjects(new Set());
    }
  };

  const handleCancelMembership = () => {
    // This function is no longer needed as cancel functionality is removed
  };

  const confirmCancelMembership = async () => {
    // This function is no longer needed as cancel functionality is removed
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
            completed: false,
            date: new Date().toISOString().split('T')[0]
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
        
        // Show success message
        alert('✅ Onboarding form submitted successfully! Your account manager will review it and get back to you soon.');
        
      } catch (error) {
        console.error('❌ Failed to sync onboarding submission:', error);
        alert('⚠️ Form submitted but there was an issue syncing with our servers. Please contact support if you don\'t see updates soon.');
      }
    }
    
    setShowOnboardingForm(false);
  };

  const openOnboardingForm = (service) => {
    console.log('Opening onboarding form for service:', service);
    setCurrentService(service);
    setShowOnboardingForm(true);
  };

  const clearBillyData = () => {
    localStorage.removeItem('billyData');
    console.log('Billy data cleared');
  };

  // Chat functions
  const openChat = () => {
    setShowChatModal(true);
    loadChatMessages();
    
    // Mark notifications as read when chat is opened
    setUnreadCount(0);
    setNotifications(prev => {
      const updatedNotifications = prev.map(notif => ({ ...notif, unread: false }));
      localStorage.setItem('rankly360_notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
    localStorage.setItem('rankly360_unreadCount', '0');
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setNotifiedMessages(new Set());
    setLastNotificationCheck(null);
    const userSession = userAuth.getSession();
    if (userSession?.email) {
      localStorage.setItem(`rankly360_notifications_${userSession.email}`, JSON.stringify([]));
      localStorage.setItem(`rankly360_unread_count_${userSession.email}`, '0');
      localStorage.setItem(`rankly360_notified_messages_${userSession.email}`, JSON.stringify([]));
      localStorage.setItem(`rankly360_last_notification_check_${userSession.email}`, null);
    }
  };

  const loadChatMessages = async () => {
    try {
      console.log('Loading chat messages for:', customerData.email);
      const response = await fetch(`https://rankly360.up.railway.app/api/chat-messages/${customerData.email}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded chat messages:', data);
        setChatMessages(data.messages || []);
        checkForNewAdminMessages(data.messages || []); // Check for new messages on load
      } else {
        console.error('Failed to load chat messages:', response.status);
        setChatMessages([]);
      }
    } catch (error) {
      console.error('Failed to load chat messages:', error);
      setChatMessages([]);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const messageData = {
      customerEmail: customerData.email,
      message: message,
      sender: 'customer',
      timestamp: new Date().toISOString()
    };

    try {
      console.log('Sending message:', messageData);
      const response = await fetch('https://rankly360.up.railway.app/api/chat-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        console.log('Message sent successfully');
        // Add message to local state immediately for instant feedback
        setChatMessages(prev => [...prev, messageData]);
        setNewMessage('');
      } else {
        console.error('Failed to send message:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error details:', errorData);
        
        // Temporary fallback: store message locally if backend isn't ready
        if (response.status === 404) {
          console.log('Backend chat endpoint not ready yet, storing message locally');
          setChatMessages(prev => [...prev, messageData]);
          setNewMessage('');
          alert('Message sent! (Stored locally - backend will be ready soon)');
        } else {
          alert('Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Temporary fallback: store message locally if network error
      console.log('Network error, storing message locally');
      setChatMessages(prev => [...prev, messageData]);
      setNewMessage('');
      alert('Message sent! (Stored locally - backend will be ready soon)');
    }
  };

  // Helper to move completed projects
  const moveCompletedProjects = (data) => {
    if (!data || !data.activeProjects) return data;
    
    console.log('🔄 Checking for projects to move to completed...');
    console.log('📊 Active projects count:', data.activeProjects?.length);
    
    const now = new Date();
    const updatedData = { ...data };
    
    // Check for projects that should be moved to completed
    const projectsToMove = [];
    const remainingActiveProjects = [];
    
    updatedData.activeProjects.forEach(project => {
      console.log('🔍 Checking project:', project.name, project.status, project.progress);
      // Check if project is completed (100% progress, all timeline steps done, or status is Completed)
      const timeline = data.orderTimeline;
      let allStepsCompleted = false;
      
      if (timeline) {
        allStepsCompleted = Object.values(timeline).every(step => 
          step.completed === true || step.status === 'completed'
        );
      }
      
      // Only mark as completed if ALL timeline steps are actually completed
      const isCompleted = allStepsCompleted && 
        (project.progress === 100 || project.status === 'Completed');
      
      console.log('📊 Project completion check:', {
        allStepsCompleted,
        progress: project.progress,
        currentPhase: project.currentPhase,
        status: project.status,
        isCompleted
      });
      
      if (isCompleted) {
        // Move to completed projects
        const completedProject = {
          ...project,
          status: 'Completed',
          completedDate: now.toISOString(),
          finalProgress: project.progress || 100
        };
        projectsToMove.push(completedProject);
      } else {
        // Keep in active projects
        remainingActiveProjects.push(project);
      }
    });
    
    // Update the data structure
    if (projectsToMove.length > 0) {
      updatedData.activeProjects = remainingActiveProjects;
      updatedData.completedProjects = [
        ...(updatedData.completedProjects || []),
        ...projectsToMove
      ];
      
      console.log('✅ Moved', projectsToMove.length, 'project(s) to completed section');
      console.log('📊 Remaining active projects:', remainingActiveProjects.length);
      console.log('📊 Total completed projects:', updatedData.completedProjects.length);
    } else {
      console.log('📊 No projects moved to completed, keeping all active');
    }
    
    console.log('📊 Final active projects count:', updatedData.activeProjects?.length);
    
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
      const project = customerData.activeProjects[0];
      
      // Check if all timeline steps are completed
      const timeline = customerData.orderTimeline;
      let allStepsCompleted = false;
      
      if (timeline) {
        allStepsCompleted = Object.values(timeline).every(step => 
          step.completed === true || step.status === 'completed'
        );
      }
      
      // Use the same completion criteria as admin dashboard
      const justCompleted = allStepsCompleted || 
        project.progress === 100 || 
        project.currentPhase === 'Order Complete' || 
        project.status === 'Completed' ||
        project.status === 'Cancelled' ||
        customerData.subscriptionStatus === 'Cancelled';
        
      if (justCompleted) {
        setShowCompletionMessage(true);
        
        // Move to completedProjects
        const updated = moveCompletedProjects(customerData);
        
        // Only update if there were changes
        if (updated.activeProjects.length !== customerData.activeProjects.length) {
          setCustomerData(updated);
          localStorage.setItem('customerData', JSON.stringify(updated));
          
          // Sync with backend
          const userSession = userAuth.getSession();
          if (userSession?.email) {
            fetch('https://rankly360.up.railway.app/api/sync-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userSession.email,
                customerData: updated
              })
            }).then(response => response.json())
            .then(result => {
              if (result.success) {
                console.log('✅ Project completion synced with backend');
              }
            })
            .catch(error => {
              console.error('❌ Failed to sync project completion:', error);
            });
          }
        }
      }
    }
  }, [customerData]);

  // Generate notifications when customer data changes
  // Disabled automatic notification generation to prevent random notifications
  // useEffect(() => {
  //   if (customerData) {
  //     // Only generate notifications if we haven't checked recently (prevent refresh notifications)
  //     const now = Date.now();
  //     const lastCheck = lastNotificationCheck || 0;
  //     const timeSinceLastCheck = now - lastCheck;
  //     
  //     // Only check for new notifications if it's been more than 5 minutes since last check
  //     if (timeSinceLastCheck > 5 * 60 * 1000) {
  //       const newNotifications = generateNotifications(customerData);
  //       if (newNotifications.length > 0) {
  //         setNotifications(prev => {
  //           const updatedNotifications = [...newNotifications, ...prev];
  //           localStorage.setItem('rankly360_notifications', JSON.stringify(updatedNotifications));
  //           return updatedNotifications;
  //         });
  //         setUnreadCount(prev => {
  //           const newCount = prev + newNotifications.length;
  //           localStorage.setItem('rankly360_unreadCount', newCount.toString());
  //           return newCount;
  //         });
  //       }
  //       setLastNotificationCheck(now);
  //       localStorage.setItem('rankly360_lastNotificationCheck', now.toString());
  //     }
  //   }
  // }, [customerData, lastNotificationCheck]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);


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
            
            <div className="flex items-center gap-3">
              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 notifications-dropdown">
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-slate-700 last:border-b-0 hover:bg-slate-700 transition-colors ${
                              !notification.read ? 'bg-blue-500/10' : ''
                            }`}
                            onClick={() => {
                              // Mark as read
                              setNotifications(prev => {
                                const updatedNotifications = prev.map(n => 
                                  n.id === notification.id ? { ...n, read: true } : n
                                );
                                localStorage.setItem('rankly360_notifications', JSON.stringify(updatedNotifications));
                                return updatedNotifications;
                              });
                              setUnreadCount(prev => {
                                const newCount = Math.max(0, prev - 1);
                                localStorage.setItem('rankly360_unreadCount', newCount.toString());
                                return newCount;
                              });
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'timeline' ? 'bg-blue-400' : 'bg-green-400'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                                <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
                                <p className="text-slate-500 text-xs mt-2">
                                  {new Date(notification.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-sm">
                          No notifications yet
                        </div>
                      )}
                    </div>
                  </div>
                )}
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

        {/* Check if customer has any active projects - if not, show the "no projects" view even if they have completed projects */}
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
                You don't have any projects yet. Browse our local SEO packages to begin improving your Google Maps rankings and get found by local customers.
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs sm:text-sm">Active Projects</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">{customerData?.activeProjects?.length || 0}</p>
                  </div>
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs sm:text-sm">Completed Projects</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">{customerData?.completedProjects?.length || 0}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs sm:text-sm">Total Projects</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {(customerData?.activeProjects?.length || 0) + (customerData?.completedProjects?.length || 0)}
                    </p>
                  </div>
                  <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-3 sm:p-4 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs sm:text-sm">Status</p>
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {customerData?.activeProjects?.length > 0 ? 'Active' : 'Completed'}
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Account Manager Information - Only show if there are active projects */}
            {customerData?.activeProjects && customerData.activeProjects.length > 0 && (
              <div className="bg-slate-800 rounded border border-slate-700 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">Account Manager</p>
                      <p className="text-lg font-semibold text-white">Jacob Guyatt</p>
                      <p className="text-sm text-gray-400">guyattj39@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={openChat}
                    className="inline-flex items-center px-3 py-1.5 border border-purple-500/20 rounded-md text-sm font-medium text-purple-400 hover:bg-purple-500/10 transition-colors relative"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message your account manager
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Active Projects and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-2 bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#3abef9]/20"
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
                        onClick={() => {
                          try {
                            toggleProjectExpansion(project.id);
                          } catch (error) {
                            console.error('Error expanding project:', error);
                          }
                        }}
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

                        {/* Account Manager Information (always visible) */}
                        <div className="mt-3 p-2 bg-blue-600/10 rounded-lg border border-blue-600/20">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-blue-400" />
                            <span className="text-xs text-blue-400 font-medium">Account Manager:</span>
                            <span className="text-xs text-white">Jacob Guyatt</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-blue-400">guyattj39@gmail.com</span>
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
                              <p className="text-white">{project.startDate || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <p className="text-white">{project.estimatedDuration || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Current Phase:</span>
                              <p className="text-[#3abef9] font-medium">{project.currentPhase || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Next Milestone:</span>
                              <p className="text-white">{project.nextMilestone || 'N/A'}</p>
                            </div>
                          </div>

                          {/* Account Manager Information */}
                          <div className="mb-4 p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">
                            <h4 className="text-xs font-medium text-blue-400 mb-2 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Your Account Manager
                            </h4>
                            <div className="space-y-1">
                              <p className="text-white text-xs font-medium">Jacob Guyatt</p>
                              <p className="text-blue-400 text-xs">guyattj39@gmail.com</p>
                              <p className="text-gray-400 text-xs">Available for questions and support</p>
                            </div>
                          </div>

                          {/* Order Progress Timeline for this project */}
                          <div className="mb-4">
                            <h4 className="text-xs font-medium text-gray-300 mb-3 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Order Progress Timeline
                            </h4>
                            <div className="space-y-3">
                              {(() => {
                                try {
                                  const timelineSteps = [
                                    { key: 'orderPlaced', label: 'Order Placed', description: 'Your order has been received' },
                                    { key: 'onboardingForm', label: 'Onboarding Form', description: 'Complete your business information' },
                                    { key: 'orderInProgress', label: 'Order In Progress', description: "We're working on your campaign" },
                                    { key: 'reviewDelivery', label: 'Review Delivery', description: 'Review and approve deliverables' },
                                    { key: 'orderComplete', label: 'Order Complete', description: 'Your campaign is live!' }
                                  ];

                                  return timelineSteps.map((step, index) => {
                                    try {
                                      const timelineData = customerData?.orderTimeline?.[step.key] || {};
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
                                            {step.key === 'onboardingForm' && !isCompleted && (
                                              <button
                                                onClick={() => {
                                                  try {
                                                    const projectName = project.name || 'Service';
                                                    const serviceName = projectName.replace(' Package', '').replace(' package', '');
                                                    openOnboardingForm(serviceName);
                                                  } catch (error) {
                                                    console.error('Error opening onboarding form:', error);
                                                  }
                                                }}
                                                className={`mt-2 font-medium px-3 py-1.5 rounded-md transition-colors duration-200 text-xs ${
                                                  isPendingApproval 
                                                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                                }`}
                                              >
                                                {isPendingApproval ? 'Resubmit Onboarding Form' : 'Complete Onboarding Form'}
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(`Error rendering timeline step ${step.key}:`, error);
                                      return (
                                        <div key={step.key} className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-400">
                                            {index + 1}
                                          </div>
                                          <div className="flex-1">
                                            <span className="text-xs font-medium text-white">{step.label}</span>
                                            <p className="text-slate-400 text-xs">{step.description}</p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  });
                                } catch (error) {
                                  console.error('Error rendering timeline:', error);
                                  return (
                                    <div className="text-gray-400 text-xs">
                                      Timeline loading...
                                    </div>
                                  );
                                }
                              })()}
                            </div>
                          </div>

                          {/* Requirements & Deliverables */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Requirements</h4>
                              <ul className="space-y-1">
                                {(() => {
                                  try {
                                    return project.requirements?.map((req, index) => (
                                      <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                        <div className="w-1 h-1 bg-[#3abef9] rounded-full"></div>
                                        {req}
                                      </li>
                                    )) || [];
                                  } catch (error) {
                                    console.error('Error rendering requirements:', error);
                                    return [];
                                  }
                                })()}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Deliverables</h4>
                              <ul className="space-y-1">
                                {(() => {
                                  try {
                                    return project.deliverables?.map((del, index) => (
                                      <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                        <div className="w-1 h-1 bg-[#3abef9] rounded-full"></div>
                                        {del}
                                      </li>
                                    )) || [];
                                  } catch (error) {
                                    console.error('Error rendering deliverables:', error);
                                    return [];
                                  }
                                })()}
                              </ul>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            {/* Cancel Project button removed - users cannot cancel their own projects */}
                          </div>
                      </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Completed Projects */}
              {customerData?.completedProjects && customerData.completedProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    Completed Projects
                  </h2>
                  <div className="space-y-4">
                    {customerData.completedProjects.map((project) => (
                      <div key={project.id} className="bg-[#2a2a2a] rounded-lg border border-gray-700/50 overflow-hidden">
                        {/* Project Header */}
                        <div className="p-4">
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
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'Completed' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : project.status === 'Cancelled'
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                            <div>
                              <span className="text-gray-400">Started:</span>
                              <p className="text-white">{project.startDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Completed:</span>
                              <p className="text-white">{project.completedDate || project.endDate || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <p className="text-white">{project.estimatedDuration}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Progress:</span>
                              <p className="text-green-400 font-medium">100%</p>
                            </div>
                          </div>

                          {/* Account Manager Information */}
                          <div className="mt-3 p-3 bg-green-600/10 rounded-lg border border-green-600/20">
                            <h4 className="text-xs font-medium text-green-400 mb-2 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Project Manager
                            </h4>
                            <div className="space-y-1">
                              <p className="text-white text-xs font-medium">Jacob Guyatt</p>
                              <p className="text-green-400 text-xs">guyattj39@gmail.com</p>
                              <p className="text-gray-400 text-xs">Managed this project to completion</p>
                            </div>
                          </div>



                          {/* Cancellation Info */}
                          {project.status === 'Cancelled' && project.cancellationReason && (
                            <div className="mt-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                              <h4 className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                Cancellation Details
                              </h4>
                              <p className="text-red-300 text-xs">{project.cancellationReason}</p>
                              {project.billingEndDate && (
                                <p className="text-red-300 text-xs mt-1">
                                  Billing ended: {new Date(project.billingEndDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Deliverables Summary */}
                          {project.deliverables && project.deliverables.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Deliverables Completed</h4>
                              <ul className="space-y-1">
                                {project.deliverables.map((deliverable, index) => (
                                  <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

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


            </div>
          </>
        )}
        

        
        {/* Completed Projects - Always show this section */}
        {(() => {
          console.log('🔍 Checking for completed projects...');
          console.log('📊 customerData:', customerData);
          console.log('📊 completedProjects:', customerData?.completedProjects);
          console.log('📊 completedProjects length:', customerData?.completedProjects?.length);
          return customerData?.completedProjects && customerData.completedProjects.length > 0;
        })() && (
          <div className="mt-6">
            <div className="bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20">
              <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                Completed Projects
              </h2>
              <div className="space-y-4">
                {customerData.completedProjects.map((project) => (
                  <div key={project.id} className="bg-[#2a2a2a] rounded-lg border border-gray-700/50 overflow-hidden">
                    <div className="p-4">
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
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                        <div>
                          <span className="text-gray-400">Started:</span>
                          <p className="text-white">{project.startDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Completed:</span>
                          <p className="text-white">{project.completedDate || project.endDate || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Duration:</span>
                          <p className="text-white">{project.estimatedDuration}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Progress:</span>
                          <p className="text-green-400 font-medium">100%</p>
                        </div>
                      </div>
                      {project.deliverables && project.deliverables.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-xs font-medium text-gray-300 mb-2">Deliverables Completed</h4>
                          <ul className="space-y-1">
                            {project.deliverables.map((deliverable, index) => (
                              <li key={index} className="text-xs text-gray-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Cancel Membership Confirmation Modal */}
      {/* This modal is no longer needed as cancel functionality is removed */}

      {/* Onboarding Form Modal */}
      {showOnboardingForm && (
        <OnboardingForm
          isOpen={showOnboardingForm}
          service={currentService}
          onClose={() => setShowOnboardingForm(false)}
          onSubmit={handleOnboardingSubmit}
        />
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-white">Chat with Jacob Guyatt</h3>
                <p className="text-sm text-gray-400">Your Account Manager</p>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
              {chatMessages.length > 0 ? (
                chatMessages.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'admin'
                          ? 'bg-gray-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                  <p className="text-xs mt-2">Messages are saved and will persist between sessions.</p>
                </div>
              )}
              <div ref={chatMessagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      sendMessage(newMessage.trim());
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    if (newMessage.trim()) {
                      sendMessage(newMessage.trim());
                    }
                  }}
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

export default Dashboard; 