const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_your_test_key_here');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.static(path.join(__dirname, 'build')));

// Stripe webhook endpoint
app.post('/api/webhooks/stripe', (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret';

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('🔔 Received Stripe webhook event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('💰 Payment completed for session:', session.id);
      
      // Process the purchase
      processPurchase(session);
      break;
      
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('💳 Payment intent succeeded:', paymentIntent.id);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Process purchase function
function processPurchase(session) {
  try {
    // Extract customer information
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const amount = session.amount_total / 100; // Convert from cents
    const sessionId = session.id;
    
    console.log('📦 Processing purchase:', {
      email: customerEmail,
      name: customerName,
      amount: amount,
      sessionId: sessionId
    });

    // Determine package based on amount
    let packageName = 'Unknown Package';
    if (amount === 249) packageName = 'Map PowerBoost';
    else if (amount === 347) packageName = 'Cloud Stack Boost';
    else if (amount === 299) packageName = 'Local Citations';
    else if (amount === 849) packageName = 'Platinum Local SEO';
    else if (amount === 1) packageName = 'Test';

    // Create purchase data
    const purchaseData = {
      customerEmail: customerEmail || 'customer@example.com',
      customerName: customerName || 'Customer',
      packageName: packageName,
      amount: amount,
      stripeSessionId: sessionId,
      stripeCustomerId: session.customer || 'cus_' + Date.now()
    };

    console.log('✅ Purchase data created:', purchaseData);

    // Store in a simple file-based database for now
    // In production, you'd use a real database
    const fs = require('fs');
    const purchasesFile = 'purchases.json';
    
    let purchases = [];
    try {
      purchases = JSON.parse(fs.readFileSync(purchasesFile, 'utf8'));
    } catch (err) {
      // File doesn't exist, start with empty array
    }
    
    purchases.push({
      ...purchaseData,
      timestamp: new Date().toISOString(),
      processed: false
    });
    
    fs.writeFileSync(purchasesFile, JSON.stringify(purchases, null, 2));
    console.log('💾 Purchase saved to file');

    // Trigger the existing purchase processing logic
    triggerPurchaseProcessing(purchaseData);

  } catch (error) {
    console.error('❌ Error processing purchase:', error);
  }
}

// Function to trigger the existing purchase processing logic
function triggerPurchaseProcessing(purchaseData) {
  try {
    // Import the existing purchase handler
    const { handleSuccessfulPurchase } = require('./src/utils/purchaseHandler.js');
    
    // Create a mock purchase event that matches the existing logic
    const mockPurchaseEvent = {
      customerEmail: purchaseData.customerEmail,
      customerName: purchaseData.customerName,
      packageName: purchaseData.packageName,
      amount: purchaseData.amount,
      stripeSessionId: purchaseData.stripeSessionId
    };

    // Call the existing purchase handler
    handleSuccessfulPurchase(mockPurchaseEvent);
    
    console.log('🔄 Triggered existing purchase processing logic');
    
  } catch (error) {
    console.error('❌ Error triggering purchase processing:', error);
  }
}

// API endpoint to get pending purchases
app.get('/api/purchases', (req, res) => {
  try {
    const fs = require('fs');
    const purchasesFile = 'purchases.json';
    
    let purchases = [];
    try {
      purchases = JSON.parse(fs.readFileSync(purchasesFile, 'utf8'));
    } catch (err) {
      // File doesn't exist
    }
    
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load purchases' });
  }
});

// API endpoint to mark purchase as processed
app.post('/api/purchases/:id/process', (req, res) => {
  try {
    const fs = require('fs');
    const purchasesFile = 'purchases.json';
    
    let purchases = [];
    try {
      purchases = JSON.parse(fs.readFileSync(purchasesFile, 'utf8'));
    } catch (err) {
      // File doesn't exist
    }
    
    const purchaseId = req.params.id;
    const purchase = purchases.find(p => p.stripeSessionId === purchaseId);
    
    if (purchase) {
      purchase.processed = true;
      fs.writeFileSync(purchasesFile, JSON.stringify(purchases, null, 2));
      res.json({ success: true, purchase });
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process purchase' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'Server is running!',
    webhookEndpoint: `/api/webhooks/stripe`,
    timestamp: new Date().toISOString()
  });
});

// Simple in-memory storage for testing (will be replaced with database in production)
let customerDataStorage = {};
let usersStorage = {};
let onboardingSubmissionsStorage = [];
let deletedUsersStorage = []; // Track deleted users

// Helper functions for in-memory storage
function readStorage(filename) {
  if (filename === 'customerData.json') return customerDataStorage;
  if (filename === 'users.json') return usersStorage;
  if (filename === 'onboarding-submissions.json') return onboardingSubmissionsStorage;
  if (filename === 'deletedUsers.json') return deletedUsersStorage;
  if (filename === 'cancellation-requests.json') return [];
  return null;
}

function writeStorage(filename, data) {
  if (filename === 'customerData.json') {
    customerDataStorage = data;
    console.log('💾 Customer data stored:', Object.keys(customerDataStorage).length, 'customers');
  }
  if (filename === 'users.json') {
    usersStorage = data;
    console.log('💾 Users stored:', Object.keys(usersStorage).length, 'users');
  }
  if (filename === 'onboarding-submissions.json') {
    onboardingSubmissionsStorage = data;
    console.log('💾 Onboarding submissions stored:', onboardingSubmissionsStorage.length, 'submissions');
  }
  if (filename === 'deletedUsers.json') {
    deletedUsersStorage = data;
    console.log('💾 Deleted users stored:', deletedUsersStorage.length, 'deleted users');
  }
  if (filename === 'cancellation-requests.json') {
    console.log('💾 Cancellation requests stored in memory:', data.length, 'requests');
  }
  return true;
}

// Endpoint to sync customer data from frontend
app.post('/api/sync-data', (req, res) => {
  try {
    const { email, customerData } = req.body;
    
    if (!email || !customerData) {
      return res.status(400).json({ error: 'Email and customer data are required' });
    }
    
    console.log('🔄 Syncing customer data for:', email);
    
    // Get existing customer data
    const existingCustomerData = readStorage('customerData.json') || {};
    
    // Update customer data
    existingCustomerData[email.toLowerCase()] = customerData;
    
    // Save to storage
    writeStorage('customerData.json', existingCustomerData);
    
    console.log('✅ Customer data synced successfully for:', email);
    res.json({ success: true, message: 'Customer data synced successfully' });
    
  } catch (error) {
    console.error('❌ Error syncing customer data:', error);
    res.status(500).json({ error: 'Failed to sync customer data' });
  }
});

// Endpoint to handle onboarding submissions
app.post('/api/onboarding-submission', (req, res) => {
  try {
    const submissionData = req.body;
    
    // Get existing submissions
    const existingSubmissions = readStorage('onboarding-submissions.json') || [];
    
    // Add new submission
    existingSubmissions.push(submissionData);
    
    // Save to storage
    writeStorage('onboarding-submissions.json', existingSubmissions);
    
    console.log('✅ Onboarding submission received:', submissionData.customerEmail);
    res.json({ success: true, message: 'Onboarding submission saved' });
    
  } catch (error) {
    console.error('❌ Error saving onboarding submission:', error);
    res.status(500).json({ error: 'Failed to save onboarding submission' });
  }
});

// Endpoint to get all onboarding submissions
app.get('/api/onboarding-submissions', (req, res) => {
  try {
    const submissions = readStorage('onboarding-submissions.json') || [];
    res.json({ success: true, submissions });
  } catch (error) {
    console.error('❌ Error retrieving onboarding submissions:', error);
    res.status(500).json({ error: 'Failed to retrieve onboarding submissions' });
  }
});

// Endpoint to get all customers and users
app.get('/api/all-customers', (req, res) => {
  try {
    const customerData = readStorage('customerData.json') || {};
    const users = readStorage('users.json') || {};
    const onboardingSubmissions = readStorage('onboarding-submissions.json') || [];
    const deletedUsers = readStorage('deletedUsers.json') || [];
    
    res.json({
      success: true,
      customers: customerData,
      users: users,
      onboardingSubmissions: onboardingSubmissions,
      deletedUsers: deletedUsers
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load customer data' });
  }
});

// Endpoint to store cancellation requests from users
app.post('/api/cancellation-request', (req, res) => {
  try {
    const { customerEmail, customerName, projectId, reason } = req.body;
    
    console.log('📝 New cancellation request:', { customerEmail, customerName, projectId, reason });
    
    // Get existing cancellation requests
    const existingRequests = readStorage('cancellation-requests.json') || [];
    
    // Create new cancellation request
    const newRequest = {
      id: Date.now().toString(),
      customerEmail,
      customerName,
      projectId,
      reason: reason || 'Customer requested cancellation',
      requestDate: new Date().toISOString(),
      status: 'pending', // pending, approved, denied
      reviewedBy: null,
      reviewedDate: null
    };
    
    // Add to existing requests
    existingRequests.push(newRequest);
    writeStorage('cancellation-requests.json', existingRequests);
    
    console.log('✅ Cancellation request stored successfully');
    res.json({ success: true, message: 'Cancellation request submitted successfully' });
    
  } catch (error) {
    console.error('❌ Error storing cancellation request:', error);
    res.status(500).json({ error: 'Failed to store cancellation request' });
  }
});

// Endpoint to get all cancellation requests for admin dashboard
app.get('/api/cancellation-requests', (req, res) => {
  try {
    const requests = readStorage('cancellation-requests.json') || [];
    res.json({ success: true, requests });
  } catch (error) {
    console.error('❌ Error retrieving cancellation requests:', error);
    res.status(500).json({ error: 'Failed to retrieve cancellation requests' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/api/webhooks/stripe`);
  console.log(`📊 Purchases API: http://localhost:${PORT}/api/purchases`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
  console.log(`⚠️  Make sure to set STRIPE_WEBHOOK_SECRET environment variable`);
}); 