import { createClient } from '@supabase/supabase-js';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import ArticlesBrowser from './ArticlesBrowser';
import './articles.css';

// Re-fetch every five minutes so new posts appear without a redeploy.
export const revalidate = 300;

async function getArticles() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('Supabase is not configured — the articles index will render empty.');
    return [];
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('articles')
      .select('slug, title, excerpt, date, category, cover_image, author_name')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlesPage() {
  // Fetched on the server: the list used to be loaded in a useEffect, so the
  // HTML that crawlers and link unfurlers received said only "Loading articles...".
  const articles = await getArticles();

  return (
    <div className="articles-page">
      <CustomNavbar />
      <section id="articles" className="articles-section">
        <div className="articles-container">
          <div className="articles-header">
            <h1 className="articles-title">Articles</h1>
          </div>

          {articles.length === 0 ? (
            <div className="articles-empty">
              <h3 className="empty-title">Nothing published yet</h3>
              <p className="empty-subtitle">Check back soon.</p>
            </div>
          ) : (
            <ArticlesBrowser articles={articles} />
          )}
        </div>
      </section>
      <Footer position="relative" />
    </div>
  );
}
