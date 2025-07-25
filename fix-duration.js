// Script to fix duration in localStorage
console.log('Checking localStorage data...');

// This script should be run in the browser console
// Open browser dev tools and run this script

const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
console.log('Current customerData:', customerData);

if (customerData.activeProjects) {
  customerData.activeProjects.forEach(project => {
    console.log('Project:', project.name, 'Duration:', project.estimatedDuration);
    if (project.estimatedDuration === '30-45 days') {
      project.estimatedDuration = '30 days';
      console.log('Fixed duration for:', project.name);
    }
  });
  
  localStorage.setItem('customerData', JSON.stringify(customerData));
  console.log('Updated localStorage with fixed durations');
}

console.log('Script completed. Refresh the page to see changes.'); 