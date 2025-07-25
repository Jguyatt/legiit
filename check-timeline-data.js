// Check timeline data in localStorage
console.log('🔍 Checking timeline data...');

// Check all possible customer data keys
const possibleKeys = ['customerData', 'billy-customer-data'];
let customerData = null;
let foundKey = null;

for (const key of possibleKeys) {
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (data && data.email) {
    customerData = data;
    foundKey = key;
    console.log(`✅ Found customer data in: ${key}`);
    break;
  }
}

if (!customerData) {
  // Check all localStorage keys for customer data
  const allKeys = Object.keys(localStorage);
  for (const key of allKeys) {
    if (key.includes('customer')) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (data && data.email) {
          customerData = data;
          foundKey = key;
          console.log(`✅ Found customer data in: ${key}`);
          break;
        }
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}

if (customerData) {
  console.log('\n📊 Customer Data:');
  console.log('Email:', customerData.email);
  console.log('Name:', customerData.name);
  
  console.log('\n📈 Timeline Data:');
  console.log(JSON.stringify(customerData.orderTimeline, null, 2));
  
  console.log('\n🚀 Active Projects:');
  if (customerData.activeProjects) {
    customerData.activeProjects.forEach((project, index) => {
      console.log(`Project ${index + 1}:`);
      console.log('  Name:', project.name);
      console.log('  Status:', project.status);
      console.log('  Progress:', project.progress + '%');
      console.log('  Current Phase:', project.currentPhase);
      console.log('  Next Milestone:', project.nextMilestone);
    });
  }
  
  // Calculate expected progress
  const timelineSteps = ['orderPlaced', 'onboardingForm', 'orderInProgress', 'reviewDelivery', 'orderComplete'];
  const completedSteps = timelineSteps.filter(step => 
    customerData.orderTimeline?.[step]?.completed || customerData.orderTimeline?.[step]?.status === 'completed'
  ).length;
  const expectedProgress = Math.round((completedSteps / timelineSteps.length) * 100);
  
  console.log('\n🧮 Progress Calculation:');
  console.log('Completed steps:', completedSteps);
  console.log('Total steps:', timelineSteps.length);
  console.log('Expected progress:', expectedProgress + '%');
  
  console.log('\n📋 Step Details:');
  timelineSteps.forEach(step => {
    const stepData = customerData.orderTimeline?.[step] || {};
    const status = stepData.completed ? '✅ COMPLETED' : 
                   stepData.status === 'in_progress' ? '🟡 IN PROGRESS' : '⏳ PENDING';
    console.log(`${step}: ${status}`);
  });
  
} else {
  console.log('❌ No customer data found in localStorage');
} 