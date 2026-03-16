'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import CustomNavbar from "@/components/CustomNavbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import './articles.css';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'technical', label: 'Technical' },
  { key: 'philosophical', label: 'Philosophical' },
  { key: 'my_thoughts', label: 'My Thoughts' },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

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

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="articles-page">
      <CustomNavbar />
      <section id="articles" className="articles-section">
        <div className="articles-container">
          <div className="articles-header">
            <h2 className="articles-title">Articles &amp; Insights</h2>
            <div className="articles-category-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  className={`category-tab${activeCategory === cat.key ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="articles-loading">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading articles...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="articles-empty">
              <h3 className="empty-title">No articles yet</h3>
              <p className="empty-subtitle">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filtered.map((article) => (
                <Link 
                  key={article.slug} 
                  href={`/articles/${article.slug}`} 
                  className="article-link"
                >
                  <article className="article-card">
                    <div className="article-image-wrapper">
                      {article.cover_image ? (
                        <Image 
                          src={article.cover_image} 
                          alt={article.title}
                          className="article-image"
                          width={600}
                          height={400}
                          loading="lazy"
                        />
                      ) : (
                        <div className="article-placeholder" />
                      )}
                    </div>
                    
                    <div className="article-content">
                      {article.category && (
                        <span className={`article-category-badge category-${article.category}`}>
                          {CATEGORIES.find(c => c.key === article.category)?.label ?? article.category}
                        </span>
                      )}
                      <h3 className="article-title">{article.title}</h3>
                      
                      <div className="article-meta">
                        <span className="meta-date">{article.date}</span>
                        {article.author_name && (
                          <span className="meta-author">{article.author_name}</span>
                        )}
                      </div>
                      
                      <p className="article-excerpt">
                        {article.excerpt || 'Click to read more...'}
                      </p>
                      
                      <div className="article-read-more">
                        <span>Read article</span>
                        <span className="read-more-arrow">&#8599;</span>
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
