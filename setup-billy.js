// Setup Billy's purchase data
console.log('Setting up Billy\'s purchase data...');

// Simulate Billy's purchase
const billyData = {
  name: 'Billy Bars',
  email: 'billy@billybars.com',
  activeProjects: [
    {
      id: 1,
      name: 'Map PowerBoost Package',
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      progress: 20, // 20% - 1 out of 5 steps completed
      nextUpdate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ],
  orderTimeline: {
    orderPlaced: {
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      completed: true
    },
    onboardingForm: {
      status: 'pending',
      date: null,
      completed: false
    },
    orderInProgress: {
      status: 'pending',
      date: null,
      completed: false
    },
    reviewDelivery: {
      status: 'pending',
      date: null,
      completed: false
    },
    orderComplete: {
      status: 'pending',
      date: null,
      completed: false
    }
  },
  recentActivity: [
    {
      type: 'purchase',
      message: 'Map PowerBoost Package purchased successfully',
      date: new Date().toISOString().split('T')[0]
    }
  ],
  subscription: {
    status: 'Active',
    plan: 'Map PowerBoost Package',
    monthlyRate: 997,
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }
};

// Create Billy as a user account
const billyUser = {
  email: 'billy@billybars.com',
  password: 'password123', // In production, this should be hashed
  name: 'Billy Bars',
  businessName: 'Billy Bars',
  activeClients: 1,
  websiteUrl: 'https://billybars.com',
  isAdmin: false,
  emailVerified: true,
  createdAt: new Date().toISOString(),
  projects: []
};

// Store in localStorage
if (typeof window !== 'undefined') {
  // Store customer data
  localStorage.setItem('customerData', JSON.stringify(billyData));
  localStorage.setItem('customerToken', 'demo_customer_token_' + Date.now());
  
  // Store user account
  const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
  existingUsers['billy@billybars.com'] = billyUser;
  localStorage.setItem('users', JSON.stringify(existingUsers));
  
  console.log('Billy\'s data stored in localStorage');
  console.log('Customer Data:', billyData);
  console.log('User Account:', billyUser);
  console.log('Total users in system:', Object.keys(existingUsers).length);
} else {
  console.log('This script needs to run in a browser environment');
  console.log('Billy\'s data structure:', JSON.stringify(billyData, null, 2));
  console.log('Billy\'s user account:', JSON.stringify(billyUser, null, 2));
} 