# Fix Article Slug

## Problem
Your article has an invalid slug with spaces and special characters:
```
"SyntraFit: An Agentic AI mobile app for make fitness easy and intelligent."
```

This should be a URL-friendly slug like:
```
"syntrafit-an-agentic-ai-mobile-app-for-make-fitness-easy-and-intelligent"
```

## Solution

### Option 1: Fix via Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to **Table Editor** → **articles**
3. Find the article with title "SyntraFit: An Agentic AI mobile app..."
4. Click on the **slug** field
5. Replace with: `syntrafit-an-agentic-ai-mobile-app-for-make-fitness-easy-and-intelligent`
6. Save the change

### Option 2: Fix via SQL Editor

Run this SQL in your Supabase SQL Editor:

```sql
-- Update the article slug
UPDATE articles
SET slug = 'syntrafit-an-agentic-ai-mobile-app-for-make-fitness-easy-and-intelligent'
WHERE id = '1cea8216-7602-432a-a080-1672191be7f3';

-- Verify the change
SELECT id, title, slug FROM articles WHERE id = '1cea8216-7602-432a-a080-1672191be7f3';
```

### Option 3: Simpler Slug

If you want a shorter, cleaner slug, use this instead:

```sql
-- Update to a simpler slug
UPDATE articles
SET slug = 'syntrafit-agentic-ai-fitness-app'
WHERE id = '1cea8216-7602-432a-a080-1672191be7f3';
```

Then your article will be accessible at:
- `/articles/syntrafit-agentic-ai-fitness-app`

## After Fixing

1. Save the change in Supabase
2. Go to: `http://localhost:3000/articles/syntrafit-agentic-ai-mobile-app-for-make-fitness-easy-and-intelligent`
   (or the simpler slug if you used Option 3)
3. Your article should now load! ✅

## What I Fixed in the Code

I updated the article creation form to **always generate proper URL-friendly slugs** automatically:

- When you type a title, the slug is auto-generated
- Before saving, the slug is cleaned to remove any invalid characters
- Slugs are always lowercase with hyphens instead of spaces

**From now on, new articles will automatically get proper slugs!**

## Quick Fix Command

If you want to just use a simple slug "syntrafit", run:

```sql
UPDATE articles SET slug = 'syntrafit' WHERE id = '1cea8216-7602-432a-a080-1672191be7f3';
```

Then access at: `/articles/syntrafit`

