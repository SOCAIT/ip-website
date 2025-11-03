'use client';

import { useState, useRef } from 'react';
import { uploadFile } from '@/lib/uploadHelpers';

export default function ImageUpload({ onUploadComplete, currentImage, label = "Choose Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      setUploading(true);
      setFileName(file.name);
      setUploadProgress(0);

      // Show preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Simulate progress (since Supabase doesn't provide real progress)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload to Supabase Storage
      const publicUrl = await uploadFile(file, 'article-images');

      clearInterval(progressInterval);
      setUploadProgress(100);

      console.log('Upload successful:', publicUrl);
      
      // Callback with the public URL
      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }

      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
      setPreview(currentImage);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    await processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    await processFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    setFileName('');
    if (onUploadComplete) {
      onUploadComplete('');
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          position: 'relative',
          padding: '2rem',
          border: `2px dashed ${dragActive ? '#9AE6B4' : 'rgba(255,255,255,0.3)'}`,
          borderRadius: '12px',
          background: dragActive ? 'rgba(154,230,180,0.1)' : 'rgba(255,255,255,0.05)',
          transition: 'all 0.3s ease',
          cursor: uploading ? 'not-allowed' : 'pointer',
          textAlign: 'center'
        }}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div>
            <div style={{ 
              fontSize: '2rem', 
              marginBottom: '0.5rem',
              animation: 'spin 1s linear infinite'
            }}>
              ⏳
            </div>
            <div style={{ color: '#9AE6B4', marginBottom: '0.5rem' }}>
              Uploading {fileName}...
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
              margin: '0.5rem 0'
            }}>
              <div style={{
                width: `${uploadProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #48bb78, #9AE6B4)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <small style={{ color: '#888' }}>{uploadProgress}%</small>
          </div>
        ) : preview ? (
          <div>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ 
                maxWidth: '100%',
                maxHeight: '300px',
                width: 'auto',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '1rem'
              }} 
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#3182ce'}
                onMouseOut={(e) => e.target.style.background = '#4299e1'}
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#f56565',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#e53e3e'}
                onMouseOut={(e) => e.target.style.background = '#f56565'}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📸</div>
            <div style={{ color: '#9AE6B4', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              {label}
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', margin: '0.5rem 0' }}>
              Drag and drop an image here, or click to browse
            </p>
            <small style={{ color: '#666' }}>
              Supports: JPG, PNG, GIF, WebP (max 5MB)
            </small>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

