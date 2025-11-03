# 🔐 Netlify Environment Variables Setup

## ⚠️ IMPORTANT: Required Before Deployment

Your build is failing because environment variables are not configured in Netlify. Follow these steps:

## Step-by-Step Guide

### 1. Go to Netlify Dashboard
1. Log in to [Netlify](https://app.netlify.com)
2. Select your site (ip-next or your site name)

### 2. Navigate to Environment Variables
1. Click **Site configuration** in the left sidebar
2. Click **Environment variables**
3. Or go directly to: `https://app.netlify.com/sites/YOUR_SITE_NAME/configuration/env`

### 3. Add Required Variables

Click **Add a variable** for each of these:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Your Supabase project URL (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
- **Scopes:** Production, Deploy previews, Branch deploys ✅ (check all)

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Your Supabase anon/public key
- **Scopes:** Production, Deploy previews, Branch deploys ✅ (check all)

#### Variable 3: ADMIN_USERNAME
- **Key:** `ADMIN_USERNAME`
- **Value:** Your admin username (e.g., `admin`)
- **Scopes:** Production, Deploy previews, Branch deploys ✅ (check all)

#### Variable 4: ADMIN_PASSWORD
- **Key:** `ADMIN_PASSWORD`
- **Value:** Your secure admin password
- **Scopes:** Production, Deploy previews, Branch deploys ✅ (check all)

### 4. Where to Find Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** under Project Settings
5. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Redeploy Your Site

After adding all variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Or push a new commit to GitHub (if auto-deploy is enabled)

## ✅ Verification Checklist

Before triggering a new deploy, verify:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `ADMIN_USERNAME` is set
- [ ] `ADMIN_PASSWORD` is set
- [ ] All scopes are checked (Production, Deploy previews, Branch deploys)

## 🚀 What Happens Next

Once environment variables are set:
1. The sitemap will successfully fetch articles from Supabase
2. Admin authentication will work
3. The site will deploy successfully
4. All features will be functional

## 🔒 Security Note

- ✅ These variables are already in your `.gitignore` (won't be committed to GitHub)
- ✅ The `NEXT_PUBLIC_*` variables are safe to expose to the client (they're public)
- ✅ Keep `ADMIN_PASSWORD` secure and strong
- ✅ Never share your environment variables publicly

## 📸 Screenshot Guide

If you need visual help:

1. **Site Configuration** → Click "Environment variables"
2. **Add a variable** → Enter Key and Value
3. **Select scopes** → Check all boxes
4. **Save** → Click "Add variable"
5. **Repeat** for all 4 variables
6. **Deploy** → Trigger new deployment

## 🆘 Troubleshooting

### Build still failing?
- Double-check variable names (case-sensitive!)
- Make sure there are no extra spaces in values
- Verify Supabase URL format: `https://xxxxx.supabase.co`
- Try clearing Netlify cache: Settings → Build & deploy → Clear cache

### Admin login not working?
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set correctly
- Check for typos in variable names

### Articles not loading?
- Verify Supabase credentials are correct
- Check Supabase database has articles table
- Ensure RLS policies allow public reads

## 📞 Need Help?

If you're still having issues:
1. Check Netlify build logs for specific errors
2. Verify Supabase is accessible
3. Test locally with `npm run build` first

---

**Once you've set these up, your deployment should succeed!** 🎉

