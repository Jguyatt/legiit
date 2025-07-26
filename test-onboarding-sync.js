const axios = require('axios');

async function testOnboardingSync() {
  try {
    console.log('🧪 Testing onboarding submission sync...');
    
    // Step 1: Submit an onboarding form
    console.log('\n1️⃣ Submitting onboarding form...');
    const submissionData = {
      id: 'submission_' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending_approval',
      service: 'Test',
      customerEmail: 'test@example.com',
      customerName: 'Test Customer',
      formData: {
        businessName: 'Test Business',
        website: 'https://test.com',
        targetKeyword: 'test keyword'
      }
    };
    
    const submitResponse = await axios.post('https://rankly360.up.railway.app/api/onboarding-submission', submissionData);
    
    if (submitResponse.data.success) {
      console.log('✅ Onboarding submission saved to backend');
    } else {
      console.log('❌ Failed to save onboarding submission');
      return;
    }
    
    // Step 2: Check if it appears in all-customers endpoint
    console.log('\n2️⃣ Checking if submission appears in admin data...');
    const allCustomersResponse = await axios.get('https://rankly360.up.railway.app/api/all-customers');
    
    if (allCustomersResponse.data.success) {
      const submissions = allCustomersResponse.data.onboardingSubmissions || [];
      console.log('📊 Total onboarding submissions:', submissions.length);
      
      const testSubmission = submissions.find(s => s.customerEmail === 'test@example.com');
      if (testSubmission) {
        console.log('✅ Test submission found in admin data!');
        console.log('📋 Submission details:', {
          service: testSubmission.service,
          status: testSubmission.status,
          customerName: testSubmission.customerName
        });
      } else {
        console.log('❌ Test submission NOT found in admin data');
        console.log('🚫 Admin dashboard will not show this submission!');
        return;
      }
    } else {
      console.log('❌ Failed to get admin data');
      return;
    }
    
    console.log('\n🎉 ONBOARDING SYNC TEST PASSED!');
    console.log('✅ Backend is working correctly');
    console.log('✅ Admin dashboard should show submissions');
    
  } catch (error) {
    console.error('\n❌ ONBOARDING SYNC TEST FAILED!');
    console.error('Error:', error.response?.data || error.message);
  }
}

testOnboardingSync(); 