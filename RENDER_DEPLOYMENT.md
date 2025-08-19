# 🚀 Render Deployment Guide - Reactive Resume V2.0.0

## 📋 Prerequisites

### 1. External Services Setup (Required)

#### **A. Supabase (Free) - For File Storage**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Get your project URL and API keys
5. Create a bucket called `avatars` in Storage

#### **B. Browserless (Free) - For PDF Generation**
1. Go to [browserless.io](https://browserless.io)
2. Create free account
3. Get your WebSocket URL and token

#### **C. Email Service (Optional) - For Password Reset**
- Use [Resend](https://resend.com) (free tier)
- Or [SendGrid](https://sendgrid.com) (free tier)

## 🎯 Step-by-Step Deployment

### **Step 1: Connect Repository to Render**

1. **Login to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the `Reactive-Resume-AmruthPillai` repository

### **Step 2: Configure Web Service**

#### **Basic Settings:**
- **Name**: `reactive-resume` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (root of repo)

#### **Build & Deploy Settings:**
- **Build Command**: `pnpm install && pnpm run build`
- **Start Command**: `pnpm run start`

### **Step 3: Create PostgreSQL Database**

1. **Create Database**
   - Go to "New +" → "PostgreSQL"
   - Name: `reactive-resume-db`
   - Plan: Free
   - Region: Same as your web service

2. **Get Connection String**
   - Copy the "External Database URL"
   - We'll use this in environment variables

### **Step 4: Configure Environment Variables**

Add these environment variables in your Render web service:

#### **Required Variables:**
```bash
NODE_ENV=production
PORT=3000
PUBLIC_URL=https://your-app-name.onrender.com
DATABASE_URL=postgresql://... (from your PostgreSQL database)
ACCESS_TOKEN_SECRET=your-secret-key-here
REFRESH_TOKEN_SECRET=your-secret-key-here
MAIL_FROM=noreply@your-app-name.onrender.com
```

#### **Storage Variables (Supabase):**
```bash
STORAGE_ENDPOINT=your-project.supabase.co
STORAGE_PORT=443
STORAGE_REGION=us-east-1
STORAGE_BUCKET=avatars
STORAGE_ACCESS_KEY=your-supabase-anon-key
STORAGE_SECRET_KEY=your-supabase-service-role-key
STORAGE_USE_SSL=true
STORAGE_SKIP_BUCKET_CHECK=false
```

#### **Browser Variables (Browserless):**
```bash
CHROME_URL=wss://chrome.browserless.io
CHROME_TOKEN=your-browserless-token
CHROME_IGNORE_HTTPS_ERRORS=false
```

#### **Optional Variables:**
```bash
# Email (if you want password reset functionality)
SMTP_URL=smtp://api:your-resend-key@smtp.resend.com:587

# OAuth (if you want GitHub/Google login)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/github/callback

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/google/callback
```

### **Step 5: Deploy**

1. **Save Configuration**
   - Click "Save Changes"
   - Render will start building your app

2. **Monitor Deployment**
   - Watch the build logs
   - Fix any errors that appear

3. **Access Your App**
   - Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`

## 🔧 Post-Deployment Setup

### **1. Database Migration**
Your app will automatically run migrations on startup, but you can also run them manually:

```bash
# In Render shell or locally
pnpm prisma migrate deploy
```

### **2. Test Your App**
1. Visit your app URL
2. Try creating a resume as a guest user
3. Test PDF generation
4. Test file uploads (avatars)

### **3. Custom Domain (Optional)**
- Go to your web service settings
- Add custom domain
- Configure DNS records

## 🆓 Free Tier Limitations & Solutions

### **Render Free Tier Limits:**
- **Web Service**: 750 hours/month, sleeps after 15 min
- **Database**: 90 days free, then $7/month
- **No persistent storage**: Use external services

### **Solutions:**
1. **Sleeping Service**: First request after sleep takes 30-60 seconds
2. **Database**: Upgrade to paid plan after 90 days or migrate to another provider
3. **Storage**: Supabase free tier is sufficient for avatars

## 🐛 Troubleshooting

### **Common Issues:**

#### **1. Build Fails**
- Check build logs in Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

#### **2. Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check if database is created and accessible
- Ensure database user has proper permissions

#### **3. PDF Generation Fails**
- Verify Browserless credentials
- Check `CHROME_URL` and `CHROME_TOKEN`
- Ensure WebSocket connection is working

#### **4. File Upload Issues**
- Verify Supabase configuration
- Check bucket permissions
- Ensure CORS is configured properly

### **Debug Commands:**
```bash
# Check app logs in Render dashboard
# Or use Render shell to run commands
pnpm prisma db push
pnpm prisma generate
```

## 📊 Monitoring

### **Render Dashboard:**
- Monitor app performance
- Check error logs
- View deployment history

### **Health Check:**
Your app includes a health check endpoint:
- `https://your-app-name.onrender.com/api/health`

## 🔄 Updates

### **Automatic Deployments:**
- Render automatically deploys when you push to `main`
- No manual intervention needed

### **Manual Deployments:**
- Go to your web service in Render
- Click "Manual Deploy"
- Select branch to deploy

## 💰 Cost Optimization

### **Free Tier Strategy:**
1. **Use Render free tier** for web service
2. **Use Supabase free tier** for database and storage
3. **Use Browserless free tier** for PDF generation
4. **Monitor usage** to stay within limits

### **When to Upgrade:**
- Database usage exceeds free tier
- Need faster response times
- Want custom domain
- Need more storage

## 🎉 Success!

Once deployed, your Reactive Resume V2.0.0 will be live with:
- ✅ Guest mode functionality
- ✅ Resume creation and editing
- ✅ PDF generation
- ✅ File uploads
- ✅ All core features working

**Your app URL**: `https://your-app-name.onrender.com`

---

**Need Help?** Check the [Render documentation](https://render.com/docs) or [Reactive Resume issues](https://github.com/AmruthPillai/Reactive-Resume/issues)
