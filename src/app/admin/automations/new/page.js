'use client';

import { supabase } from '@/lib/supabase';
import AutomationForm from '@/components/AutomationForm';
import { ToastProvider } from '@/components/Toast';
import '../../admin.css';

export default function NewAutomationPage() {
  const handleSubmit = async (formData) => {
    const { error } = await supabase
      .from('automations')
      .insert([{
        title: formData.title,
        slug: formData.slug,
        platform: formData.platform,
        description: formData.description,
        trigger: formData.trigger,
        output: formData.output,
        tools: formData.tools,
        workflow_json: formData.workflow_json,
        published: formData.published,
      }]);
    if (error) throw error;
  };

  return (
    <ToastProvider>
      <AutomationForm onSubmit={handleSubmit} mode="new" />
    </ToastProvider>
  );
}
