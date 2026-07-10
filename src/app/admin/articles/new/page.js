'use client';

import { supabase } from '@/lib/supabase';
import ArticleForm from '@/components/ArticleForm';
import { ToastProvider } from '@/components/Toast';
import '../../admin.css';

export default function NewArticlePage() {
  const handleSubmit = async (formData) => {
    const { error } = await supabase
      .from('articles')
      .insert([{
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        cover_image: formData.cover_image,
        author_name: formData.author_name || 'Unknown',
        author_avatar: formData.author_avatar,
        author_bio: formData.author_bio,
        blocks: formData.blocks,
        date: new Date().toISOString().split('T')[0],
        published: formData.published,
      }]);
    if (error) throw error;
  };

  return (
    <ToastProvider>
      <ArticleForm onSubmit={handleSubmit} mode="new" />
    </ToastProvider>
  );
}
