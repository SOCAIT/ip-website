# Complete Admin Panel for Article Management

## 🎉 What Has Been Created

A full-featured admin panel for managing your articles with Supabase backend, including:

### ✅ Features
- **Create, Edit, Delete** articles
- **Image uploads** with Supabase Storage
- **Rich content editor** with blocks (headings, text, images)
- **Author management** with relationships
- **Published/Draft** status control
- **Beautiful UI** matching your existing design

### 📁 Files Created

```
src/
├── lib/
│   ├── supabase.js              # Supabase client setup
│   └── uploadHelpers.js         # Image upload utilities
├── components/
│   ├── ImageUpload.js           # Image upload component
│   └── BlockEditor.js           # Content block editor
└── app/
    └── admin/
        ├── page.js                        # Dashboard (list all articles)
        └── articles/
            ├── new/page.js                # Create new article
            └── edit/[id]/page.js          # Edit article

Documentation:
├── INSTALLATION.md              # Quick installation guide
├── ADMIN_SETUP.md              # Admin panel setup
└── SUPABASE_SETUP.md           # Database schema & setup
```

## 🚀 Quick Setup (5 minutes)

### 1. Install Supabase

```bash
npm install @supabase/supabase-js
```

> **Note:** If you get a permission error, run:
> ```bash
> sudo chown -R 502:20 "/Users/socait/.npm"
> ```

### 2. Create Environment File

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: [Supabase Dashboard](https://supabase.com) → Your Project → Settings → API

### 3. Set Up Database

Go to your Supabase SQL Editor and run:

#### Create Authors Table
```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add yourself as first author
INSERT INTO authors (name, email, bio)
VALUES ('Your Name', 'your@email.com', 'Your bio here');
```

#### Create Articles Table
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  author_id UUID REFERENCES authors(id),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_date ON articles(date DESC);
```

#### Create Storage Bucket

In Supabase Dashboard → Storage:
1. Create bucket named `article-images`
2. Make it **public**

Then run this SQL:
```sql
-- Allow public access to images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'article-images' );

-- Allow authenticated uploads (or public for dev)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'article-images' );
```

### 4. Start Using

```bash
npm run dev
```

Visit: **http://localhost:3000/admin**

## 📊 Database Schema

### Authors Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Author name |
| email | TEXT | Email (unique) |
| avatar_url | TEXT | Profile picture URL |
| bio | TEXT | Author biography |

### Articles Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| slug | TEXT | URL slug (unique) |
| title | TEXT | Article title |
| date | DATE | Publication date |
| excerpt | TEXT | Short description |
| cover_image | TEXT | Cover image URL |
| blocks | JSONB | Content blocks |
| author_id | UUID | Foreign key to authors |
| published | BOOLEAN | Visibility status |

### Block Structure (JSONB)
```javascript
// Heading block
{ type: "heading", level: 1-4, text: "Your heading" }

// Text block
{ type: "text", text: "Your paragraph content" }

// Image block
{ type: "image", src: "/url/to/image", alt: "Alt text", caption: "Optional caption" }
```

## 🎨 Admin Panel URLs

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/admin` | List all articles |
| New Article | `/admin/articles/new` | Create new article |
| Edit Article | `/admin/articles/edit/[id]` | Edit existing article |

## 🔄 Update Your Public Pages

To display articles from Supabase on your website, update these files:

### `src/app/articles/page.js`

Replace the import and make it client-side:

```javascript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });
      setArticles(data || []);
    }
    fetchArticles();
  }, []);

  // ... rest of your component
}
```

### `src/app/articles/[slug]/page.js`

```javascript
'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function ArticleDetail({ params }) {
  const [article, setArticle] = useState(null);
  
  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from('articles')
        .select('*, author:authors(*)')
        .eq('slug', params.slug)
        .single();
      setArticle(data);
    }
    fetchArticle();
  }, [params.slug]);

  // ... rest of your component
}
```

> See `INSTALLATION.md` for complete code examples.

## 📸 How to Use

### Creating an Article

1. Go to `/admin`
2. Click "New Article"
3. Fill in:
   - **Title** - Auto-generates slug
   - **Slug** - URL-friendly identifier
   - **Excerpt** - Short description
   - **Cover Image** - Upload from device
4. Add content blocks:
   - Click "+ Heading" for titles
   - Click "+ Text" for paragraphs
   - Click "+ Image" for images
5. Check "Publish immediately" or save as draft
6. Click "Create Article"

### Editing an Article

1. Go to `/admin`
2. Click "Edit" on any article
3. Modify fields
4. Add/remove/reorder blocks
5. Click "Save Changes"

### Managing Articles

- **View** - See how it looks on your site
- **Publish/Unpublish** - Toggle visibility
- **Delete** - Remove permanently

## 🔒 Security Notes

**Current setup is for development.** For production:

1. **Add Authentication**
   - Use NextAuth.js or Supabase Auth
   - Protect `/admin` routes
   - Add middleware for auth checks

2. **Row Level Security**
   ```sql
   ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Public read published"
   ON articles FOR SELECT
   USING (published = true);
   
   CREATE POLICY "Authenticated users can edit"
   ON articles FOR ALL
   USING (auth.role() = 'authenticated');
   ```

3. **Storage Security**
   - Remove public upload policy
   - Only allow authenticated uploads
   - Add file size limits

## 🐛 Troubleshooting

### Images not uploading
- ✅ Check `article-images` bucket exists
- ✅ Verify bucket is public
- ✅ Check storage policies in SQL editor

### Articles not showing
- ✅ Verify `.env.local` has correct values
- ✅ Restart dev server after adding env vars
- ✅ Check Supabase dashboard for data
- ✅ Look at browser console for errors

### Permission errors
- ✅ Run: `sudo chown -R 502:20 "/Users/socait/.npm"`
- ✅ Clear npm cache: `npm cache clean --force`

### CORS errors
- ✅ Verify Supabase URL is correct
- ✅ Check Supabase project settings → API settings

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)

## 🎯 Next Steps

1. ✅ Install Supabase: `npm install @supabase/supabase-js`
2. ✅ Create `.env.local` with your credentials
3. ✅ Run database setup SQL
4. ✅ Create storage bucket
5. ✅ Test admin panel at `/admin`
6. ✅ Update public article pages
7. 🔐 Add authentication (recommended)
8. 🚀 Deploy to production

## 💡 Tips

- Use the block editor to build rich content
- Images are automatically uploaded to Supabase Storage
- Draft articles won't show on public pages
- Blocks can be reordered with ↑ ↓ buttons
- Preview articles before publishing

---

**Need help?** Check:
- `INSTALLATION.md` - Installation steps
- `ADMIN_SETUP.md` - Admin setup guide  
- `SUPABASE_SETUP.md` - Detailed database setup

Happy blogging! 🎉

