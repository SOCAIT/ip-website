import { adminFetch } from './adminApi';

// Uploads and deletes go through /api/admin/upload, which holds the
// service-role key server-side. Only the article-images bucket is supported.

function assertBucket(bucket) {
  if (bucket !== 'article-images') {
    throw new Error(`Unsupported storage bucket: ${bucket}`);
  }
}

/**
 * Upload a single file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name
 * @param {string} folder - Optional folder path
 * @returns {Promise<string>} - Public URL of uploaded file
 */
export async function uploadFile(file, bucket = 'article-images', folder = '') {
  try {
    if (!file) throw new Error('No file provided');
    assertBucket(bucket);

    const form = new FormData();
    form.append('file', file);
    if (folder) form.append('folder', folder);

    const response = await fetch('/api/admin/upload', { method: 'POST', body: form });
    const data = await response.json().catch(() => null);
    if (!response.ok) throw new Error(data?.error || `Upload failed (${response.status})`);

    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

/**
 * Delete a file from Supabase Storage
 * @param {string} url - The public URL of the file
 * @param {string} bucket - The storage bucket name
 */
export async function deleteFile(url, bucket = 'article-images') {
  try {
    if (!url) return;
    assertBucket(bucket);
    if (!url.includes(`${bucket}/`)) return;

    await adminFetch('/api/admin/upload', { method: 'DELETE', body: { url } });
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

/**
 * Upload multiple files
 * @param {FileList} files - Files to upload
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<string[]>} - Array of public URLs
 */
export async function uploadMultipleFiles(files, bucket = 'article-images') {
  const uploadPromises = Array.from(files).map(file =>
    uploadFile(file, bucket)
  );
  return Promise.all(uploadPromises);
}
