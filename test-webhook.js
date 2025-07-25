const axios = require('axios');

// Test the webhook endpoint
async function testWebhook() {
  try {
    console.log('🧪 Testing webhook endpoint...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test purchases endpoint
    const purchasesResponse = await axios.get('http://localhost:3001/api/purchases');
    console.log('✅ Purchases endpoint working:', purchasesResponse.data);
    
    console.log('\n🎉 Webhook server is ready!');
    console.log('📝 Next steps:');
    console.log('1. In Stripe webhooks, set the endpoint URL to: http://localhost:3001/api/webhooks/stripe');
    console.log('2. Select checkout.session.completed event');
    console.log('3. Copy the webhook secret and set it as STRIPE_WEBHOOK_SECRET environment variable');
    console.log('4. Test a purchase to see it appear in your dashboard!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure to run: npm run server');
  }
}

testWebhook(); 