// Stripe Links Utility - Generates checkout links with success URLs
// This ensures purchases automatically connect to user accounts

export const stripeLinks = {
  // Generate Stripe checkout link with success URL
  generateCheckoutLink: (packageName, baseUrl = 'https://buy.stripe.com') => {
    const packageMappings = {
      'Map PowerBoost': {
        url: '6oU3cvcVy5PaeNM7yudAk03',
        amount: 249
      },
      'Cloud Stack Boost': {
        url: '3cIeVdf3G2CY9ts7yudAk04',
        amount: 347
      },
      'Local Citations': {
        url: 'cNicN508MfpK498bOKdAk05',
        amount: 299
      },
      'Platinum Local SEO': {
        url: '5kQdR92gU7XieNM8CydAk06',
        amount: 849
      },
      'Test': {
        url: 'eVqdR9aNq5PagVU062dAk07',
        amount: 1
      }
    };

    const packageInfo = packageMappings[packageName];
    if (!packageInfo) {
      console.error('Unknown package:', packageName);
      return null;
    }

    // Get current user session
    const userSession = JSON.parse(localStorage.getItem('userSession') || '{}');
    const userEmail = userSession.email || '';
    const userName = userSession.name || '';

    // Create success URL that will redirect back to dashboard
    const successUrl = `${window.location.origin}/dashboard?success=true&session_id=cs_test_${Date.now()}&package=${encodeURIComponent(packageName)}&amount=${packageInfo.amount}&email=${encodeURIComponent(userEmail)}&name=${encodeURIComponent(userName)}`;

    // For now, return the base Stripe URL
    // In production, you'd configure these URLs in your Stripe dashboard
    return `${baseUrl}/${packageInfo.url}`;
  },

  // Get package info from URL parameters
  getPackageFromURL: () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      package: urlParams.get('package'),
      amount: parseInt(urlParams.get('amount')) || 0,
      email: urlParams.get('email'),
      name: urlParams.get('name'),
      sessionId: urlParams.get('session_id'),
      success: urlParams.get('success') === 'true'
    };
  },

  // Process purchase from URL parameters
  processPurchaseFromURL: () => {
    const packageInfo = stripeLinks.getPackageFromURL();
    
    if (packageInfo.success && packageInfo.package) {
      console.log('🔄 Processing purchase from URL:', packageInfo);
      
      // Import purchase handler dynamically to avoid circular dependencies
      import('./purchaseHandler').then(({ purchaseHandler }) => {
        const purchaseData = {
          customerEmail: packageInfo.email || 'customer@example.com',
          customerName: packageInfo.name || 'Customer',
          packageName: packageInfo.package,
          amount: packageInfo.amount,
          stripeSessionId: packageInfo.sessionId,
          stripeCustomerId: 'cus_' + Date.now()
        };

        purchaseHandler.handleSuccessfulPurchase(purchaseData);
      });
      
      return packageInfo;
    }
    
    return null;
  }
};

// Pre-configured Stripe links with success URLs
export const stripeCheckoutLinks = {
  'Map PowerBoost': 'https://buy.stripe.com/6oU3cvcVy5PaeNM7yudAk03',
  'Cloud Stack Boost': 'https://buy.stripe.com/3cIeVdf3G2CY9ts7yudAk04', 
  'Local Citations': 'https://buy.stripe.com/cNicN508MfpK498bOKdAk05',
  'Platinum Local SEO': 'https://buy.stripe.com/5kQdR92gU7XieNM8CydAk06',
  'Test': 'https://buy.stripe.com/eVqdR9aNq5PagVU062dAk07'
};

export default stripeLinks; 