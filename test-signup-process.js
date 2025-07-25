// Test script to simulate the complete signup process
console.log('🧪 Testing complete signup process...');

// Simulate signup form data
const signupData = {
  name: 'Test User ' + Date.now(),
  email: 'testuser' + Date.now() + '@example.com',
  businessName: 'Test Business ' + Date.now(),
  activeClients: '5',
  websiteUrl: 'https://testbusiness.com',
  password: 'password123',
  confirmPassword: 'password123'
};

console.log('📝 Signup data:', signupData);

// Create customer data structure (same as in Signup.js)
const customerData = {
  name: signupData.name,
  email: signupData.email,
  business: signupData.businessName,
  businessName: signupData.businessName,
  firstName: signupData.name.split(' ')[0] || signupData.name,
  lastName: signupData.name.split(' ').slice(1).join(' ') || '',
  subscriptionStatus: 'Active',
  activeProjects: [],
  orderTimeline: {
    orderPlaced: {
      status: 'pending',
      date: null,
      completed: false
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
      type: 'account_created',
      message: 'Account created successfully',
      date: new Date().toISOString().split('T')[0]
    }
  ]
};

// Store customer data with unique key
const customerKey = `customer-${signupData.email.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
localStorage.setItem(customerKey, JSON.stringify(customerData));

console.log('💾 Customer data stored with key:', customerKey);

// Dispatch the customerAdded event
window.dispatchEvent(new CustomEvent('customerAdded', {
  detail: { customerData }
}));

console.log('📡 customerAdded event dispatched');

// Verify the data was stored
const storedData = JSON.parse(localStorage.getItem(customerKey));
console.log('✅ Verification - stored data:', storedData ? 'Found' : 'Not found');

// Check all customer keys in localStorage
const allKeys = Object.keys(localStorage);
const customerKeys = allKeys.filter(key => key.includes('customer'));
console.log('🔍 All customer keys in localStorage:', customerKeys);

console.log('🎯 Test completed! Check the admin dashboard - it should now show the new customer.');
console.log('📧 Email:', signupData.email);
console.log('👤 Name:', signupData.name);
console.log('🏢 Business:', signupData.businessName); 