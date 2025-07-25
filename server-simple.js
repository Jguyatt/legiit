const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

// In-memory storage for form submissions (in production, use a database)
let formSubmissions = [];

// Mailgun configuration
let mailgun;
try {
  console.log('Mailgun configuration:');
  console.log('MAILGUN_API_KEY:', process.env.MAILGUN_API_KEY ? '***' : 'NOT SET');
  console.log('MAILGUN_DOMAIN:', process.env.MAILGUN_DOMAIN || 'NOT SET');
  
  const mailgunClient = new Mailgun(formData);
  mailgun = mailgunClient.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'your-mailgun-api-key'
  });
  console.log('Mailgun client configured successfully');
} catch (error) {
  console.log('Mailgun configuration error:', error.message);
  mailgun = null;
}

app.use(cors());
app.use(bodyParser.json());

// Store pending verifications (in production, use a database)
const pendingVerifications = new Map();

// Generate verification token
const generateVerificationToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Email verification endpoint
app.post('/api/send-verification-email', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Email and name are required' });
    }

    const verificationToken = generateVerificationToken();
    const verificationUrl = `http://localhost:5001/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    
    // Store verification data
    pendingVerifications.set(verificationToken, {
      email: email.toLowerCase(),
      name: name,
      token: verificationToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3abef9, #6366f1); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to Rankly360!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Please verify your email address to complete your registration.</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #333; margin: 0 0 20px 0;">Hi ${name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for signing up with Rankly360! To complete your registration and access your dashboard, 
            please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #3abef9, #6366f1); color: white; padding: 15px 30px; 
                      text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
            If the button doesn't work, you can copy and paste this link into your browser:
          </p>
          <p style="color: #3abef9; word-break: break-all; font-size: 14px; margin: 10px 0;">
            ${verificationUrl}
          </p>
          
          <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
            This verification link will expire in 24 hours. If you didn't create an account with Rankly360, 
            you can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© 2024 Rankly360. All rights reserved.</p>
        </div>
      </div>
    `;

    if (mailgun && process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      try {
        const messageData = {
          from: `Rankly360 <noreply@${process.env.MAILGUN_DOMAIN}>`,
          to: email,
          subject: 'Verify Your Email - Rankly360',
          html: emailContent
        };

        await mailgun.messages.create(process.env.MAILGUN_DOMAIN, messageData);
        console.log(`Verification email sent to ${email}`);
        
        res.status(200).json({ 
          success: true, 
          message: 'Verification email sent successfully. Please check your inbox and spam folder.' 
        });
      } catch (emailError) {
        console.error('Mailgun email sending failed:', emailError.message);
        // For development/testing, still return success but log the error
        res.status(200).json({ 
          success: true, 
          message: 'Account created! Email verification would be sent in production. For testing, you can proceed to login.',
          development: true
        });
      }
    } else {
      console.log('Email not sent - Mailgun not configured');
      // For development/testing, still return success
      res.status(200).json({ 
        success: true, 
        message: 'Account created! Email verification would be sent in production. For testing, you can proceed to login.',
        development: true
      });
    }

  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification email' });
  }
});

// Verify email endpoint
app.post('/api/verify-email', async (req, res) => {
  try {
    const { token, email } = req.body;
    
    if (!token || !email) {
      return res.status(400).json({ success: false, message: 'Token and email are required' });
    }

    const verificationData = pendingVerifications.get(token);
    
    if (!verificationData) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    if (verificationData.email !== email.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Email mismatch' });
    }

    const now = new Date();
    const expiresAt = new Date(verificationData.expiresAt);
    
    if (now > expiresAt) {
      pendingVerifications.delete(token);
      return res.status(400).json({ success: false, message: 'Verification token has expired' });
    }

    // Remove from pending verifications
    pendingVerifications.delete(token);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully',
      data: {
        email: verificationData.email,
        name: verificationData.name
      }
    });

  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ success: false, message: 'Failed to verify email' });
  }
});

// Get all form submissions (for admin dashboard)
app.get('/api/admin/form-submissions', (req, res) => {
  res.json({ 
    success: true, 
    submissions: formSubmissions 
  });
});

// Get all users (for admin dashboard)
app.get('/api/admin/users', (req, res) => {
  try {
    // In a real application, this would come from a database
    // For now, we'll return a message that users are stored client-side
    res.json({ 
      success: true, 
      message: 'Users are stored client-side in localStorage',
      users: [] // Empty array since users are stored in browser localStorage
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'Failed to get users' });
  }
});

// Onboarding form submission endpoint
app.post('/api/submit-onboarding', async (req, res) => {
  try {
    const { service, formData, submittedAt } = req.body;

    // Create submission object
    const submission = {
      id: Date.now().toString(),
      service,
      formData,
      submittedAt: new Date(submittedAt).toISOString(),
      status: 'pending',
      adminNotes: ''
    };

    // Store the submission
    formSubmissions.push(submission);

    // Create email content
    const emailContent = `
      <h2>New Onboarding Form Submission - ${service}</h2>
      <p><strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString()}</p>
      
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Website:</strong> ${formData.website}</p>
      <p><strong>Google Business Profile:</strong> ${formData.googleBusinessProfile}</p>
      
      <h3>Business Information:</h3>
      <p><strong>Business Name:</strong> ${formData.businessName}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
      <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
      <p><strong>Business Description:</strong> ${formData.businessDescription}</p>
      
      <h3>SEO Information:</h3>
      <p><strong>Target Keywords:</strong></p>
      <pre>${formData.targetKeyword}</pre>
      
      <hr>
      <p><em>This form was submitted through the Rankly360 dashboard.</em></p>
    `;

    // Log the submission
    console.log('=== ONBOARDING FORM SUBMISSION ===');
    console.log('Service:', service);
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    console.log('Submitted At:', submittedAt);
    console.log('Submission ID:', submission.id);
    console.log('================================');

    // Send email if Mailgun is configured (optional now)
    if (mailgun && process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      try {
        const messageData = {
          from: `Rankly360 <noreply@${process.env.MAILGUN_DOMAIN}>`,
          to: 'guyattj39@gmail.com',
          subject: `New Onboarding Form - ${service} - ${formData.firstName} ${formData.lastName}`,
          html: emailContent
        };

        await mailgun.messages.create(process.env.MAILGUN_DOMAIN, messageData);
        console.log('Email sent successfully to guyattj39@gmail.com');
      } catch (emailError) {
        console.error('Mailgun email sending failed:', emailError.message);
        // Continue with success response even if email fails
      }
    } else {
      console.log('Email not sent - Mailgun not configured');
    }

    console.log(`Onboarding form submitted for ${service} by ${formData.email}`);
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Error submitting onboarding form:', error);
    res.status(500).json({ success: false, message: 'Failed to submit form', error: error.message });
  }
});

// Update submission status (for admin)
app.put('/api/admin/form-submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const submission = formSubmissions.find(s => s.id === id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    submission.status = status;
    submission.adminNotes = adminNotes;
    submission.updatedAt = new Date().toISOString();

    res.json({ success: true, submission });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({ success: false, message: 'Failed to update submission' });
  }
});

app.listen(port, () => {
  console.log(`Simple server running on port ${port}`);
}); 