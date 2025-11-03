'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import CustomNavbar from '@/components/CustomNavbar';

export default function AdminPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      alert('Error fetching articles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id, slug) => {
    if (!confirm(`Delete article "${slug}"?`)) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('Article deleted successfully!');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article: ' + error.message);
    }
  };

  const togglePublished = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Error updating article: ' + error.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)' }}>
      <CustomNavbar />
      <section className="p-5">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ 
                color: '#9AE6B4', 
                textShadow: '0 0 20px rgba(154,230,180,0.4)',
                margin: '0 0 0.5rem 0',
                fontSize: '2.5rem'
              }}>
                📚 Article Management
              </h1>
              <p style={{ color: '#888', fontSize: '1.1rem', margin: 0 }}>
                Manage and publish your articles
              </p>
            </div>
            <Link href="/admin/articles/new">
              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(72,187,120,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <span style={{ fontSize: '1.5rem' }}>+</span> New Article
              </button>
            </Link>
          </div>

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
              <p style={{ color: '#ddd', fontSize: '1.2rem' }}>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '2px dashed rgba(154,230,180,0.3)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ color: '#9AE6B4', marginBottom: '1rem', fontSize: '1.5rem' }}>
                No articles yet
              </h3>
              <p style={{ color: '#888', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Start creating amazing content for your readers
              </p>
              <Link href="/admin/articles/new">
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(72,187,120,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🚀 Create Your First Article
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {articles.map((article) => (
                <div
                  key={article.id}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr auto',
                    gap: '1.5rem',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(154,230,180,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                >
                  {article.cover_image && (
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '2px solid rgba(154,230,180,0.2)'
                      }}
                    />
                  )}
                  {!article.cover_image && (
                    <div style={{
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      border: '2px dashed rgba(255,255,255,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontSize: '2rem'
                    }}>
                      <span>🖼️</span>
                      <small style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>No cover</small>
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ color: '#9AE6B4', margin: 0, fontSize: '1.3rem' }}>
                        {article.title}
                      </h3>
                      <span style={{ 
                        padding: '0.25rem 0.75rem',
                        background: article.published ? 'rgba(72,187,120,0.2)' : 'rgba(237,137,54,0.2)',
                        color: article.published ? '#48bb78' : '#ed8936',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        border: `1px solid ${article.published ? 'rgba(72,187,120,0.3)' : 'rgba(237,137,54,0.3)'}`
                      }}>
                        {article.published ? '✓ Published' : '⏸ Draft'}
                      </span>
                    </div>
                    <p style={{ color: '#ccc', margin: '0 0 0.75rem 0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      {article.excerpt || 'No excerpt available'}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#888' }}>
                      <span style={{ 
                        background: 'rgba(66,153,225,0.1)', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        border: '1px solid rgba(66,153,225,0.2)'
                      }}>
                        🔗 {article.slug}
                      </span>
                      <span style={{ 
                        background: 'rgba(154,230,180,0.1)', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px',
                        border: '1px solid rgba(154,230,180,0.2)'
                      }}>
                        📅 {article.date}
                      </span>
                      {article.author_name && (
                        <span style={{ 
                          background: 'rgba(159,122,234,0.1)', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px',
                          border: '1px solid rgba(159,122,234,0.2)'
                        }}>
                          ✍️ {article.author_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '140px' }}>
                    <Link href={`/admin/articles/edit/${article.id}`}>
                      <button style={{
                        padding: '0.75rem 1rem',
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#3182ce'}
                      onMouseOut={(e) => e.target.style.background = '#4299e1'}
                      >
                        ✏️ Edit
                      </button>
                    </Link>
                    <Link href={`/articles/${article.slug}`}>
                      <button style={{
                        padding: '0.75rem 1rem',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
                      onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                      >
                        👁️ View
                      </button>
                    </Link>
                    <button
                      onClick={() => togglePublished(article.id, article.published)}
                      style={{
                        padding: '0.75rem 1rem',
                        background: article.published ? '#ed8936' : '#48bb78',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => e.target.style.opacity = '0.85'}
                      onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                      {article.published ? '⏸ Unpublish' : '✓ Publish'}
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id, article.slug)}
                      style={{
                        padding: '0.75rem 1rem',
                        background: '#f56565',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#e53e3e';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = '#f56565';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

