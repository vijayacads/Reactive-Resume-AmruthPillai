# 🚀 Simplified Render Deployment - No File Storage

## 🎯 **What This Setup Provides:**
- ✅ **Guest Mode**: Users can create resumes without login
- ✅ **Resume Builder**: All templates and features
- ✅ **PDF Download**: Generate and download PDFs (no storage)
- ✅ **JSON Export**: Download resume data
- ❌ **No Avatar Uploads**: Users can't upload profile pictures
- ❌ **No PDF Storage**: PDFs are generated on-demand and downloaded

## 📋 **Prerequisites**

### **Only Browserless (Free) - For PDF Generation**
1. Go to [browserless.io](https://browserless.io)
2. Create free account
3. Get your WebSocket URL and token

## 🎯 **Step-by-Step Deployment**

### **Step 1: Connect Repository to Render**

1. **Login to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository: `vijayacads/Reactive-Resume-AmruthPillai`

### **Step 2: Configure Web Service**

#### **Basic Settings:**
- **Name**: `reactive-resume`
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty

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

### **Step 4: Configure Environment Variables**

Add these environment variables in your Render web service:

#### **Required Variables:**
```bash
NODE_ENV=production
PORT=3000
PUBLIC_URL=https://your-app-name.onrender.com
DATABASE_URL=postgresql://... (from your PostgreSQL database)
ACCESS_TOKEN_SECRET=e8048071d1174d7106563cb7f13ab5c4699b5c29af011fdb163cd11c185009cd
REFRESH_TOKEN_SECRET=809a33e81988767ca22c780f7e6947e7a6c336d139b6ea04fde5fb255cda8e75
MAIL_FROM=noreply@your-app-name.onrender.com
```

#### **Browser Variables (Browserless):**
```bash
CHROME_URL=wss://chrome.browserless.io
CHROME_TOKEN=your-browserless-token
CHROME_IGNORE_HTTPS_ERRORS=false
```

#### **Storage Variables (Dummy values - not used):**
```bash
STORAGE_ENDPOINT=dummy.supabase.co
STORAGE_PORT=443
STORAGE_REGION=us-east-1
STORAGE_BUCKET=dummy
STORAGE_ACCESS_KEY=dummy
STORAGE_SECRET_KEY=dummy
STORAGE_USE_SSL=true
STORAGE_SKIP_BUCKET_CHECK=true
STORAGE_URL=https://dummy.supabase.co
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

## 🔧 **Post-Deployment Setup**

### **1. Test Your App**
1. Visit your app URL
2. Try creating a resume as a guest user
3. Test PDF generation and download
4. Test JSON export

### **2. What Works:**
- ✅ Create resumes without login
- ✅ Edit resume content
- ✅ Download PDF (generated on-demand)
- ✅ Export JSON data
- ✅ All resume templates
- ✅ All customization options

### **3. What Doesn't Work:**
- ❌ Upload profile pictures (avatar upload disabled)
- ❌ Store PDFs (only download available)

## 🆓 **Free Tier Benefits**

### **Render Free Tier:**
- **Web Service**: 750 hours/month
- **Database**: 90 days free, then $7/month
- **No external storage costs**

### **Browserless Free Tier:**
- **1000 PDF generations/month**
- **Perfect for personal use**

## 🎉 **Success!**

Once deployed, your Reactive Resume V2.0.0 will be live with:
- ✅ Guest mode functionality
- ✅ Resume creation and editing
- ✅ PDF generation and download
- ✅ JSON export
- ✅ All core features working
- ✅ No file storage costs

**Your app URL**: `https://your-app-name.onrender.com`

## 🔄 **Future Upgrades**

If you later want to add file storage:
1. Set up Supabase
2. Update storage environment variables
3. Redeploy

---

**This simplified setup saves you:**
- ❌ No Supabase setup needed
- ❌ No file storage costs
- ❌ No CORS configuration
- ❌ No storage bucket management
- ✅ Faster deployment
- ✅ Lower complexity
