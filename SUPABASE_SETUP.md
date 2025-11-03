# Supabase Setup Guide

This guide will help you set up Supabase for your article management system.

## 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 2. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Save your project URL and anon key

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Create Database Tables

Go to the SQL Editor in your Supabase dashboard and run these commands:

### Create Authors Table

```sql
-- Create authors table
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  twitter TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add your first author
INSERT INTO authors (name, email, bio)
VALUES (
  'Your Name',
  'your.email@example.com',
  'AI/ML Engineer passionate about agentic systems and vision models.'
);
```

### Create Articles Table

```sql
-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_date ON articles(date DESC);
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_published ON articles(published);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 5. Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `article-images`
3. Make it public
4. Run these policies in SQL Editor:

```sql
-- Public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'article-images' );

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'article-images' 
  AND auth.role() = 'authenticated'
);

-- Authenticated users can update
CREATE POLICY "Users can update uploads"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'article-images' AND auth.role() = 'authenticated' );

-- Authenticated users can delete
CREATE POLICY "Users can delete uploads"
ON storage.objects FOR DELETE
USING ( bucket_id = 'article-images' AND auth.role() = 'authenticated' );
```

**OR** for development, make it completely public:

```sql
-- Public upload (for development only!)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'article-images' );

CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'article-images' );

CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'article-images' );
```

## 6. Migrate Existing Articles (Optional)

If you want to migrate your existing articles from `articles.js`:

```sql
-- Get your author ID first
SELECT id FROM authors LIMIT 1;

-- Then insert your articles (replace author_id with your actual ID)
INSERT INTO articles (slug, title, date, excerpt, cover_image, author_id, blocks)
VALUES (
  'first-post',
  'Agentic Systems: From RL to LLMs',
  '2025-09-16',
  'Bridging classical reinforcement learning with modern agentic LLM stacks.',
  '/assets/projects/wot.png',
  'YOUR-AUTHOR-ID-HERE',
  '[
    {"type": "heading", "level": 1, "text": "Agentic Systems"},
    {"type": "text", "text": "In this article, we explore how reinforcement learning concepts inform design choices for agentic LLM applications: memory, tools, and alignment."},
    {"type": "image", "src": "/assets/projects/syntrafit_sm.gif", "alt": "Agent Loop", "caption": "Feedback loops matter: observe → plan → act → reflect."},
    {"type": "heading", "level": 2, "text": "Design Principles"},
    {"type": "text", "text": "Start small with a single tool, instrument everything, and iterate on reward / success metrics that reflect user value."}
  ]'::jsonb
);

INSERT INTO articles (slug, title, date, excerpt, cover_image, author_id, blocks)
VALUES (
  'vision-xai',
  'Vision + XAI for Trustworthy Perception',
  '2025-07-01',
  'A practical take on explainability overlays and saliency for robust perception.',
  '/assets/projects/drone.jpeg',
  'YOUR-AUTHOR-ID-HERE',
  '[
    {"type": "heading", "level": 1, "text": "Explaining Vision Models"},
    {"type": "text", "text": "We examine quick wins for explainability overlays in production pipelines, without blocking performance budgets."},
    {"type": "image", "src": "/assets/ml.png", "alt": "XAI Overlay", "caption": "Saliency maps and bounding box rationales."}
  ]'::jsonb
);
```

## 7. Update Article Pages to Use Supabase

Update your existing article pages to fetch from Supabase instead of the local file.

See the next section for the updated code.

## 8. Test the Admin Panel

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/admin`
3. Try creating, editing, and deleting articles
4. Upload images and see them stored in Supabase

## Security Notes

- The examples above use public storage policies for simplicity
- For production, you should implement proper authentication
- Consider using Row Level Security (RLS) for articles
- Add authentication to your admin panel (NextAuth.js, Supabase Auth, etc.)

## Admin Panel URLs

- Article list: `/admin`
- Create article: `/admin/articles/new`
- Edit article: `/admin/articles/edit/[id]`

## Troubleshooting

### Images not uploading
- Check that the `article-images` bucket exists
- Verify storage policies are set correctly
- Check browser console for errors

### Articles not fetching
- Verify your environment variables are set
- Check Supabase dashboard for data
- Look at browser network tab for API errors

### CORS errors
- Make sure you're using the correct Supabase URL
- Check that your domain is allowed in Supabase settings

