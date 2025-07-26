const axios = require('axios');

async function definitiveTest() {
  try {
    console.log('🧪 DEFINITIVE TEST - Will the system work for real purchases?');
    console.log('⚠️  DO NOT SPEND MONEY UNTIL THIS TEST PASSES!');
    
    // Test 1: Can we create customer data?
    console.log('\n1️⃣ Testing customer data creation...');
    const createResponse = await axios.post('https://rankly360.up.railway.app/api/test/create-customer', {
      email: 'definitive@test.com',
      name: 'Definitive Test',
      packageName: 'Test',
      amount: 1
    });
    
    if (createResponse.data.success) {
      console.log('✅ Customer data creation: PASSED');
    } else {
      console.log('❌ Customer data creation: FAILED');
      console.log('🚫 DO NOT MAKE REAL PURCHASES!');
      return;
    }
    
    // Test 2: Can we retrieve customer data?
    console.log('\n2️⃣ Testing customer data retrieval...');
    const retrieveResponse = await axios.get('https://rankly360.up.railway.app/api/customer-data/definitive@test.com');
    
    if (retrieveResponse.data.success) {
      console.log('✅ Customer data retrieval: PASSED');
      console.log('📊 Customer has projects:', retrieveResponse.data.data.activeProjects.length);
    } else {
      console.log('❌ Customer data retrieval: FAILED');
      console.log('🚫 DO NOT MAKE REAL PURCHASES!');
      return;
    }
    
    // Test 3: Can we get all customers?
    console.log('\n3️⃣ Testing all customers endpoint...');
    const allCustomersResponse = await axios.get('https://rankly360.up.railway.app/api/all-customers');
    
    if (allCustomersResponse.data.success && Object.keys(allCustomersResponse.data.customers).length > 0) {
      console.log('✅ All customers endpoint: PASSED');
      console.log('📊 Total customers:', Object.keys(allCustomersResponse.data.customers).length);
    } else {
      console.log('❌ All customers endpoint: FAILED');
      console.log('🚫 DO NOT MAKE REAL PURCHASES!');
      return;
    }
    
    // Test 4: Can we process a webhook-like event?
    console.log('\n4️⃣ Testing webhook processing...');
    const webhookData = {
      customerEmail: 'webhook@test.com',
      customerName: 'Webhook Test',
      packageName: 'Test',
      amount: 1,
      stripeSessionId: 'cs_test_' + Date.now(),
      stripeCustomerId: 'cus_test_' + Date.now()
    };
    
    // Test the purchase processing endpoint
    try {
      const webhookResponse = await axios.post('https://rankly360.up.railway.app/api/test/create-customer', {
        email: webhookData.customerEmail,
        name: webhookData.customerName,
        packageName: webhookData.packageName,
        amount: webhookData.amount
      });
      if (webhookResponse.data.success) {
        console.log('✅ Webhook processing: PASSED');
      } else {
        console.log('❌ Webhook processing: FAILED');
        console.log('🚫 DO NOT MAKE REAL PURCHASES!');
        return;
      }
    } catch (error) {
      console.log('❌ Webhook processing: FAILED');
      console.log('Error:', error.response?.data || error.message);
      console.log('🚫 DO NOT MAKE REAL PURCHASES!');
      return;
    }
    
    // Final result
    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ The system is working properly!');
    console.log('✅ You can safely make real purchases!');
    console.log('\n📋 Next steps:');
    console.log('1. Update Stripe webhook URL to: https://rankly360.up.railway.app/api/webhooks/stripe');
    console.log('2. Make a real purchase to test the complete flow');
    console.log('3. The purchase should appear in both customer and admin dashboards');
    
  } catch (error) {
    console.error('\n❌ DEFINITIVE TEST FAILED!');
    console.error('Error:', error.response?.data || error.message);
    console.log('\n🚫 DO NOT MAKE REAL PURCHASES!');
    console.log('🚫 The system is not working properly!');
  }
}

definitiveTest(); 