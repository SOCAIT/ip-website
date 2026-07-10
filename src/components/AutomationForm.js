'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CustomNavbar from '@/components/CustomNavbar';
import { useToast } from '@/components/Toast';

const EMPTY_FORM = {
  title: '',
  slug: '',
  platform: 'n8n',
  description: '',
  trigger: '',
  output: '',
  tools: [],
  workflow_json: null,
  published: true,
};

const PLATFORMS = ['n8n', 'Zapier', 'Make', 'Other'];

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function countNodes(workflow) {
  if (!workflow || typeof workflow !== 'object') return 0;
  return Array.isArray(workflow.nodes) ? workflow.nodes.length : 0;
}

export default function AutomationForm({
  initialData = null,
  onSubmit,
  mode = 'new',
}) {
  const router = useRouter();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [toolsInput, setToolsInput] = useState('');
  const savedSnapshot = useRef(JSON.stringify(EMPTY_FORM));
  const fileRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      const merged = {
        ...EMPTY_FORM,
        ...initialData,
        tools: Array.isArray(initialData.tools) ? initialData.tools : [],
      };
      setFormData(merged);
      setToolsInput((merged.tools || []).join(', '));
      savedSnapshot.current = JSON.stringify(merged);
    }
  }, [initialData]);

  useEffect(() => {
    const parsed = toolsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, tools: parsed }));
  }, [toolsInput]);

  const isDirty = JSON.stringify(formData) !== savedSnapshot.current;

  useEffect(() => {
    if (!isDirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const set = useCallback((patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleTitleChange = useCallback((title) => {
    setFormData((prev) => ({
      ...prev,
      title,
      ...(mode === 'new' ? { slug: generateSlug(title) } : {}),
    }));
  }, [mode]);

  const handleWorkflowFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      set({ workflow_json: parsed });
      toast(`Imported ${file.name} (${countNodes(parsed)} nodes)`, 'success');
    } catch (err) {
      toast('Invalid JSON file: ' + err.message, 'error');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

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
      toast(mode === 'new' ? 'Automation created' : 'Changes saved', 'success');
      router.push('/admin/automations');
    } catch (err) {
      console.error('Save error:', err);
      toast(err.message || 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const nodeCount = countNodes(formData.workflow_json);

  return (
    <div className="admin-page">
      <CustomNavbar />
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>{mode === 'new' ? 'New automation' : 'Edit automation'}</h1>
            <p>{mode === 'new' ? 'Add a workflow to your Automations section' : 'Update workflow details'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic information */}
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Basic information</h2>
            </div>
            <div className="admin-section__body">
              <div className="admin-field">
                <label className="admin-label admin-label--required">Title</label>
                <input
                  className="admin-input"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Automation title"
                  required
                />
              </div>
              <div className="admin-field">
                <label className="admin-label admin-label--required">Slug</label>
                <input
                  className="admin-input"
                  value={formData.slug}
                  onChange={(e) => set({ slug: generateSlug(e.target.value) })}
                  placeholder="url-friendly-slug"
                  required
                  pattern="[a-z0-9-]+"
                />
                <span className="admin-hint">Unique identifier used as the download filename</span>
              </div>
              <div className="admin-field">
                <label className="admin-label">Platform</label>
                <select
                  className="admin-select"
                  value={formData.platform}
                  onChange={(e) => set({ platform: e.target.value })}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-textarea"
                  value={formData.description}
                  onChange={(e) => set({ description: e.target.value })}
                  placeholder="What does this automation do?"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Details</h2>
            </div>
            <div className="admin-section__body">
              <div className="admin-field">
                <label className="admin-label">Trigger</label>
                <input
                  className="admin-input"
                  value={formData.trigger}
                  onChange={(e) => set({ trigger: e.target.value })}
                  placeholder="e.g. New PDF in Drive folder (polled every minute)"
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Output</label>
                <input
                  className="admin-input"
                  value={formData.output}
                  onChange={(e) => set({ output: e.target.value })}
                  placeholder="e.g. Frontmatter + markdown note in vault"
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Tools</label>
                <input
                  className="admin-input"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  placeholder="Comma-separated, e.g. n8n, Google Drive, Anthropic Claude"
                />
                {formData.tools.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
                    {formData.tools.map((tool, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.2rem 0.6rem',
                          background: 'rgba(255,255,255,0.06)',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Workflow file */}
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Workflow file</h2>
            </div>
            <div className="admin-section__body">
              <div className="admin-field">
                <label className="admin-label">Workflow JSON</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleWorkflowFile}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => fileRef.current?.click()}
                  >
                    {formData.workflow_json ? 'Replace JSON' : 'Import JSON'}
                  </button>
                  {formData.workflow_json ? (
                    <>
                      <span className="admin-hint" style={{ margin: 0 }}>
                        {formData.workflow_json.name ? `"${formData.workflow_json.name}" - ` : ''}
                        {nodeCount} node{nodeCount === 1 ? '' : 's'} loaded
                      </span>
                      <button
                        type="button"
                        className="admin-btn admin-btn--sm admin-btn--danger"
                        onClick={() => set({ workflow_json: null })}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <span className="admin-hint" style={{ margin: 0 }}>
                      No file imported. Visitors download this exact JSON.
                    </span>
                  )}
                </div>
              </div>
            </div>
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
              onClick={() => router.push('/admin/automations')}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn--primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : mode === 'new' ? 'Publish' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
