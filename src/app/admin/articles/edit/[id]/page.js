'use client';

import { use, useState, useEffect } from 'react';
import { adminFetch } from '@/lib/adminApi';
import ArticleForm from '@/components/ArticleForm';
import { ToastProvider } from '@/components/Toast';
import CustomNavbar from '@/components/CustomNavbar';
import '../../../admin.css';

export default function EditArticlePage({ params }) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await adminFetch(`/api/admin/articles/${id}`);
        setInitialData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (formData) => {
    await adminFetch(`/api/admin/articles/${id}`, {
      method: 'PATCH',
      body: {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        cover_image: formData.cover_image,
        author_name: formData.author_name || 'Unknown',
        author_avatar: formData.author_avatar,
        author_bio: formData.author_bio,
        blocks: formData.blocks,
        published: formData.published,
      },
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <CustomNavbar />
        <div className="admin-container">
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <CustomNavbar />
        <div className="admin-container">
          <div className="admin-loading">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <ArticleForm
        initialData={initialData}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </ToastProvider>
  );
}
