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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)' }}>
      <CustomNavbar />
      <section id="articles" className="p-5 text-center">
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 className="mb-4" style={{ 
              color: '#9AE6B4', 
              textShadow: '0 0 20px rgba(154,230,180,0.4)',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              📚 Articles
            </h2>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>
              Explore my latest thoughts and insights
            </p>
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
              <p style={{ color: '#888', fontSize: '1.1rem' }}>
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
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(154,230,180,0.4)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
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
                          borderBottom: '2px solid rgba(154,230,180,0.2)'
                        }} 
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        borderBottom: '2px solid rgba(255,255,255,0.1)'
                      }}>
                        📄
                      </div>
                    )}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ 
                        margin: '0 0 0.75rem 0', 
                        color: '#9AE6B4',
                        fontSize: '1.3rem',
                        lineHeight: '1.4'
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
                          color: '#888',
                          background: 'rgba(154,230,180,0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          📅 {a.date}
                        </small>
                        {a.author_name && (
                          <small style={{ 
                            color: '#9AE6B4',
                            background: 'rgba(154,230,180,0.1)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem'
                          }}>
                            ✍️ {a.author_name}
                          </small>
                        )}
                      </div>
                      <p style={{ 
                        marginTop: 'auto', 
                        color: '#ccc',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
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


