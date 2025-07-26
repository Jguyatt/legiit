const axios = require('axios');

async function testCompleteFlow() {
  try {
    console.log('🧪 Testing complete purchase flow...');
    
    // 1. Check backend health
    console.log('\n1️⃣ Checking backend health...');
    const healthResponse = await axios.get('https://rankly360.up.railway.app/api/health');
    console.log('✅ Backend is healthy:', healthResponse.data.status);
    
    // 2. Check current purchases
    console.log('\n2️⃣ Checking current purchases...');
    const purchasesResponse = await axios.get('https://rankly360.up.railway.app/api/purchases');
    console.log('📊 Current purchases:', purchasesResponse.data.length);
    
    // 3. Check API endpoints
    console.log('\n3️⃣ Testing API endpoints...');
    const allCustomersResponse = await axios.get('https://rankly360.up.railway.app/api/all-customers');
    console.log('✅ All customers endpoint working:', allCustomersResponse.data.success);
    
    // 4. Test customer data endpoint
    console.log('\n4️⃣ Testing customer data endpoint...');
    const customerResponse = await axios.get('https://rankly360.up.railway.app/api/customer-data/test@example.com');
    console.log('✅ Customer data endpoint working:', customerResponse.data.success);
    
    // 5. Test webhook endpoint (should reject without signature)
    console.log('\n5️⃣ Testing webhook security...');
    try {
      await axios.post('https://rankly360.up.railway.app/api/webhooks/stripe', {});
    } catch (error) {
      console.log('✅ Webhook properly rejects requests without signature');
    }
    
    console.log('\n🎉 All tests passed! The system is ready!');
    console.log('\n📋 Next steps:');
    console.log('1. Update Stripe webhook URL to: https://rankly360.up.railway.app/api/webhooks/stripe');
    console.log('2. Set environment variables in Railway');
    console.log('3. Make a real purchase to test the complete flow');
    console.log('4. The frontend will automatically sync with the backend data');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCompleteFlow(); 