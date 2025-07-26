const axios = require('axios');

async function testFrontendBackendConnection() {
  try {
    console.log('🧪 Testing frontend-backend connection...');
    
    // Test if frontend is accessible
    console.log('\n1️⃣ Testing frontend accessibility...');
    try {
      const frontendResponse = await axios.get('http://localhost:3000');
      console.log('✅ Frontend is running on port 3000');
    } catch (error) {
      console.log('❌ Frontend not accessible on port 3000');
      return;
    }
    
    // Test backend API endpoints
    console.log('\n2️⃣ Testing backend API endpoints...');
    const backendUrl = 'https://rankly360.up.railway.app';
    
    // Test health endpoint
    const healthResponse = await axios.get(`${backendUrl}/api/health`);
    console.log('✅ Backend health check passed');
    
    // Test all customers endpoint
    const customersResponse = await axios.get(`${backendUrl}/api/all-customers`);
    console.log('✅ Backend customers endpoint working');
    
    // Test purchases endpoint
    const purchasesResponse = await axios.get(`${backendUrl}/api/purchases`);
    console.log('✅ Backend purchases endpoint working');
    
    console.log('\n🎉 Frontend-backend connection test passed!');
    console.log('\n📋 How to test the complete flow:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Sign up for an account or log in');
    console.log('3. Go to the Packages page');
    console.log('4. Click on any service to make a purchase');
    console.log('5. Complete the Stripe payment');
    console.log('6. Check if the purchase appears in your dashboard');
    console.log('7. Check if it appears in the admin dashboard');
    
    console.log('\n🔗 Frontend URL: http://localhost:3000');
    console.log('🔗 Backend URL: https://rankly360.up.railway.app');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testFrontendBackendConnection(); 