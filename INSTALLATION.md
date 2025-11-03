# Installation Instructions

## Fix NPM Permission Issue (if needed)

If you see an npm cache permission error, run:

```bash
sudo chown -R 502:20 "/Users/socait/.npm"
```

## Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Complete Setup Checklist

### ✅ Files Created

**Backend/Utils:**
- ✅ `src/lib/supabase.js` - Supabase client configuration
- ✅ `src/lib/uploadHelpers.js` - Image upload utilities

**Components:**
- ✅ `src/components/ImageUpload.js` - Image upload component
- ✅ `src/components/BlockEditor.js` - Content block editor

**Admin Pages:**
- ✅ `src/app/admin/page.js` - Article management dashboard
- ✅ `src/app/admin/articles/new/page.js` - Create new article
- ✅ `src/app/admin/articles/edit/[id]/page.js` - Edit existing article

**Documentation:**
- ✅ `SUPABASE_SETUP.md` - Database setup guide
- ✅ `ADMIN_SETUP.md` - Quick start guide
- ✅ `INSTALLATION.md` - This file

### 🔧 Configuration Needed

1. **Create `.env.local`** file in project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. **Set up Supabase** (see `SUPABASE_SETUP.md`):
   - Create authors table
   - Create articles table  
   - Create article-images bucket
   - Set up storage policies

### 📝 To-Do: Update Existing Article Pages

You'll need to update these files to fetch from Supabase:

**`src/app/articles/page.js`** - Update to:
```javascript
'use client';

import { useEffect, useState } from 'react';
import CustomNavbar from "@/components/CustomNavbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div><CustomNavbar /><p>Loading...</p></div>;

  return (
    <div>
      <CustomNavbar />
      <section id="articles" className="p-5 text-center">
        <div className="container">
          <h2 className="mb-4" style={{ color: '#9AE6B4', textShadow: '0 0 8px rgba(154,230,180,0.4)' }}>
            Articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(6px)',
                  color: '#fff'
                }}>
                  {a.cover_image && (
                    <img src={a.cover_image} alt="cover" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '1rem', textAlign: 'left' }}>
                    <h3 style={{ margin: 0, color: '#fff' }}>{a.title}</h3>
                    <small style={{ opacity: 0.85, color: '#ddd' }}>{a.date}</small>
                    <p style={{ marginTop: '0.5rem', color: '#fff' }}>{a.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

**`src/app/articles/[slug]/page.js`** - Update to:
```javascript
'use client';

import { useEffect, useState } from 'react';
import CustomNavbar from "@/components/CustomNavbar";
import ArticleContent from "@/components/ArticleContent";
import { supabase } from "@/lib/supabase";

export default function ArticleDetail({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:authors(*)
        `)
        .eq('slug', params.slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <CustomNavbar />
        <section className="p-5 text-center">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <CustomNavbar />
        <section className="p-5 text-center">
          <p>Article not found.</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <section id="article" className="p-5 text-center">
        <div className="container" style={{ textAlign: 'left', maxWidth: '1100px' }}>
          <h1 style={{ color: '#9AE6B4', textShadow: '0 0 8px rgba(154,230,180,0.4)' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <small style={{ opacity: 0.85, color: '#ddd' }}>{article.date}</small>
            {article.author && (
              <>
                <span style={{ color: '#666' }}>•</span>
                <small style={{ opacity: 0.85, color: '#ddd' }}>
                  By {article.author.name}
                </small>
              </>
            )}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <ArticleContent blocks={article.blocks || []} />
          </div>
        </div>
      </section>
    </div>
  );
}
```

## Quick Start

1. **Install dependency:**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create `.env.local`** with your Supabase credentials

3. **Run database setup** from `SUPABASE_SETUP.md`

4. **Update article pages** (code above)

5. **Start dev server:**
   ```bash
   npm run dev
   ```

6. **Access admin panel:** `http://localhost:3000/admin`

## What You Get

- 📝 **Full CRUD** for articles
- 🖼️ **Image uploads** to Supabase Storage
- 📦 **Block editor** (headings, text, images)
- 👤 **Author support** with relationships
- 🎨 **Matches your existing design**
- ✅ **Published/draft** status

## Need Help?

See `ADMIN_SETUP.md` and `SUPABASE_SETUP.md` for detailed instructions.

