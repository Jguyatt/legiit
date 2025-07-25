// Cache clearing script for Rankly360
// Run this in your browser console to clear all cached data

console.log('🧹 Clearing Rankly360 cache...');

// Clear customer data
localStorage.removeItem('customerToken');
localStorage.removeItem('customerData');

// Clear user session data
localStorage.removeItem('userSession');
localStorage.removeItem('userToken');

// Clear any other potential cached data
localStorage.removeItem('demo_customer_token');
localStorage.removeItem('demo_customer_data');

console.log('✅ Cache cleared! Refresh the page to see the updated dashboard.');

// Optional: Automatically refresh the page
// window.location.reload();
