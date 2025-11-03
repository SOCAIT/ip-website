'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CustomNavbar from '@/components/CustomNavbar';
import ImageUpload from '@/components/ImageUpload';
import BlockEditor from '@/components/BlockEditor';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    author: false,
    content: true
  });
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    author_name: '',
    author_avatar: '',
    author_bio: '',
    published: true,
    blocks: []
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)  // Always auto-generate slug from title
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug) {
      alert('Title and slug are required');
      return;
    }

    // Ensure slug is properly formatted before saving
    const cleanSlug = generateSlug(formData.slug);

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('articles')
        .insert([{
          title: formData.title,
          slug: cleanSlug,  // Use cleaned slug
          excerpt: formData.excerpt,
          cover_image: formData.cover_image,
          author_name: formData.author_name || 'Unknown',
          author_avatar: formData.author_avatar,
          author_bio: formData.author_bio,
          blocks: formData.blocks,
          date: new Date().toISOString().split('T')[0],
          published: formData.published
        }])
        .select();

      if (error) throw error;

      alert('Article created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error creating article: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem',
    background: 'rgba(255,255,255,0.05)',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.75rem',
    color: '#ddd',
    fontSize: '0.95rem',
    fontWeight: '500'
  };

  const sectionStyle = (isExpanded) => ({
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  });

  const sectionHeaderStyle = {
    padding: '1.25rem 1.5rem',
    background: 'rgba(154,230,180,0.08)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background 0.2s ease'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)' }}>
      <CustomNavbar />
      <section className="p-5">
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{ 
              color: '#9AE6B4', 
              textShadow: '0 0 20px rgba(154,230,180,0.4)', 
              marginBottom: '0.5rem',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              ✍️ Create New Article
            </h1>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>
              Fill in the details below to publish your article
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Basic Information Section */}
            <div style={sectionStyle(expandedSections.basic)}>
              <div 
                style={sectionHeaderStyle}
                onClick={() => toggleSection('basic')}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.12)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.08)'}
              >
                <h2 style={{ color: '#9AE6B4', margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📝 Basic Information
                </h2>
                <span style={{ color: '#9AE6B4', fontSize: '1.5rem' }}>
                  {expandedSections.basic ? '−' : '+'}
                </span>
              </div>
              
              {expandedSections.basic && (
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>
                        Title <span style={{ color: '#f56565' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                        placeholder="Enter article title..."
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.background = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Slug <span style={{ color: '#f56565' }}>*</span>
                        <small style={{ color: '#888', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                          (URL-friendly identifier)
                        </small>
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
                        required
                        pattern="[a-z0-9-]+"
                        placeholder="article-slug-here"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.background = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <div style={{ 
                        marginTop: '0.75rem', 
                        padding: '0.75rem', 
                        background: 'rgba(66,153,225,0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(66,153,225,0.2)'
                      }}>
                        <small style={{ color: '#4299e1', fontWeight: '500' }}>
                          🔗 Preview: <span style={{ color: '#9AE6B4' }}>/articles/{formData.slug || 'your-slug'}</span>
                        </small>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Excerpt
                        <small style={{ color: '#888', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                          (Brief summary shown in listings)
                        </small>
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={4}
                        placeholder="Write a compelling excerpt to attract readers..."
                        style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.background = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Cover Image
                      </label>
                      <ImageUpload
                        currentImage={formData.cover_image}
                        onUploadComplete={(url) => setFormData({ ...formData, cover_image: url })}
                        label="Upload Cover Image"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Author Information Section */}
            <div style={sectionStyle(expandedSections.author)}>
              <div 
                style={sectionHeaderStyle}
                onClick={() => toggleSection('author')}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.12)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.08)'}
              >
                <h2 style={{ color: '#9AE6B4', margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  👤 Author Information
                </h2>
                <span style={{ color: '#9AE6B4', fontSize: '1.5rem' }}>
                  {expandedSections.author ? '−' : '+'}
                </span>
              </div>
              
              {expandedSections.author && (
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>
                        Author Name <span style={{ color: '#f56565' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="John Doe"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.background = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Author Avatar
                      </label>
                      <ImageUpload
                        currentImage={formData.author_avatar}
                        onUploadComplete={(url) => setFormData({ ...formData, author_avatar: url })}
                        label="Upload Author Avatar"
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>
                        Author Bio
                      </label>
                      <textarea
                        value={formData.author_bio}
                        onChange={(e) => setFormData({ ...formData, author_bio: e.target.value })}
                        rows={4}
                        placeholder="Write a short bio about the author..."
                        style={{...inputStyle, fontFamily: 'inherit', resize: 'vertical'}}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.background = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.background = 'rgba(255,255,255,0.05)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div style={sectionStyle(expandedSections.content)}>
              <div 
                style={sectionHeaderStyle}
                onClick={() => toggleSection('content')}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.12)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(154,230,180,0.08)'}
              >
                <h2 style={{ color: '#9AE6B4', margin: 0, fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📄 Article Content
                </h2>
                <span style={{ color: '#9AE6B4', fontSize: '1.5rem' }}>
                  {expandedSections.content ? '−' : '+'}
                </span>
              </div>
              
              {expandedSections.content && (
                <div style={{ padding: '2rem' }}>
                  <BlockEditor
                    blocks={formData.blocks}
                    onChange={(blocks) => setFormData({ ...formData, blocks })}
                  />
                </div>
              )}
            </div>

            {/* Publishing Options */}
            <div style={{ 
              background: 'rgba(154,230,180,0.08)', 
              padding: '1.5rem', 
              borderRadius: '16px',
              border: '1px solid rgba(154,230,180,0.2)'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                color: '#ddd', 
                cursor: 'pointer',
                fontSize: '1.05rem'
              }}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  style={{ 
                    width: '20px', 
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#48bb78'
                  }}
                />
                <span>
                  ✅ Publish immediately
                  <small style={{ display: 'block', color: '#888', marginTop: '0.25rem', fontWeight: 'normal' }}>
                    Uncheck to save as draft
                  </small>
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1rem',
              position: 'sticky',
              bottom: '2rem',
              background: 'rgba(15,15,15,0.95)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '1rem 2rem',
                  background: loading ? '#666' : 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: loading ? 'none' : '0 4px 15px rgba(72,187,120,0.3)'
                }}
                onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
              >
                {loading ? '⏳ Creating...' : '🚀 Create Article'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin')}
                disabled={loading}
                style={{
                  padding: '1rem 2rem',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => !loading && (e.target.style.background = 'rgba(255,255,255,0.15)')}
                onMouseOut={(e) => !loading && (e.target.style.background = 'rgba(255,255,255,0.08)')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

