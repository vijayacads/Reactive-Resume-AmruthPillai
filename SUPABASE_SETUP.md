# 🔧 Supabase Setup Guide

## Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub/Google or email
4. Click "New Project"

## Step 2: Create Project
1. **Organization**: Select your organization
2. **Name**: `reactive-resume` (or any name)
3. **Database Password**: Create a strong password (save it!)
4. **Region**: Choose closest to you
5. Click "Create new project"

## Step 3: Get Your Keys
1. Wait for project to be ready (2-3 minutes)
2. Go to **Settings** → **API**
3. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 4: Create Storage Bucket
1. Go to **Storage** in left sidebar
2. Click "Create a new bucket"
3. **Name**: `avatars`
4. **Public bucket**: ✅ Check this
5. Click "Create bucket"

## Step 5: Configure CORS (Important!)
1. Go to **Storage** → **Settings**
2. Click "CORS Configuration"
3. Add this configuration:
```json
[
  {
    "origin": "*",
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "headers": ["*"]
  }
]
```
4. Click "Save"

## Step 6: Add to Render Environment Variables

Now add these to your Render environment variables:

| Variable Name | Value |
|---------------|-------|
| `STORAGE_ENDPOINT` | `your-project-id.supabase.co` |
| `STORAGE_PORT` | `443` |
| `STORAGE_REGION` | `us-east-1` |
| `STORAGE_BUCKET` | `avatars` |
| `STORAGE_ACCESS_KEY` | `your-anon-public-key` |
| `STORAGE_SECRET_KEY` | `your-service-role-key` |
| `STORAGE_USE_SSL` | `true` |
| `STORAGE_SKIP_BUCKET_CHECK` | `false` |

**Replace:**
- `your-project-id` with your actual project ID
- `your-anon-public-key` with your anon public key
- `your-service-role-key` with your service role key
