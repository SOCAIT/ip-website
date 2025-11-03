import { supabase } from './supabase';

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

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
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
    
    // Extract file path from URL
    const urlParts = url.split(`${bucket}/`);
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
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

