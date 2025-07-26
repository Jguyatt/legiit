# 🚀 Deployment Guide - Fix Webhook Issues

## 🔍 **Current Issue:**
- ✅ Account creation works
- ❌ Purchases don't appear in dashboard
- ❌ Admin dashboard doesn't see new projects

**Root Cause:** Backend webhook server isn't deployed yet!

## 🎯 **Solution: Deploy Backend Server**

### **Option 1: Railway (Easiest)**

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Set environment variables:**
   ```
   STRIPE_WEBHOOK_SECRET=whsec_uM49aZIsTX201H80p7aI2eYF72nWEuwC
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
6. **Set build command:** `npm install`
7. **Set start command:** `node server.js`
8. **Deploy!**

### **Option 2: Render (Free)**

1. **Go to [Render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New" → "Web Service"**
4. **Connect your repository**
5. **Set environment variables**
6. **Set build command:** `npm install`
7. **Set start command:** `node server.js`
8. **Deploy!**

### **Option 3: Heroku**

1. **Install Heroku CLI**
2. **Run these commands:**
   ```bash
   heroku create your-app-name
   heroku config:set STRIPE_WEBHOOK_SECRET=whsec_uM49aZIsTX201H80p7aI2eYF72nWEuwC
   heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
   git push heroku main
   ```

## 🔧 **After Backend Deployment:**

1. **Get your backend URL** (e.g., `https://your-app.railway.app`)
2. **Update Stripe webhook endpoint** to: `https://your-app.railway.app/api/webhooks/stripe`
3. **Test a purchase** - it should now work!

## 📊 **What Should Happen:**

1. **Customer makes purchase** → Stripe sends webhook
2. **Your backend receives webhook** → Processes purchase
3. **Customer dashboard updates** → Shows new project
4. **Admin dashboard updates** → Shows new customer

## 🧪 **Test Steps:**

1. **Deploy backend** (using one of the options above)
2. **Update Stripe webhook URL** to your new backend URL
3. **Make a test purchase**
4. **Check customer dashboard** - should show new project
5. **Check admin dashboard** - should show new customer

## ⚠️ **Important Notes:**

- **Frontend and backend are separate** - you need both deployed
- **Environment variables are crucial** - make sure they're set correctly
- **Webhook URL must be HTTPS** - no localhost in production

## 🆘 **Need Help?**

If you get stuck, let me know:
1. Which deployment platform you're using
2. Any error messages you see
3. The backend URL you get after deployment

**The webhook system will work perfectly once the backend is deployed!** 🎯 