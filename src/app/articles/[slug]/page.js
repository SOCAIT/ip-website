import { use } from 'react';
import { createClient } from '@supabase/supabase-js';
import CustomNavbar from "@/components/CustomNavbar";
import ArticleContent from "@/components/ArticleContent";
import InteractiveLink from "@/components/InteractiveLink";

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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)' }}>
        <CustomNavbar />
        <section className="p-5 text-center">
          <div className="container" style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '5rem 2rem' 
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px',
              padding: '4rem 2rem',
              border: '2px dashed rgba(245,101,101,0.3)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📄</div>
              <h2 style={{ 
                color: '#9AE6B4', 
                marginBottom: '1rem',
                fontSize: '2rem',
                textShadow: '0 0 20px rgba(154,230,180,0.4)'
              }}>
                Article Not Found
              </h2>
              <p style={{ color: '#ccc', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                The article you&apos;re looking for doesn&apos;t exist or has been removed.<br />
                It might have been unpublished or the URL may be incorrect.
              </p>
              <InteractiveLink 
                href="/articles" 
                style={{
                  display: 'inline-block',
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(72,187,120,0.3)'
                }}
                hoverStyle={{
                  transform: 'translateY(-2px)'
                }}
              >
                ← Back to All Articles
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)' }}>
        <CustomNavbar />
        <section id="article" className="p-5">
          <div className="container" style={{ textAlign: 'left', maxWidth: '1100px', padding: '2rem 1rem' }}>
            <h1 style={{ color: '#9AE6B4', textShadow: '0 0 8px rgba(154,230,180,0.4)', marginBottom: '0.5rem' }}>
              {article.title}
            </h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <small style={{ opacity: 0.85, color: '#ddd' }}>
              📅 {article.date}
            </small>
            
            {article.author_name && (
              <>
                <span style={{ color: '#666' }}>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {article.author_avatar && (
                    <img 
                      src={article.author_avatar} 
                      alt={article.author_name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(154,230,180,0.3)'
                      }}
                    />
                  )}
                  <div>
                    <small style={{ opacity: 0.85, color: '#9AE6B4', fontWeight: 'bold' }}>
                      {article.author_name}
                    </small>
                    {article.author_bio && (
                      <p style={{ 
                        margin: 0, 
                        fontSize: '0.75rem', 
                        opacity: 0.7, 
                        color: '#ddd',
                        maxWidth: '300px' 
                      }}>
                        {article.author_bio}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <ArticleContent blocks={article.blocks || []} />
          </div>

          <div style={{ 
            marginTop: '3rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <InteractiveLink 
              href="/articles" 
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'rgba(154,230,180,0.1)',
                color: '#9AE6B4',
                textDecoration: 'none',
                borderRadius: '8px',
                border: '1px solid rgba(154,230,180,0.3)',
                transition: 'all 0.2s'
              }}
              hoverStyle={{
                background: 'rgba(154,230,180,0.2)'
              }}
            >
              ← Back to All Articles
            </InteractiveLink>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}


