'use client';

import { adminFetch } from '@/lib/adminApi';
import AutomationForm from '@/components/AutomationForm';
import { ToastProvider } from '@/components/Toast';
import '../../admin.css';

export default function NewAutomationPage() {
  const handleSubmit = async (formData) => {
    await adminFetch('/api/admin/automations', {
      method: 'POST',
      body: {
        title: formData.title,
        slug: formData.slug,
        platform: formData.platform,
        description: formData.description,
        trigger: formData.trigger,
        output: formData.output,
        tools: formData.tools,
        workflow_json: formData.workflow_json,
        published: formData.published,
      },
    });
  };

  return (
    <ToastProvider>
      <AutomationForm onSubmit={handleSubmit} mode="new" />
    </ToastProvider>
  );
}
