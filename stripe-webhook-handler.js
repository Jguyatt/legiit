// Stripe Webhook Handler - This would be on your server
// This shows how to properly connect Stripe purchases to user accounts

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Webhook endpoint to handle successful payments
app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPurchase(session);
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      await handleSuccessfulPayment(invoice);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Handle successful purchase
async function handleSuccessfulPurchase(session) {
  try {
    console.log('💰 Processing successful purchase:', session.id);
    
    // Extract customer and product information
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const lineItems = session.line_items?.data || [];
    
    if (!customerEmail) {
      console.error('No customer email found in session');
      return;
    }

    // Map Stripe product IDs to our packages
    const packageMapping = {
      'price_map_powerboost': 'Map PowerBoost',
      'price_cloud_stack_boost': 'Cloud Stack Boost',
      'price_local_citations': 'Local Citations',
      'price_platinum_local_seo': 'Platinum Local SEO'
    };

    // Get the purchased package
    const purchasedPackage = lineItems[0]?.price?.id;
    const packageName = packageMapping[purchasedPackage] || 'Unknown Package';
    const amount = session.amount_total / 100; // Convert from cents

    console.log(`📦 Customer ${customerEmail} purchased: ${packageName} for $${amount}`);

    // Create customer data structure
    const customerData = {
      name: customerName || 'Customer',
      email: customerEmail,
      business: customerName || 'Customer Business',
      package: packageName,
      monthlyRate: amount,
      activeProjects: [
        {
          id: Date.now(),
          name: `${packageName} Package`,
          status: 'Active',
          startDate: new Date().toISOString().split('T')[0],
          progress: 20, // Purchase completed, onboarding pending
          nextUpdate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      orderTimeline: {
        orderPlaced: {
          status: 'completed',
          date: new Date().toISOString().split('T')[0],
          completed: true
        },
        onboardingForm: {
          status: 'pending',
          date: null,
          completed: false
        },
        orderInProgress: {
          status: 'pending',
          date: null,
          completed: false
        },
        reviewDelivery: {
          status: 'pending',
          date: null,
          completed: false
        },
        orderComplete: {
          status: 'pending',
          date: null,
          completed: false
        }
      },
      recentActivity: [
        { 
          type: 'purchase_completed', 
          message: `Purchase completed: ${packageName} Package`, 
          date: new Date().toISOString().split('T')[0] 
        }
      ],
      subscription: {
        status: 'Active',
        plan: `${packageName} Package`,
        monthlyRate: amount,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      billing: {
        plan: `${packageName} Package`,
        amount: `$${amount}`,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Active'
      },
      stripeCustomerId: session.customer,
      stripeSessionId: session.id
    };

    // Store customer data (in production, this would be in a database)
    // For now, we'll store it in a way that the frontend can access
    await storeCustomerData(customerEmail, customerData);

    // Update user account if it exists
    await updateUserAccount(customerEmail, packageName);

    // Send welcome email
    await sendWelcomeEmail(customerEmail, customerName, packageName);

    console.log(`✅ Successfully processed purchase for ${customerEmail}`);

  } catch (error) {
    console.error('Error processing purchase:', error);
  }
}

// Store customer data (in production, use a database)
async function storeCustomerData(email, customerData) {
  // In production, this would be stored in a database
  // For now, we'll create a simple storage mechanism
  
  // You could store this in a JSON file, database, or use a service like Firebase
  console.log('💾 Storing customer data for:', email);
  console.log('Customer data:', JSON.stringify(customerData, null, 2));
  
  // In a real app, you'd do something like:
  // await db.customers.create(customerData);
  // or
  // await firebase.firestore().collection('customers').doc(email).set(customerData);
}

// Update user account if it exists
async function updateUserAccount(email, packageName) {
  // In production, this would update the user's account in your database
  console.log(`👤 Updating user account for ${email} with package ${packageName}`);
  
  // You could do something like:
  // await db.users.update({ email }, { 
  //   activeClients: 1,
  //   lastPurchase: new Date(),
  //   currentPackage: packageName
  // });
}

// Send welcome email
async function sendWelcomeEmail(email, name, packageName) {
  // In production, use a proper email service like SendGrid, Mailgun, etc.
  console.log(`📧 Sending welcome email to ${email} for ${packageName}`);
  
  // Example email content:
  const emailContent = `
    <h2>Welcome to Rankly360! 🎉</h2>
    <p>Hi ${name},</p>
    <p>Thank you for purchasing our ${packageName} package!</p>
    <p>Your project is now active and ready to begin. Here's what happens next:</p>
    <ol>
      <li>Complete your onboarding form in your dashboard</li>
      <li>Our team will review your information</li>
      <li>We'll begin optimizing your local SEO</li>
      <li>You'll receive regular updates on your progress</li>
    </ol>
    <p>Login to your dashboard to get started: <a href="https://rankly360.com/dashboard">Dashboard</a></p>
    <p>Best regards,<br>The Rankly360 Team</p>
  `;
  
  // Send email using your preferred service
  // await sendEmail(email, 'Welcome to Rankly360!', emailContent);
}

// Handle successful recurring payments
async function handleSuccessfulPayment(invoice) {
  console.log('💳 Processing successful payment:', invoice.id);
  
  // Update billing information, extend subscription, etc.
  const customerEmail = invoice.customer_email;
  const amount = invoice.amount_paid / 100;
  
  console.log(`💰 Customer ${customerEmail} paid $${amount}`);
  
  // Update customer's next billing date
  // await updateCustomerBilling(customerEmail, invoice.next_payment_attempt);
}

module.exports = {
  handleSuccessfulPurchase,
  handleSuccessfulPayment
}; 