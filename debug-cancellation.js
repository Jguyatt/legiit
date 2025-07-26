const axios = require('axios');

async function debugCancellation() {
  try {
    console.log('🔍 DEBUGGING PROJECT CANCELLATION');
    console.log('==================================\n');
    
    // Step 1: Check what customers exist
    console.log('1️⃣ Checking existing customers...');
    const allCustomersResponse = await axios.get('https://rankly360.up.railway.app/api/all-customers');
    
    if (allCustomersResponse.data.success) {
      const customers = allCustomersResponse.data.customers;
      console.log(`📊 Found ${Object.keys(customers).length} customers`);
      
      // Find a customer with a project
      let testCustomer = null;
      let testProjectId = null;
      
      for (const [key, customer] of Object.entries(customers)) {
        if (customer.activeProjects && customer.activeProjects.length > 0) {
          testCustomer = customer;
          testProjectId = customer.activeProjects[0].id;
          console.log(`✅ Found test customer: ${customer.email}`);
          console.log(`📊 Project ID: ${testProjectId}`);
          console.log(`📊 Project status: ${customer.activeProjects[0].status}`);
          break;
        }
      }
      
      if (testCustomer && testProjectId) {
        // Step 2: Test cancellation endpoint
        console.log('\n2️⃣ Testing cancellation endpoint...');
        console.log('Sending request to:', 'https://rankly360.up.railway.app/api/cancel-project');
        console.log('Payload:', {
          customerEmail: testCustomer.email,
          projectId: testProjectId,
          cancelledBy: 'Debug Test'
        });
        
        const cancelResponse = await axios.post('https://rankly360.up.railway.app/api/cancel-project', {
          customerEmail: testCustomer.email,
          projectId: testProjectId,
          cancelledBy: 'Debug Test'
        });
        
        console.log('Response status:', cancelResponse.status);
        console.log('Response data:', cancelResponse.data);
        
        if (cancelResponse.data.success) {
          console.log('✅ Cancellation successful!');
          
          // Step 3: Verify the cancellation
          console.log('\n3️⃣ Verifying cancellation...');
          const verifyResponse = await axios.get(`https://rankly360.up.railway.app/api/customer-data/${testCustomer.email}`);
          
          if (verifyResponse.data.success) {
            const updatedCustomer = verifyResponse.data.data;
            console.log('✅ Customer data updated');
            console.log(`📊 Subscription status: ${updatedCustomer.subscriptionStatus}`);
            console.log(`📊 Project status: ${updatedCustomer.activeProjects?.[0]?.status}`);
          }
        } else {
          console.log('❌ Cancellation failed:', cancelResponse.data);
        }
        
      } else {
        console.log('❌ No customers with projects found');
      }
      
    } else {
      console.log('❌ Failed to get customers');
    }
    
  } catch (error) {
    console.error('\n❌ DEBUG FAILED!');
    console.error('Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
  }
}

debugCancellation(); 