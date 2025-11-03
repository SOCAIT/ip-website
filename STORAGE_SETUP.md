# Supabase Storage Setup Guide

## Storage Bucket Configuration

Your article system is already configured to save images to Supabase Storage! All you need to do is set up the storage bucket in your Supabase dashboard.

## Steps to Configure Storage

### 1. Create the Storage Bucket

1. Go to your Supabase Dashboard: https://app.supabase.com/
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `article-images`
   - **Public bucket**: ✅ **Check this box** (images need to be publicly accessible)
   - **File size limit**: 5MB (recommended)
   - **Allowed MIME types**: Leave as default or restrict to images only

### 2. Set Storage Policies (for Public Access)

After creating the bucket, you need to set up policies to allow uploads and public access:

#### Policy 1: Allow Public Uploads
```sql
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'article-images');
```

#### Policy 2: Allow Public Downloads
```sql
CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');
```

#### Policy 3: Allow Public Deletes (Optional - for admin delete functionality)
```sql
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'article-images');
```

### 3. Apply Policies via Dashboard

1. In Storage → Policies tab
2. Click **"New Policy"**
3. For each policy above:
   - Choose the operation type (INSERT, SELECT, DELETE)
   - Choose **"Create policy from scratch"**
   - Set the policy name
   - Choose target: **public**
   - Copy the policy SQL into the editor
   - Click **"Review"** and **"Save policy"**

Alternatively, you can run the SQL directly:
1. Go to **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Paste all three policies
4. Click **"Run"**

## How It Works

### Image Upload Flow

When you create or edit an article:

1. **Cover Image**: Click "Upload Cover Image" → File is uploaded to `article-images` bucket → URL is saved to database
2. **Author Avatar**: Click "Upload Avatar" → Same process
3. **Content Images**: Add image block → Click "Upload Image" → Same process

### File Structure in Storage

Files are stored with unique names:
```
article-images/
├── abc123-1699123456789.jpg
├── def456-1699123567890.png
└── ghi789-1699123678901.webp
```

Format: `{randomId}-{timestamp}.{extension}`

### Storage Configuration Details

- **Bucket**: `article-images`
- **Max file size**: 5MB (configured in `ImageUpload.js`)
- **Allowed types**: All image formats (jpg, png, gif, webp, etc.)
- **Cache control**: 1 hour (3600 seconds)

## Verification

To verify everything is working:

1. Go to `/admin/articles/new`
2. Try uploading a cover image
3. Check your Supabase Storage dashboard
4. You should see the file in the `article-images` bucket
5. The image URL should be displayed in the preview

## Troubleshooting

### "Upload failed" error
- ✅ Check that the `article-images` bucket exists
- ✅ Check that public upload policy is enabled
- ✅ Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in `.env.local`

### Images not displaying
- ✅ Check that public download policy is enabled
- ✅ Verify the bucket is set to "Public"
- ✅ Check browser console for CORS errors

### File size errors
- ✅ Default limit is 5MB (set in `ImageUpload.js`)
- ✅ You can increase this in the component or Supabase bucket settings

## Security Notes

⚠️ **Current Setup**: Public upload/download (suitable for admin-managed content)

If you want to restrict uploads to authenticated users only:
1. Enable Supabase Auth
2. Modify policies to check `auth.uid()` instead of allowing `public`
3. Update `ImageUpload.js` to include authentication

## Code Reference

The upload functionality is implemented in:
- `/src/lib/uploadHelpers.js` - Upload/delete functions
- `/src/components/ImageUpload.js` - UI component
- `/src/lib/supabase.js` - Supabase client

All images in articles, whether cover images or content images, automatically use Supabase Storage! 🎉

