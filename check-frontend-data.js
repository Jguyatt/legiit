// Check what data is currently in the frontend
console.log('🔍 Checking frontend data...');

// Simulate what the frontend would see
const frontendData = {
  customerData: localStorage.getItem('customerData'),
  users: localStorage.getItem('users'),
  onboardingSubmissions: localStorage.getItem('onboarding-submissions'),
  customerToken: localStorage.getItem('customerToken')
};

console.log('📊 Frontend localStorage data:');
console.log('Customer Data:', frontendData.customerData ? JSON.parse(frontendData.customerData) : 'Not found');
console.log('Users:', frontendData.users ? JSON.parse(frontendData.users) : 'Not found');
console.log('Onboarding Submissions:', frontendData.onboardingSubmissions ? JSON.parse(frontendData.onboardingSubmissions) : 'Not found');
console.log('Customer Token:', frontendData.customerToken || 'Not found');

// Check for any customer data keys
const allKeys = Object.keys(localStorage);
const customerKeys = allKeys.filter(key => key.includes('customer'));
console.log('\n🔑 All customer-related keys:', customerKeys);

customerKeys.forEach(key => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    console.log(`📁 ${key}:`, data);
  } catch (e) {
    console.log(`📁 ${key}:`, localStorage.getItem(key));
  }
}); 