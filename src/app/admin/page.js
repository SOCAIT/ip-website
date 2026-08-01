'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import CustomNavbar from '@/components/CustomNavbar';
import { ToastProvider, useToast } from '@/components/Toast';
import { SHOW_AUTOMATIONS } from '@/lib/features';
import './admin.css';

function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      toast('Failed to load articles: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const deleteArticle = async (id, slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) throw error;
      toast('Article deleted');
      fetchArticles();
    } catch (error) {
      toast('Delete failed: ' + error.message, 'error');
    }
  };

  const togglePublished = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      toast(currentStatus ? 'Moved to drafts' : 'Published');
      fetchArticles();
    } catch (error) {
      toast('Update failed: ' + error.message, 'error');
    }
  };

  return (
    <div className="admin-page">
      <CustomNavbar />
      <div className="admin-container admin-container--wide">
        <nav className="admin-tabs">
          <Link href="/admin" className="admin-tab admin-tab--active">Articles</Link>
          {SHOW_AUTOMATIONS && (
            <Link href="/admin/automations" className="admin-tab">Automations</Link>
          )}
        </nav>
        <div className="admin-header">
          <div>
            <h1>Articles</h1>
            <p>Manage and publish your content</p>
          </div>
          <Link href="/admin/articles/new">
            <button className="admin-btn admin-btn--primary">+ New article</button>
          </Link>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="be-empty">
            <p>No articles yet</p>
            <small>Create your first article to get started</small>
          </div>
        ) : (
          <div className="admin-articles">
            {articles.map((article) => (
              <div key={article.id} className="admin-article-row">
                {article.cover_image ? (
                  <Image
                    src={article.cover_image}
                    alt={article.title}
                    width={80}
                    height={56}
                    className="admin-article-thumb"
                  />
                ) : (
                  <div className="admin-article-thumb--empty">--</div>
                )}

                <div className="admin-article-info">
                  <h3>{article.title}</h3>
                  <div className="admin-article-meta">
                    <span className={`admin-badge ${article.published ? 'admin-badge--published' : 'admin-badge--draft'}`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                    <span>{article.date}</span>
                    <span>/{article.slug}</span>
                  </div>
                </div>

                <div className="admin-article-actions">
                  <Link href={`/admin/articles/edit/${article.id}`}>
                    <button className="admin-btn admin-btn--sm">Edit</button>
                  </Link>
                  <Link href={`/articles/${article.slug}`}>
                    <button className="admin-btn admin-btn--sm admin-btn--ghost">View</button>
                  </Link>
                  <button
                    className="admin-btn admin-btn--sm"
                    onClick={() => togglePublished(article.id, article.published)}
                  >
                    {article.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    className="admin-btn admin-btn--sm admin-btn--danger"
                    onClick={() => deleteArticle(article.id, article.slug)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminDashboard />
    </ToastProvider>
  );
}
