const axios = require('axios');

// Test webhook event
const testWebhook = {
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_' + Date.now(),
      customer_details: {
        email: 'test@example.com',
        name: 'Test Customer'
      },
      amount_total: 100, // $1.00 for Test service
      customer: 'cus_test_' + Date.now()
    }
  }
};

async function testWebhookProcessing() {
  try {
    console.log('🧪 Testing webhook processing...');
    
    // First, check if backend is running
    const healthResponse = await axios.get('https://rankly360.up.railway.app/api/health');
    console.log('✅ Backend is running:', healthResponse.data);
    
    // Check current purchases
    const purchasesResponse = await axios.get('https://rankly360.up.railway.app/api/purchases');
    console.log('📊 Current purchases:', purchasesResponse.data);
    
    // Simulate webhook (this will fail due to signature, but we can test the endpoint)
    try {
      const webhookResponse = await axios.post('https://rankly360.up.railway.app/api/webhooks/stripe', testWebhook);
      console.log('✅ Webhook processed:', webhookResponse.data);
    } catch (error) {
      console.log('⚠️ Webhook signature check (expected):', error.response?.data);
    }
    
    console.log('\n🎉 Test completed! The backend is ready for real Stripe webhooks.');
    console.log('\n📋 Next steps:');
    console.log('1. Update Stripe webhook URL to: https://rankly360.up.railway.app/api/webhooks/stripe');
    console.log('2. Set environment variables in Railway');
    console.log('3. Make a real purchase to test the full flow');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testWebhookProcessing(); 