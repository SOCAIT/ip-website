'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CustomNavbar from '@/components/CustomNavbar';
import ImageUpload from '@/components/ImageUpload';
import BlockEditor from '@/components/BlockEditor';
import ArticleContent from '@/components/ArticleContent';
import { useToast } from '@/components/Toast';

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  cover_image: '',
  author_name: '',
  author_avatar: '',
  author_bio: '',
  published: true,
  blocks: [],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ArticleForm({
  initialData = null,
  onSubmit,
  mode = 'new',
}) {
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    author: false,
    content: true,
  });

  const [formData, setFormData] = useState(EMPTY_FORM);
  const savedSnapshot = useRef(JSON.stringify(EMPTY_FORM));

  useEffect(() => {
    if (initialData) {
      const merged = { ...EMPTY_FORM, ...initialData };
      setFormData(merged);
      savedSnapshot.current = JSON.stringify(merged);
    }
  }, [initialData]);

  const isDirty = JSON.stringify(formData) !== savedSnapshot.current;

  // Warn on navigation when dirty
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTitleChange = useCallback((title) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(mode === 'new' ? { slug: generateSlug(title) } : {}),
    }));
  }, [mode]);

  const set = useCallback((patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast('Title and slug are required', 'error');
      return;
    }

    try {
      setSaving(true);
      await onSubmit(formData);
      savedSnapshot.current = JSON.stringify(formData);
      toast(
        mode === 'new' ? 'Article created' : 'Changes saved',
        'success',
      );
      router.push('/admin');
    } catch (err) {
      console.error('Save error:', err);
      toast(err.message || 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Preview overlay ──────────────────────────────────────
  if (showPreview) {
    return (
      <div className="admin-preview-overlay">
        <div className="admin-preview-bar">
          <span>Preview</span>
          <button
            className="admin-btn admin-btn--sm"
            onClick={() => setShowPreview(false)}
          >
            Close preview
          </button>
        </div>
        <div className="admin-preview-content">
          {formData.cover_image && (
            <Image
              src={formData.cover_image}
              alt={formData.title || ''}
              width={960}
              height={360}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                marginBottom: '2rem',
                maxHeight: '360px',
                objectFit: 'cover',
              }}
            />
          )}
          <h1 className="admin-preview-title">{formData.title || 'Untitled'}</h1>
          {formData.excerpt && (
            <p className="admin-preview-excerpt">{formData.excerpt}</p>
          )}
          <ArticleContent blocks={formData.blocks || []} />
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────
  return (
    <div className="admin-page">
      <CustomNavbar />
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>{mode === 'new' ? 'New article' : 'Edit article'}</h1>
            <p>{mode === 'new' ? 'Create and publish a new article' : 'Update content and settings'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="admin-section">
            <div
              className="admin-section__header"
              onClick={() => toggleSection('basic')}
            >
              <h2 className="admin-section__title">Basic information</h2>
              <span className={`admin-section__chevron${expandedSections.basic ? ' admin-section__chevron--open' : ''}`}>
                ▾
              </span>
            </div>
            {expandedSections.basic && (
              <div className="admin-section__body">
                <div className="admin-field">
                  <label className="admin-label admin-label--required">Title</label>
                  <input
                    className="admin-input"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Article title"
                    required
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label admin-label--required">Slug</label>
                  <input
                    className="admin-input"
                    value={formData.slug}
                    onChange={(e) => set({ slug: mode === 'new' ? generateSlug(e.target.value) : e.target.value })}
                    placeholder="url-friendly-slug"
                    required
                    pattern="[a-z0-9-]+"
                  />
                  <span className="admin-hint">
                    /articles/{formData.slug || '...'}
                  </span>
                </div>
                <div className="admin-field">
                  <label className="admin-label">Excerpt</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.excerpt}
                    onChange={(e) => set({ excerpt: e.target.value })}
                    placeholder="Brief summary shown in listings"
                    rows={3}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Cover image</label>
                  <ImageUpload
                    currentImage={formData.cover_image}
                    onUploadComplete={(url) => set({ cover_image: url })}
                    label="Upload Cover Image"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Author */}
          <div className="admin-section">
            <div
              className="admin-section__header"
              onClick={() => toggleSection('author')}
            >
              <h2 className="admin-section__title">Author</h2>
              <span className={`admin-section__chevron${expandedSections.author ? ' admin-section__chevron--open' : ''}`}>
                ▾
              </span>
            </div>
            {expandedSections.author && (
              <div className="admin-section__body">
                <div className="admin-field">
                  <label className="admin-label">Name</label>
                  <input
                    className="admin-input"
                    value={formData.author_name}
                    onChange={(e) => set({ author_name: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Avatar</label>
                  <ImageUpload
                    currentImage={formData.author_avatar}
                    onUploadComplete={(url) => set({ author_avatar: url })}
                    label="Upload Avatar"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Bio</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.author_bio}
                    onChange={(e) => set({ author_bio: e.target.value })}
                    placeholder="Short author bio"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="admin-section">
            <div
              className="admin-section__header"
              onClick={() => toggleSection('content')}
            >
              <h2 className="admin-section__title">Content</h2>
              <span className={`admin-section__chevron${expandedSections.content ? ' admin-section__chevron--open' : ''}`}>
                ▾
              </span>
            </div>
            {expandedSections.content && (
              <div className="admin-section__body">
                <BlockEditor
                  blocks={formData.blocks}
                  onChange={(blocks) => set({ blocks })}
                />
              </div>
            )}
          </div>

          {/* Sticky bar */}
          <div className="admin-sticky-bar">
            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => set({ published: e.target.checked })}
              />
              <span className="admin-toggle__track" />
              <span className="admin-toggle__label">
                {formData.published ? 'Published' : 'Draft'}
              </span>
            </label>

            {isDirty && (
              <>
                <span className="admin-dirty-dot" />
                <span className="admin-dirty-label">Unsaved</span>
              </>
            )}

            <span className="admin-sticky-bar__spacer" />

            <button
              type="button"
              className="admin-btn"
              onClick={() => setShowPreview(true)}
            >
              Preview
            </button>
            <button
              type="button"
              className="admin-btn"
              onClick={() => router.push('/admin')}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn--primary"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : mode === 'new'
                  ? 'Publish'
                  : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
