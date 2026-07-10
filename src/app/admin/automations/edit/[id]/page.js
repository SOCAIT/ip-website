'use client';

import { use, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AutomationForm from '@/components/AutomationForm';
import { ToastProvider } from '@/components/Toast';
import CustomNavbar from '@/components/CustomNavbar';
import '../../../admin.css';

export default function EditAutomationPage({ params }) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error: err } = await supabase
          .from('automations')
          .select('*')
          .eq('id', id)
          .single();
        if (err) throw err;
        setInitialData(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (formData) => {
    const { error } = await supabase
      .from('automations')
      .update({
        title: formData.title,
        slug: formData.slug,
        platform: formData.platform,
        description: formData.description,
        trigger: formData.trigger,
        output: formData.output,
        tools: formData.tools,
        workflow_json: formData.workflow_json,
        published: formData.published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (error) throw error;
  };

  if (loading) {
    return (
      <div className="admin-page">
        <CustomNavbar />
        <div className="admin-container">
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading automation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <CustomNavbar />
        <div className="admin-container">
          <div className="admin-loading">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <AutomationForm
        initialData={initialData}
        onSubmit={handleSubmit}
        mode="edit"
      />
    </ToastProvider>
  );
}
