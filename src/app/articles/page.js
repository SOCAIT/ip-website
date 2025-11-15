'use client';

import { useEffect, useState } from 'react';
import CustomNavbar from "@/components/CustomNavbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Note: Metadata export is not supported in client components
// Metadata should be defined in a parent layout or converted to server component

export default function ArticlesPage() {
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
        .eq('published', true)
        .order('date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0e1a 0%, #131821 50%, #1a1f2e 100%)'
    }}>
      <CustomNavbar />
      <section id="articles" className="p-5 text-center">
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="mb-4" style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #e8eaed 0%, #d4af37 50%, #64b5f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Playfair Display, serif'
            }}>
              📚 Articles
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.2rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              Explore my latest thoughts and insights
            </p>
          </div>
          
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.2rem',
                fontFamily: 'Inter, sans-serif'
              }}>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '2px dashed var(--accent-gold)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ 
                color: 'var(--accent-gold)', 
                marginBottom: '1rem', 
                fontSize: '1.8rem',
                fontFamily: 'Playfair Display, serif'
              }}>
                No articles yet
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.1rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
              textAlign: 'left'
            }}>
              {articles.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px)',
                    color: 'var(--text-primary)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(212, 175, 55, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
                  }}
                  >
                    {a.cover_image ? (
                      <img 
                        src={a.cover_image} 
                        alt="cover" 
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          borderBottom: '1px solid var(--glass-border)',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        borderBottom: '1px solid var(--glass-border)'
                      }}>
                        📄
                      </div>
                    )}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ 
                        margin: '0 0 0.75rem 0', 
                        color: 'var(--accent-gold)',
                        fontSize: '1.4rem',
                        lineHeight: '1.4',
                        fontWeight: '600',
                        fontFamily: 'Playfair Display, serif'
                      }}>
                        {a.title}
                      </h3>
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem', 
                        marginBottom: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <small style={{ 
                          color: 'var(--text-secondary)',
                          background: 'rgba(212, 175, 55, 0.15)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          📅 {a.date}
                        </small>
                        {a.author_name && (
                          <small style={{ 
                            color: 'var(--accent-slate)',
                            background: 'rgba(100, 181, 246, 0.15)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            ✍️ {a.author_name}
                          </small>
                        )}
                      </div>
                      <p style={{ 
                        marginTop: 'auto', 
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {a.excerpt || 'Click to read more...'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


