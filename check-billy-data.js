// Check Billy Bars Data and Simulate Purchase
// Run this in the browser console

console.log('🔍 Checking Billy Bars data...');

// Check current localStorage data
const customerData = localStorage.getItem('customerData');
const users = JSON.parse(localStorage.getItem('users') || '{}');
const onboardingSubmissions = JSON.parse(localStorage.getItem('onboardingSubmissions') || '[]');

console.log('📊 Current localStorage data:');
console.log('Customer Data:', customerData ? JSON.parse(customerData) : 'None');
console.log('Users:', users);
console.log('Onboarding Submissions:', onboardingSubmissions);

// Check if Billy Bars exists
const billyUser = users['billy@billybars.com'] || users['billybars07@gmail.com'];
console.log('👤 Billy Bars User Data:', billyUser);

// Simulate a new purchase for Billy Bars
console.log('\n🛒 Simulating new purchase for Billy Bars...');

const newBillyData = {
  name: 'Billy Bars',
  email: 'billy@billybars.com',
  business: 'Billy Bars',
  package: 'Map PowerBoost',
  monthlyRate: 249,
  activeProjects: [
    {
      id: 1,
      name: 'Map PowerBoost Package',
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      progress: 20,
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
  subscription: {
    status: 'Active',
    plan: 'Map PowerBoost Package',
    monthlyRate: 249,
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  billing: {
    plan: 'Map PowerBoost Package',
    amount: '$249',
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Active'
  }
};

// Create/update Billy Bars user account
const billyUserAccount = {
  email: 'billy@billybars.com',
  password: 'password123',
  name: 'Billy Bars',
  businessName: 'Billy Bars',
  activeClients: 1,
  websiteUrl: 'https://billybars.com',
  isAdmin: false,
  emailVerified: true,
  createdAt: new Date().toISOString(),
  projects: []
};

// Store the data
localStorage.setItem('customerData', JSON.stringify(newBillyData));
localStorage.setItem('customerToken', 'billy_customer_token_' + Date.now());

// Update users
users['billy@billybars.com'] = billyUserAccount;
localStorage.setItem('users', JSON.stringify(users));

// Create onboarding submission
const billyOnboardingSubmission = {
  id: 'billy_submission_' + Date.now(),
  submittedAt: new Date().toISOString(),
  status: 'pending_approval',
  service: 'Map PowerBoost Package',
  formData: {
    firstName: 'Billy',
    lastName: 'Bars',
    email: 'billy@billybars.com',
    businessName: 'Billy Bars',
    website: 'https://billybars.com',
    targetKeyword: 'bars near me',
    supportingKeywords: 'local bars, nightlife, entertainment',
    googleBusinessProfile: 'https://business.google.com/billy-bars',
    address: '123 Main St, City, State 12345',
    phoneNumber: '(555) 123-4567',
    serviceAreas: 'Local area, surrounding cities',
    businessDescription: 'Premier entertainment venue and bar'
  }
};

// Add to onboarding submissions
onboardingSubmissions.push(billyOnboardingSubmission);
localStorage.setItem('onboardingSubmissions', JSON.stringify(onboardingSubmissions));

console.log('✅ Billy Bars purchase data updated!');
console.log('📊 New Customer Data:', newBillyData);
console.log('👤 New User Account:', billyUserAccount);
console.log('📝 New Onboarding Submission:', billyOnboardingSubmission);

// Dispatch events to notify admin dashboard
window.dispatchEvent(new CustomEvent('userAdded', { 
  detail: { user: billyUserAccount } 
}));

window.dispatchEvent(new CustomEvent('purchaseCompleted', { 
  detail: { customerData: newBillyData } 
}));

window.dispatchEvent(new CustomEvent('onboardingSubmitted', { 
  detail: { submission: billyOnboardingSubmission } 
}));

console.log('\n🎯 Next Steps:');
console.log('1. Refresh the admin dashboard');
console.log('2. Check "All Users" section for Billy Bars');
console.log('3. Check "Onboarding Approval" section');
console.log('4. Check "Active Clients" section');

console.log('\n🔧 If still not showing:');
console.log('- Check browser console for errors');
console.log('- Verify admin dashboard is loading data properly');
console.log('- Check if there are any API errors'); 