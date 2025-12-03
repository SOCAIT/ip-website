'use client';

import { useEffect, useState } from 'react';
import CustomNavbar from "@/components/CustomNavbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import './articles.css';

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
    <div className="articles-page">
      <CustomNavbar />
      <section id="articles" className="articles-section">
        <div className="articles-container">
          {/* Decorative background elements */}
          <div className="articles-bg-decoration"></div>
          
          <div className="articles-header">
            <div className="articles-icon-wrapper">
              <span className="articles-icon">✍️</span>
            </div>
            <h2 className="articles-title">
              Articles & Insights
            </h2>
            <p className="articles-subtitle">
              Exploring the intersection of AI, Machine Learning, and Software Engineering
            </p>
          </div>
          
          {loading ? (
            <div className="articles-loading">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="articles-empty">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">No articles yet</h3>
              <p className="empty-subtitle">
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="articles-grid">
              {articles.map((article, index) => (
                <Link 
                  key={article.slug} 
                  href={`/articles/${article.slug}`} 
                  className="article-link"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <article className="article-card">
                    <div className="article-image-wrapper">
                      {article.cover_image ? (
                        <img 
                          src={article.cover_image} 
                          alt={article.title}
                          className="article-image"
                        />
                      ) : (
                        <div className="article-placeholder">
                          <span className="placeholder-icon">📄</span>
                        </div>
                      )}
                      <div className="article-overlay"></div>
                    </div>
                    
                    <div className="article-content">
                      <h3 className="article-title">
                        {article.title}
                      </h3>
                      
                      <div className="article-meta">
                        <span className="meta-date">
                          <span className="meta-icon">📅</span>
                          {article.date}
                        </span>
                        {article.author_name && (
                          <span className="meta-author">
                            <span className="meta-icon">✍️</span>
                            {article.author_name}
                          </span>
                        )}
                      </div>
                      
                      <p className="article-excerpt">
                        {article.excerpt || 'Click to read more...'}
                      </p>
                      
                      <div className="article-read-more">
                        <span>Read Article</span>
                        <span className="read-more-arrow">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


