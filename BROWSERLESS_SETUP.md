# 🌐 Browserless Setup Guide

## Step 1: Create Browserless Account
1. Go to [browserless.io](https://browserless.io)
2. Click "Get Started Free"
3. Sign up with GitHub/Google or email
4. Verify your email

## Step 2: Get Your Token
1. After login, you'll see your dashboard
2. Copy your **WebSocket URL** and **Token**
3. Your WebSocket URL looks like: `wss://chrome.browserless.io`
4. Your token looks like: `abc123def456...`

## Step 3: Add to Render Environment Variables

Add these to your Render environment variables:

| Variable Name | Value |
|---------------|-------|
| `CHROME_URL` | `wss://chrome.browserless.io` |
| `CHROME_TOKEN` | `your-browserless-token` |
| `CHROME_IGNORE_HTTPS_ERRORS` | `false` |

**Replace:**
- `your-browserless-token` with your actual token from Browserless dashboard

## Step 4: Test Connection
Once deployed, your app will automatically test the connection to Browserless for PDF generation.
