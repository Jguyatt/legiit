// Test Automatic Purchase Processing
// Run this in the browser console to simulate a Stripe purchase

console.log('🧪 Testing automatic purchase processing...');

// Simulate a successful Stripe purchase redirect
const testPurchaseData = {
  customerEmail: 'billy@billybars.com',
  customerName: 'Billy Bars',
  packageName: 'Map PowerBoost',
  amount: 249,
  stripeSessionId: 'cs_test_' + Date.now(),
  stripeCustomerId: 'cus_' + Date.now()
};

console.log('📦 Test purchase data:', testPurchaseData);

// Import and use the purchase handler
import('./src/utils/purchaseHandler.js').then(({ purchaseHandler }) => {
  console.log('🔄 Processing test purchase...');
  
  const result = purchaseHandler.handleSuccessfulPurchase(testPurchaseData);
  
  console.log('✅ Test purchase processed:', result);
  console.log('\n🎯 What should happen:');
  console.log('1. Customer data should be stored in localStorage');
  console.log('2. User account should be updated');
  console.log('3. Onboarding submission should be created');
  console.log('4. Dashboard should show active project');
  
  console.log('\n📋 Next steps:');
  console.log('1. Refresh the dashboard page');
  console.log('2. Check if Billy now has an active project');
  console.log('3. Check admin dashboard for new client');
  
}).catch(error => {
  console.error('❌ Error testing purchase:', error);
  
  // Fallback: manually create the purchase data
  console.log('🔄 Creating purchase data manually...');
  
  const customerData = {
    name: 'Billy Bars',
    email: 'billy@billybars.com',
    business: 'Billy Bars',
    package: 'Map PowerBoost',
    monthlyRate: 249,
    activeProjects: [
      {
        id: Date.now(),
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
    }
  };
  
  // Store the data
  localStorage.setItem('customerData', JSON.stringify(customerData));
  localStorage.setItem('customerToken', 'test_customer_token_' + Date.now());
  
  console.log('✅ Manual purchase data created:', customerData);
  console.log('🔄 Refresh the dashboard to see the changes!');
}); 