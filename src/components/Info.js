"use client";
import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import Footer from './Footer';
import InfoHero from './InfoHero';
import { motion } from 'framer-motion';
import './css/Info.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = 'giannispast9@gmail.com';
const EMPTY_FORM = { name: '', sendEmail: '', message: '', company: '' };

const Info = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const toggleFormVisibility = () => setFormVisible((visible) => !visible);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status === 'error') setStatus('idle');
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.sendEmail.trim()) next.sendEmail = 'Email is required';
    else if (!EMAIL_RE.test(formData.sendEmail.trim())) next.sendEmail = 'That email does not look valid';
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || !validate()) return;

    setStatus('sending');
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.sendEmail.trim(),
          message: formData.message.trim(),
          company: formData.company, // honeypot
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Your message could not be sent.');
      }

      setFormData(EMPTY_FORM);
      setStatus('sent');
    } catch (error) {
      // Never claim success we cannot verify — say what happened and give the
      // visitor a route that definitely works.
      setSubmitError(error?.message || 'Your message could not be sent.');
      setStatus('error');
    }
  };

  return (
    <section id="info" className="info-section">
      <InfoHero onToggleForm={toggleFormVisibility} />

      <Container className="info-form-container">
        {formVisible && (
          <motion.div
            className="d-flex justify-content-center"
            style={{ padding: '2rem' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{ width: '100%', maxWidth: '700px' }}
            >
              {status === 'sent' ? (
                <div className="stylish-contact-form contact-result" role="status" aria-live="polite">
                  <div className="form-header">
                    <h3>Message sent</h3>
                    <p>Got it. I&apos;ll reply by email.</p>
                  </div>
                  <Button
                    type="button"
                    className="mt-3 submit-button-custom"
                    onClick={() => setStatus('idle')}
                  >
                    <span>Send another</span>
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit} className="stylish-contact-form" noValidate>
                  <div className="form-header">
                    <h3>Send me a message</h3>
                    <p>I usually reply within a day or two.</p>
                  </div>

                  {/* Honeypot — hidden from people, tempting to bots. */}
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Form.Group controlId="formName" className="mb-3 form-group-custom">
                    <Form.Label className="form-label-custom">Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      isInvalid={!!errors.name}
                      className="form-input-custom"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3 form-group-custom">
                    <Form.Label className="form-label-custom">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="sendEmail"
                      value={formData.sendEmail}
                      onChange={handleInputChange}
                      isInvalid={!!errors.sendEmail}
                      className="form-input-custom"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                    />
                    <Form.Control.Feedback type="invalid">{errors.sendEmail}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formMessage" className="mb-3 form-group-custom">
                    <Form.Label className="form-label-custom">Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      isInvalid={!!errors.message}
                      className="form-input-custom"
                      placeholder="What are you working on, or just say hi."
                    />
                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                  </Form.Group>

                  {status === 'error' && (
                    <div className="contact-error" role="alert">
                      <p>{submitError}</p>
                      <p>
                        You can email me directly at{' '}
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                      </p>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="mt-3 submit-button-custom"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" />
                          <span style={{ marginLeft: '0.5rem' }}>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="button-arrow">→</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </Form>
              )}
            </motion.div>
          </motion.div>
        )}
      </Container>

      <Footer position="relative" />
    </section>
  );
};

export default Info;
