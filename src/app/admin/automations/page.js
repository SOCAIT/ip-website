'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import CustomNavbar from '@/components/CustomNavbar';
import { ToastProvider, useToast } from '@/components/Toast';
import '../admin.css';

function AutomationsDashboard() {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchAutomations = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAutomations(data || []);
    } catch (error) {
      toast('Failed to load automations: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAutomations();
  }, [fetchAutomations]);

  const deleteAutomation = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.from('automations').delete().eq('id', id);
      if (error) throw error;
      toast('Automation deleted');
      fetchAutomations();
    } catch (error) {
      toast('Delete failed: ' + error.message, 'error');
    }
  };

  const togglePublished = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('automations')
        .update({ published: !currentStatus })
        .eq('id', id);
      if (error) throw error;
      toast(currentStatus ? 'Moved to drafts' : 'Published');
      fetchAutomations();
    } catch (error) {
      toast('Update failed: ' + error.message, 'error');
    }
  };

  return (
    <div className="admin-page">
      <CustomNavbar />
      <div className="admin-container admin-container--wide">
        <nav className="admin-tabs">
          <Link href="/admin" className="admin-tab">Articles</Link>
          <Link href="/admin/automations" className="admin-tab admin-tab--active">Automations</Link>
        </nav>
        <div className="admin-header">
          <div>
            <h1>Automations</h1>
            <p>Manage the workflows shown on your Automations page</p>
          </div>
          <Link href="/admin/automations/new">
            <button className="admin-btn admin-btn--primary">+ New automation</button>
          </Link>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading automations...</p>
          </div>
        ) : automations.length === 0 ? (
          <div className="be-empty">
            <p>No automations yet</p>
            <small>Create your first automation to get started</small>
          </div>
        ) : (
          <div className="admin-articles">
            {automations.map((automation) => {
              const nodeCount = Array.isArray(automation.workflow_json?.nodes)
                ? automation.workflow_json.nodes.length
                : 0;
              return (
                <div key={automation.id} className="admin-article-row">
                  <div className="admin-article-thumb--empty">
                    {automation.platform || 'n8n'}
                  </div>

                  <div className="admin-article-info">
                    <h3>{automation.title}</h3>
                    <div className="admin-article-meta">
                      <span className={`admin-badge ${automation.published ? 'admin-badge--published' : 'admin-badge--draft'}`}>
                        {automation.published ? 'Published' : 'Draft'}
                      </span>
                      <span>/{automation.slug}</span>
                      <span>{nodeCount} node{nodeCount === 1 ? '' : 's'}</span>
                    </div>
                  </div>

                  <div className="admin-article-actions">
                    <Link href={`/admin/automations/edit/${automation.id}`}>
                      <button className="admin-btn admin-btn--sm">Edit</button>
                    </Link>
                    <Link href="/automations">
                      <button className="admin-btn admin-btn--sm admin-btn--ghost">View</button>
                    </Link>
                    <button
                      className="admin-btn admin-btn--sm"
                      onClick={() => togglePublished(automation.id, automation.published)}
                    >
                      {automation.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      className="admin-btn admin-btn--sm admin-btn--danger"
                      onClick={() => deleteAutomation(automation.id, automation.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminAutomationsPage() {
  return (
    <ToastProvider>
      <AutomationsDashboard />
    </ToastProvider>
  );
}
