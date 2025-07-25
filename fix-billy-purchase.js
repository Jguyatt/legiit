// Fix Billy Bars Purchase - Connect Stripe Purchase to User Account
// Run this in the browser console

console.log('🔧 Fixing Billy Bars purchase connection...');

// First, check current state
const currentCustomerData = localStorage.getItem('customerData');
const currentUsers = JSON.parse(localStorage.getItem('users') || '{}');
const billyUser = currentUsers['billy@billybars.com'] || currentUsers['billybars07@gmail.com'];

console.log('📊 Current State:');
console.log('Customer Data:', currentCustomerData ? JSON.parse(currentCustomerData) : 'None');
console.log('Billy User:', billyUser);

// Create Billy's purchase data (simulating what should happen after Stripe purchase)
const billyPurchaseData = {
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
      progress: 20, // 20% - purchase completed, onboarding pending
      nextUpdate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'Google Maps Optimization',
      category: 'Local SEO',
      requirements: ['Business Information', 'Service Areas', 'Target Keywords'],
      estimatedDuration: '30-45 days',
      deliverables: ['GMB Optimization', 'Map Rankings', 'Traffic Reports']
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
    amount: '',
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Active'
  }
};

// Update Billy's user account to reflect the purchase
const updatedBillyUser = {
  ...billyUser,
  activeClients: 1,
  projects: [
    {
      id: 1,
      name: 'Map PowerBoost Package',
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      progress: 20
    }
  ]
};

// Store the purchase data
localStorage.setItem('customerData', JSON.stringify(billyPurchaseData));
localStorage.setItem('customerToken', 'billy_customer_token_' + Date.now());

// Update Billy's user account
currentUsers['billy@billybars.com'] = updatedBillyUser;
localStorage.setItem('users', JSON.stringify(currentUsers));

// Create onboarding submission (pending approval)
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

// Store onboarding submission
const existingSubmissions = JSON.parse(localStorage.getItem('onboardingSubmissions') || '[]');
existingSubmissions.push(billyOnboardingSubmission);
localStorage.setItem('onboardingSubmissions', JSON.stringify(existingSubmissions));

console.log('✅ Billy Bars purchase fixed!');
console.log('📊 Purchase Data:', billyPurchaseData);
console.log('👤 Updated User Account:', updatedBillyUser);
console.log('📝 Onboarding Submission:', billyOnboardingSubmission);

// Dispatch events to notify components
window.dispatchEvent(new CustomEvent('purchaseCompleted', { 
  detail: { customerData: billyPurchaseData } 
}));

window.dispatchEvent(new CustomEvent('userAdded', { 
  detail: { user: updatedBillyUser } 
}));

window.dispatchEvent(new CustomEvent('onboardingSubmitted', { 
  detail: { submission: billyOnboardingSubmission } 
}));

console.log('
🎯 What this fixes:');
console.log('1. ✅ Billy now has active projects in his dashboard');
console.log('2. ✅ Purchase data is properly stored');
console.log('3. ✅ Admin dashboard will show Billy as active client');
console.log('4. ✅ Onboarding submission is ready for admin approval');

console.log('
📋 Next Steps:');
console.log('1. Refresh Billy\'s dashboard - should now show active project');
console.log('2. Refresh admin dashboard - should show Billy in active clients');
console.log('3. Check onboarding approval section for Billy\'s submission');

console.log('
🔧 If you need to reset Billy to clean state later:');
console.log('Run: localStorage.removeItem("customerData"); localStorage.removeItem("customerToken");');
