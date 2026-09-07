"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Footer from './Footer';
import './css/Automations.css';

const cardReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

function downloadWorkflow(automation) {
  if (!automation.workflow_json) return;
  const blob = new Blob(
    [JSON.stringify(automation.workflow_json, null, 2)],
    { type: 'application/json' },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${automation.slug || 'workflow'}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function Automations() {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('automations')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setAutomations(data || []);
      } catch (error) {
        console.error('Error fetching automations:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <section id="automations" className="automations-section">
        <div className="automations-container">
          <div className="automations-header">
            <h2 className="automations-title">Automations</h2>
            <p className="automations-subtitle">
              Workflows I build to take the tedious parts of my day off my plate. Download the source and run them yourself.
            </p>
          </div>

          {loading ? (
            <div className="automations-loading">
              <div className="automations-spinner" />
              <p>Loading automations...</p>
            </div>
          ) : automations.length === 0 ? (
            <div className="automations-empty">
              <h3>Nothing here yet</h3>
              <p>Check back soon.</p>
            </div>
          ) : (
            <div className="automations-grid">
              {automations.map((automation) => {
                const tools = Array.isArray(automation.tools) ? automation.tools : [];
                return (
                  <motion.article
                    key={automation.id}
                    className="automation-card"
                    {...cardReveal}
                  >
                    <div className="automation-card-head">
                      <h3 className="automation-card-title">{automation.title}</h3>
                      {automation.platform && (
                        <span className="automation-type-badge">{automation.platform}</span>
                      )}
                    </div>

                    {automation.description && (
                      <p className="automation-description">{automation.description}</p>
                    )}

                    {(automation.trigger || automation.output) && (
                      <div className="automation-flow">
                        {automation.trigger && (
                          <>
                            <span className="automation-flow-label">Trigger</span>
                            <span className="automation-flow-value">{automation.trigger}</span>
                          </>
                        )}
                        {automation.trigger && automation.output && (
                          <span className="automation-flow-arrow">→</span>
                        )}
                        {automation.output && (
                          <>
                            <span className="automation-flow-label">Output</span>
                            <span className="automation-flow-value">{automation.output}</span>
                          </>
                        )}
                      </div>
                    )}

                    {tools.length > 0 && (
                      <div className="automation-tools">
                        {tools.map((tool, toolIndex) => (
                          <span key={toolIndex} className="automation-tool">{tool}</span>
                        ))}
                      </div>
                    )}

                    {automation.workflow_json && (
                      <div className="automation-card-footer">
                        <button
                          type="button"
                          className="automation-download"
                          onClick={() => downloadWorkflow(automation)}
                        >
                          Download workflow JSON
                          <span className="automation-download-arrow">↓</span>
                        </button>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer position={"relative"} />
    </>
  );
}

export default Automations;
