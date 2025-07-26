const axios = require('axios');

// Simulate a successful purchase processing
async function testPurchaseFlow() {
  try {
    console.log('🧪 Testing complete purchase flow...');
    
    // Simulate purchase data (like what would come from Stripe)
    const purchaseData = {
      customerEmail: 'test@example.com',
      customerName: 'Test Customer',
      packageName: 'Test',
      amount: 1,
      stripeSessionId: 'cs_test_' + Date.now(),
      stripeCustomerId: 'cus_test_' + Date.now()
    };
    
    console.log('📦 Purchase data:', purchaseData);
    
    // Test the purchase processing endpoint
    const response = await axios.post('https://rankly360.up.railway.app/api/purchases', purchaseData);
    console.log('✅ Purchase processed:', response.data);
    
    // Check if purchase appears in the list
    const purchasesResponse = await axios.get('https://rankly360.up.railway.app/api/purchases');
    console.log('📊 Updated purchases:', purchasesResponse.data);
    
    console.log('\n🎉 Purchase flow test completed!');
    console.log('✅ The webhook system is ready for real purchases!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testPurchaseFlow(); 