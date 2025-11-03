# 🚀 Quick Start Guide

## ⚡ 3-Minute Setup

### 1️⃣ Install Package
```bash
npm install @supabase/supabase-js
```

### 2️⃣ Create `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3️⃣ Your Table is Ready ✅
You already created the table! Just create the storage bucket:

**In Supabase Dashboard → Storage:**
- Create bucket: `article-images`
- Make it: **Public**

**Then run this SQL:**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'article-images' );

CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'article-images' );
```

### 4️⃣ Start Server
```bash
npm run dev
```

### 5️⃣ Create Your First Article
Visit: **http://localhost:3000/admin**

## 📍 Important URLs

| Purpose | URL |
|---------|-----|
| Admin Dashboard | `/admin` |
| Create Article | `/admin/articles/new` |
| Public Articles | `/articles` |
| Individual Article | `/articles/your-slug` |

## 🎯 What Changed

### Admin Panel ✅
- Added **Author Name** field
- Added **Author Avatar** upload
- Added **Author Bio** field
- All fields save to your table

### Public Pages ✅
- Now fetch from **Supabase** (not local file!)
- Show author info with avatar
- Display only published articles
- Real-time updates

## 📝 Create Article Flow

1. Go to `/admin`
2. Click "+ New Article"
3. Fill in:
   - Title
   - Slug (auto-generated)
   - Excerpt
   - Cover Image (upload)
   - **Author Name** ⭐
   - **Author Avatar** ⭐
   - **Author Bio** ⭐
4. Add content blocks
5. Publish
6. Done! ✨

## 🔧 Troubleshooting

**Images not uploading?**
- Check bucket `article-images` exists
- Verify bucket is public
- Check storage policies

**Articles not showing?**
- Verify `.env.local` has correct values
- Restart dev server
- Check browser console for errors

**Database connection failed?**
- Double-check Supabase URL and key
- Ensure project is active in Supabase dashboard

## 📊 Your Schema

```
articles table
├── id (UUID)
├── slug (TEXT) - unique
├── title (TEXT)
├── date (DATE)
├── excerpt (TEXT)
├── cover_image (TEXT)
├── blocks (JSONB)
├── author_name (TEXT) ⭐
├── author_avatar (TEXT) ⭐
├── author_bio (TEXT) ⭐
├── published (BOOLEAN)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## ✨ Features

- ✅ Create/Edit/Delete articles
- ✅ Upload images to Supabase
- ✅ Block editor (headings, text, images)
- ✅ Author info with avatars
- ✅ Publish/draft toggle
- ✅ Real-time updates

## 📚 More Info

- **CHANGES_SUMMARY.md** - Detailed changes
- **ADMIN_PANEL_README.md** - Full documentation
- **INSTALLATION.md** - Setup guide
- **SUPABASE_SETUP.md** - Database details

---

**Ready?** Install the package, set up `.env.local`, create the storage bucket, and start creating! 🎉

