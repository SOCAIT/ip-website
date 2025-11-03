# Admin Panel Setup - Quick Start

## Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from your [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API

## Step 3: Run Database Setup

Copy and run the SQL from `SUPABASE_SETUP.md` in your Supabase SQL Editor:

1. Create the `authors` table
2. Create the `articles` table
3. Create the `article-images` storage bucket
4. Set up storage policies

## Step 4: Start Your Dev Server

```bash
npm run dev
```

## Step 5: Access the Admin Panel

Visit: `http://localhost:3000/admin`

## What You Can Do

✅ **Create Articles** - `/admin/articles/new`
- Add title, slug, excerpt
- Upload cover images
- Build content with blocks (headings, text, images)
- Publish or save as draft

✅ **Edit Articles** - `/admin/articles/edit/[id]`
- Modify all article fields
- Update content blocks
- Change published status

✅ **Manage Articles** - `/admin`
- View all articles
- Toggle publish/unpublish
- Delete articles
- Quick preview links

## File Structure

```
src/
├── lib/
│   ├── supabase.js          # Supabase client
│   └── uploadHelpers.js      # Image upload utilities
├── components/
│   ├── ImageUpload.js        # Image upload component
│   └── BlockEditor.js        # Block editor for articles
└── app/
    └── admin/
        ├── page.js                      # Admin dashboard
        └── articles/
            ├── new/
            │   └── page.js              # Create article
            └── edit/
                └── [id]/
                    └── page.js          # Edit article
```

## Next Steps

1. **Add Authentication**: Secure your admin panel with NextAuth.js or Supabase Auth
2. **Update Public Pages**: Modify `/articles` pages to fetch from Supabase instead of local file
3. **Customize Styling**: Match the admin panel to your brand
4. **Add Features**: 
   - Categories/tags
   - Search functionality
   - Draft preview
   - SEO metadata

## Troubleshooting

**Error: Missing Supabase environment variables**
- Make sure `.env.local` exists and has the correct values
- Restart your dev server after adding environment variables

**Images not uploading**
- Verify the `article-images` bucket exists in Supabase Storage
- Check that storage policies allow uploads (see SUPABASE_SETUP.md)

**Articles not showing**
- Check Supabase dashboard to ensure data was inserted
- Open browser console to see any API errors
- Verify your Supabase URL and key are correct

