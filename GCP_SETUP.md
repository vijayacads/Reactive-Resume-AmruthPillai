# 🚀 Google Cloud Platform Setup Guide

## **Step 1: Create GCP Account**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Click "Get started for free"
   - Sign in with Google account

2. **Create Project**
   - Click "Select a project" → "New Project"
   - Name: `reactive-resume`
   - Click "Create"

3. **Enable Billing**
   - Go to "Billing" in left menu
   - Link billing account (required for free tier)
   - Add credit card (won't be charged)

## **Step 2: Create VM Instance**

1. **Go to Compute Engine**
   - In left menu: "Compute Engine" → "VM instances"
   - Click "Create Instance"

2. **Configure VM:**
   ```
   Name: reactive-resume
   Region: us-central1 (Iowa)
   Zone: us-central1-a
   Machine type: e2-micro (1 vCPU, 1 GB memory) - FREE TIER
   Boot disk: Ubuntu 20.04 LTS, 30 GB
   Firewall: Allow HTTP traffic, Allow HTTPS traffic
   ```

3. **Click "Create"**

## **Step 3: Connect to VM**

1. **SSH into VM**
   - Click the SSH button next to your VM
   - This opens a browser-based terminal

2. **Update system:**
   ```bash
   sudo apt-get update
   sudo apt-get upgrade -y
   ```

## **Step 4: Install Dependencies**

```bash
# Install Node.js, npm, and Chrome
sudo apt-get install -y nodejs npm chromium-browser postgresql postgresql-contrib

# Install pnpm
npm install -g pnpm

# Install PM2 (process manager)
npm install -g pm2
```

## **Step 5: Setup PostgreSQL**

```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
CREATE DATABASE reactive_resume;
CREATE USER resume_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE reactive_resume TO resume_user;
\q
```

## **Step 6: Deploy Your App**

```bash
# Clone your repository
git clone https://github.com/vijayacads/Reactive-Resume-AmruthPillai.git
cd Reactive-Resume-AmruthPillai

# Install dependencies
pnpm install

# Build the app
pnpm run build
```

## **Step 7: Configure Environment Variables**

```bash
# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3000
PUBLIC_URL=http://YOUR_VM_IP:3000
DATABASE_URL=postgresql://resume_user:your_secure_password@localhost:5432/reactive_resume
ACCESS_TOKEN_SECRET=e8048071d1174d7106563cb7f13ab5c4699b5c29af011fdb163cd11c185009cd
REFRESH_TOKEN_SECRET=809a33e81988767ca22c780f7e6947e7a6c336d139b6ea04fde5fb255cda8e75
MAIL_FROM=noreply@your-domain.com

# Chrome (self-hosted)
CHROME_URL=ws://localhost:3000
CHROME_PATH=/usr/bin/chromium-browser
CHROME_IGNORE_HTTPS_ERRORS=false

# Storage (dummy values - not used)
STORAGE_ENDPOINT=dummy.supabase.co
STORAGE_PORT=443
STORAGE_REGION=us-east-1
STORAGE_BUCKET=dummy
STORAGE_ACCESS_KEY=dummy
STORAGE_SECRET_KEY=dummy
STORAGE_USE_SSL=true
STORAGE_SKIP_BUCKET_CHECK=true
STORAGE_URL=https://dummy.supabase.co
EOF
```

## **Step 8: Setup PM2 Process Manager**

```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'reactive-resume',
    script: 'pnpm',
    args: 'start',
    cwd: '/home/YOUR_USERNAME/Reactive-Resume-AmruthPillai',
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOF

# Start the app
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## **Step 9: Setup Nginx (Reverse Proxy)**

```bash
# Install Nginx
sudo apt-get install -y nginx

# Create Nginx configuration
sudo tee /etc/nginx/sites-available/reactive-resume << 'EOF'
server {
    listen 80;
    server_name YOUR_VM_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/reactive-resume /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## **Step 10: Test Your App**

1. **Get your VM's external IP**
   - Go to Compute Engine → VM instances
   - Copy the external IP address

2. **Visit your app**
   - Open browser: `http://YOUR_VM_IP`
   - Test creating a resume
   - Test PDF generation

## **Step 11: Setup Domain (Optional)**

1. **Point domain to VM IP**
   - Add A record: `your-domain.com` → `YOUR_VM_IP`

2. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## **🎯 Quick Commands Summary:**

```bash
# One-liner setup (run in VM SSH):
curl -fsSL https://raw.githubusercontent.com/your-repo/setup-gcp.sh | bash

# Or run these commands manually:
sudo apt-get update && sudo apt-get install -y nodejs npm chromium-browser postgresql
npm install -g pnpm pm2
git clone https://github.com/vijayacads/Reactive-Resume-AmruthPillai.git
cd Reactive-Resume-AmruthPillai
pnpm install && pnpm run build
# Then follow steps 5-10 above
```

## **🎯 Cost:**
- **VM**: $0/month (Always Free)
- **PostgreSQL**: $0/month (Always Free)
- **Total**: $0/month forever

## **🎯 Benefits:**
- ✅ **1GB RAM**: Sufficient for Chrome + app
- ✅ **Always Free**: No time limits
- ✅ **No sleep**: Always running
- ✅ **Unlimited PDFs**: No generation limits
- ✅ **PostgreSQL included**: Database free

## **🎯 Troubleshooting:**

### **If app doesn't start:**
```bash
# Check logs
pm2 logs reactive-resume

# Restart app
pm2 restart reactive-resume

# Check if port 3000 is in use
sudo netstat -tlnp | grep :3000
```

### **If PDF generation fails:**
```bash
# Check Chrome installation
which chromium-browser

# Test Chrome manually
chromium-browser --headless --disable-gpu --print-to-pdf=test.pdf about:blank
```

### **If database connection fails:**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -U resume_user -d reactive_resume
```

---

**Your Reactive Resume app will be live at: `http://YOUR_VM_IP`** 🚀
