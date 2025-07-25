// Simple script to add a test user to localStorage
// Run this in the browser console on your admin dashboard page

console.log('Adding test user to localStorage...');

// Create a test user
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  businessName: 'Test Business',
  activeClients: 1,
  websiteUrl: 'https://testbusiness.com',
  isAdmin: false,
  emailVerified: true,
  createdAt: new Date().toISOString(),
  projects: []
};

// Get existing users or create empty object
const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');

// Add test user
existingUsers['test@example.com'] = testUser;

// Save back to localStorage
localStorage.setItem('users', JSON.stringify(existingUsers));

console.log('Test user added successfully!');
console.log('Current users in localStorage:', existingUsers);
console.log('Total users:', Object.keys(existingUsers).length);

// Dispatch event to notify admin dashboard
window.dispatchEvent(new CustomEvent('userAdded', { detail: { user: testUser } }));

console.log('✅ Test user setup complete! Refresh your admin dashboard to see the user.'); 