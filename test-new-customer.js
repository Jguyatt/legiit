// Test script to simulate adding a new customer
console.log('🧪 Testing new customer addition...');

// Simulate a new customer being added
const newCustomerData = {
  name: 'Test Customer ' + Date.now(),
  email: 'test' + Date.now() + '@example.com',
  business: 'Test Business ' + Date.now(),
  subscriptionStatus: 'Active',
  activeProjects: [
    {
      id: Date.now(),
      name: 'Test Package',
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      progress: 20,
      type: 'SEO',
      category: 'Local SEO',
      requirements: ['Business Information'],
      estimatedDuration: '30 days',
      deliverables: ['SEO Optimization', 'Rankings Report']
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
      message: 'Purchase completed: Test Package',
      date: new Date().toISOString().split('T')[0]
    }
  ]
};

// Store the customer data
localStorage.setItem('customerData', JSON.stringify(newCustomerData));

// Dispatch the customerAdded event
window.dispatchEvent(new CustomEvent('customerAdded', {
  detail: { customerData: newCustomerData }
}));

console.log('✅ Test customer added:', newCustomerData.email);
console.log('📧 Email:', newCustomerData.email);
console.log('👤 Name:', newCustomerData.name);
console.log('🏢 Business:', newCustomerData.business);

// Check if admin dashboard is listening
console.log('🔍 Check the admin dashboard - it should now show the new customer!'); 