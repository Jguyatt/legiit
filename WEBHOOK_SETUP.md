# 🚀 Webhook Setup Guide

## Overview
This guide will help you set up Stripe webhooks to automatically process purchases and add them to your dashboard.

## 📋 Prerequisites
- ✅ All dependencies installed (`npm install` completed)
- ✅ Stripe account with payment links configured
- ✅ React app running on port 3000
- ✅ Server running on port 3001

## 🔧 Setup Steps

### 1. Start the Server
```bash
# Start both React app and server simultaneously
npm run dev

# Or start them separately:
# Terminal 1: npm start (React app on port 3000)
# Terminal 2: npm run server (Server on port 3001)
```

### 2. Configure Stripe Webhook

#### In Stripe Dashboard:
1. Go to **Developers > Webhooks**
2. Click **"+ Add endpoint"**
3. Set **Endpoint URL**: `http://localhost:3001/api/webhooks/stripe`
4. Select **Events**:
   - ✅ `checkout.session.completed` (most important)
   - ✅ `payment_intent.succeeded` (optional backup)
5. Click **"Add endpoint"**
6. **Copy the webhook secret** (starts with `whsec_`)

### 3. Set Environment Variables
Create a `.env` file in your project root:
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

### 4. Test the Setup
```bash
# Test if the server is running
node test-webhook.js
```

## 🧪 Testing

### Test Purchase Flow:
1. Make a test purchase using any of your Stripe payment links
2. Check the server console for webhook events
3. Verify the purchase appears in your dashboard
4. Check the admin dashboard for new customers

### Manual Testing:
```bash
# Test server health
curl http://localhost:3001/api/health

# Check pending purchases
curl http://localhost:3001/api/purchases
```

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Webhook signature verification failed"
- ✅ Check that `STRIPE_WEBHOOK_SECRET` is set correctly
- ✅ Ensure you're using the correct webhook secret from Stripe

#### 2. "Server not running"
- ✅ Run `npm run server` or `npm run dev`
- ✅ Check that port 3001 is available

#### 3. "Purchase not appearing in dashboard"
- ✅ Check server console for webhook events
- ✅ Verify the purchase amount matches your configured services
- ✅ Check browser console for any errors

#### 4. "React app not loading"
- ✅ Run `npm start` in a separate terminal
- ✅ Ensure port 3000 is available

## 📊 Monitoring

### Server Logs:
- Webhook events: `🔔 Received Stripe webhook event:`
- Purchase processing: `📦 Processing purchase:`
- Success: `✅ Purchase data created:`

### Dashboard Integration:
- Purchases automatically trigger the existing `purchaseHandler.js` logic
- Customer data is created in localStorage
- Admin dashboard is notified via events
- Customer dashboard shows new projects

## 🚀 Production Deployment

For production, you'll need:
1. A public domain (e.g., `https://yourdomain.com`)
2. Update webhook URL to: `https://yourdomain.com/api/webhooks/stripe`
3. Set production Stripe keys
4. Use a proper database instead of file storage
5. Set up SSL certificates

## 📞 Support

If you encounter issues:
1. Check the server console for error messages
2. Verify all environment variables are set
3. Test the webhook endpoint manually
4. Check Stripe webhook logs in the Stripe dashboard 