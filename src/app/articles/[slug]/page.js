import { use } from 'react';
import { createClient } from '@supabase/supabase-js';
import CustomNavbar from "@/components/CustomNavbar";
import ArticleContent from "@/components/ArticleContent";
import InteractiveLink from "@/components/InteractiveLink";
import './article-detail.css';

// Server-side Supabase client for metadata generation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate dynamic metadata for each article
export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  
  try {
    const { data: article } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', unwrappedParams.slug)
      .eq('published', true)
      .single();

    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.',
      };
    }

    const excerpt = article.excerpt || article.description || 'Read this article by Ioannis Pastellas';
    const imageUrl = article.cover_image || '/assets/socait_white.png';
    const publishedDate = article.date || new Date().toISOString().split('T')[0];
    
    return {
      title: article.title,
      description: excerpt,
      keywords: article.tags ? article.tags.split(',').map(t => t.trim()) : [],
      authors: [{ name: article.author_name || "Ioannis Pastellas" }],
      alternates: {
        canonical: `https://www.ipastellas.com/articles/${unwrappedParams.slug}`,
      },
      openGraph: {
        title: article.title,
        description: excerpt,
        url: `https://www.ipastellas.com/articles/${unwrappedParams.slug}`,
        type: 'article',
        publishedTime: publishedDate,
        authors: [article.author_name || "Ioannis Pastellas"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article',
      description: 'Read articles by Ioannis Pastellas',
    };
  }
}

async function getArticle(slug) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function ArticleDetail({ params }) {
  const unwrappedParams = await params;
  const article = await getArticle(unwrappedParams.slug);

  // Generate JSON-LD structured data for the article
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || article.description,
    "image": article.cover_image || '/assets/socait_white.png',
    "datePublished": article.date,
    "dateModified": article.updated_at || article.date,
    "author": {
      "@type": "Person",
      "name": article.author_name || "Ioannis Pastellas",
      "url": "https://www.ipastellas.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Ioannis Pastellas",
      "url": "https://www.ipastellas.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ipastellas.com/articles/${unwrappedParams.slug}`
    }
  } : null;

  if (!article) {
    return (
      <div className="article-detail-page">
        <CustomNavbar />
        <section className="article-not-found">
          <div className="not-found-container">
            <div className="not-found-content">
              <div className="not-found-icon">📄</div>
              <h2 className="not-found-title">Article Not Found</h2>
              <p className="not-found-text">
                The article you&apos;re looking for doesn&apos;t exist or has been removed.<br />
                It might have been unpublished or the URL may be incorrect.
              </p>
              <InteractiveLink 
                href="/articles" 
                className="back-link"
              >
                <span className="back-arrow">←</span>
                <span>Back to All Articles</span>
              </InteractiveLink>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <div className="article-detail-page">
        <CustomNavbar />
        
        {/* Hero Section with Cover Image */}
        {article.cover_image && (
          <div className="article-hero">
            <img 
              src={article.cover_image} 
              alt={article.title}
              className="article-hero-image"
            />
            <div className="article-hero-overlay"></div>
          </div>
        )}
        
        <section className="article-section">
          <div className="article-container">
            {/* Article Header */}
            <header className="article-header">
              <h1 className="article-detail-title">
                {article.title}
              </h1>
              
              <div className="article-meta-container">
                <div className="article-meta-item">
                  <span className="meta-icon">📅</span>
                  <span className="meta-text">{article.date}</span>
                </div>
                
                {article.author_name && (
                  <>
                    <span className="meta-separator">•</span>
                    <div className="article-author">
                      {article.author_avatar && (
                        <img 
                          src={article.author_avatar} 
                          alt={article.author_name}
                          className="author-avatar"
                        />
                      )}
                      <div className="author-info">
                        <span className="author-name">{article.author_name}</span>
                        {article.author_bio && (
                          <p className="author-bio">{article.author_bio}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div className="article-body">
              <ArticleContent blocks={article.blocks || []} />
            </div>

            {/* Article Footer */}
            <footer className="article-footer">
              <InteractiveLink 
                href="/articles" 
                className="article-back-link"
              >
                <span className="back-arrow">←</span>
                <span>Back to All Articles</span>
              </InteractiveLink>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
}


