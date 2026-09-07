'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'technical', label: 'Technical' },
  { key: 'philosophical', label: 'Philosophical' },
  { key: 'my_thoughts', label: 'My Thoughts' },
];

/**
 * Receives the full list as a prop from the server component, so every article
 * is present in the initial HTML. Filtering is a client-side concern layered on
 * top — it never removes content crawlers need to see on first paint.
 */
export default function ArticlesBrowser({ articles }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const visible =
    activeCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <>
      <div className="articles-category-tabs">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            type="button"
            className={`category-tab${activeCategory === category.key ? ' active' : ''}`}
            aria-pressed={activeCategory === category.key}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="articles-empty">
          <h3 className="empty-title">Nothing here yet</h3>
          <p className="empty-subtitle">Try another category.</p>
        </div>
      ) : (
        <div className="articles-grid">
          {visible.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="article-link">
              <article className="article-card">
                <div className="article-image-wrapper">
                  {article.cover_image ? (
                    <Image
                      src={article.cover_image}
                      alt=""
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
                      {CATEGORIES.find((c) => c.key === article.category)?.label ?? article.category}
                    </span>
                  )}
                  <h2 className="article-title">{article.title}</h2>

                  <div className="article-meta">
                    <span className="meta-date">{article.date}</span>
                    {article.author_name && <span className="meta-author">{article.author_name}</span>}
                  </div>

                  <p className="article-excerpt">{article.excerpt || 'Open to read.'}</p>

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
    </>
  );
}
