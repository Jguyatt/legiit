// Test script to simulate user deletion

async function testUserDeletion() {
  console.log('🧪 Testing user deletion...');
  
  try {
    // First, let's check current deleted users
    console.log('\n📋 Checking current deleted users...');
    const currentResponse = await fetch('https://rankly360.up.railway.app/api/all-customers');
    const currentData = await currentResponse.json();
    console.log('Current deleted users:', currentData.deletedUsers?.length || 0);
    
    // Simulate deleting a user
    console.log('\n🗑️ Simulating user deletion...');
    const deleteResponse = await fetch('https://rankly360.up.railway.app/api/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-deletion@example.com'
      })
    });
    
    const deleteResult = await deleteResponse.json();
    console.log('Delete result:', deleteResult);
    
    // Check deleted users again
    console.log('\n📋 Checking deleted users after deletion...');
    const afterResponse = await fetch('https://rankly360.up.railway.app/api/all-customers');
    const afterData = await afterResponse.json();
    console.log('Deleted users after:', afterData.deletedUsers?.length || 0);
    console.log('Deleted users list:', afterData.deletedUsers);
    
  } catch (error) {
    console.error('❌ Error testing user deletion:', error);
  }
}

testUserDeletion(); 