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
      progress: 25,
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
      type: 'purchase_completed', 
      message: 'Purchase completed: Map PowerBoost Package', 
      date: new Date().toISOString().split('T')[0] 
    }
  ],
  subscriptionStatus: 'Active - Map PowerBoost',
  business: 'Billy Bars',
  package: 'Map PowerBoost',
  monthlyRate: 279
};

// Store in localStorage for the app to use
if (typeof window !== 'undefined') {
  localStorage.setItem('customerData', JSON.stringify(billyData));
  localStorage.setItem('customerToken', 'demo_customer_token_' + Date.now());
  console.log('Billy\'s purchase data stored in localStorage!');
  console.log('Customer data:', billyData);
} else {
  console.log('Billy\'s purchase simulated!');
  console.log('Customer data:', JSON.stringify(billyData, null, 2));
  console.log('\nTo view the dashboards:');
  console.log('1. Start the React app: npm start');
  console.log('2. Login as Billy: billy@billybars.com (any password)');
  console.log('3. Login as Admin: guyattj39@gmail.com / Jg1091775');
} 