// Admin Authentication Utility
// This manages admin access to the dashboard

// Admin credentials (in production, this would be in a secure database)
const ADMIN_CREDENTIALS = {
  email: 'guyattj39@gmail.com', // Your admin email
  password: 'Jg1091775', // Your admin password
  name: 'Admin User'
};

// Admin session management
let adminSession = null;

export const adminAuth = {
  // Check if admin is logged in
  isLoggedIn: () => {
    console.log('isLoggedIn check:', adminSession !== null);
    return adminSession !== null;
  },

  // Login admin
  login: (email, password) => {
    console.log('Login attempt:', { email, password });
    console.log('Expected credentials:', ADMIN_CREDENTIALS);
    
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      adminSession = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        loginTime: new Date().toISOString(),
        token: 'admin_token_' + Date.now()
      };
      
      // Store session in localStorage for persistence
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
      console.log('Login successful:', adminSession);
      
      return { success: true, data: adminSession };
    } else {
      console.log('Login failed: Invalid credentials');
      return { success: false, error: 'Invalid credentials' };
    }
  },

  // Logout admin
  logout: () => {
    console.log('Logging out admin');
    adminSession = null;
    localStorage.removeItem('adminSession');
    return { success: true };
  },

  // Get current admin session
  getSession: () => {
    return adminSession;
  },

  // Initialize session from localStorage
  initSession: () => {
    console.log('Initializing admin session...');
    const storedSession = localStorage.getItem('adminSession');
    console.log('Stored session:', storedSession);
    
    if (storedSession) {
      try {
        adminSession = JSON.parse(storedSession);
        console.log('Session restored:', adminSession);
        return { success: true, data: adminSession };
      } catch (error) {
        console.log('Error parsing stored session:', error);
        localStorage.removeItem('adminSession');
        return { success: false, error: 'Invalid session' };
      }
    }
    console.log('No stored session found');
    return { success: false, error: 'No session' };
  },

  // Validate admin access
  requireAuth: () => {
    if (!adminAuth.isLoggedIn()) {
      throw new Error('Admin authentication required');
    }
    return true;
  }
};

export default adminAuth; 