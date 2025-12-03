"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
// emailjs removed
import Footer from './Footer';
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import InfoHero from './InfoHero';
// styles imported globally in app/globals.css
import { motion } from 'framer-motion';
// styles imported globally in app/globals.css
import './css/Info.css';


const Info = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sendEmail: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  // emailjs removed

  const textStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    fontFamily: 'Inter, sans-serif',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    lineHeight: '1.6'
  }; 

  
  // emailjs removed

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }
    if (!formData.sendEmail.trim()) {
      newErrors.sendEmail = 'Email is required';
      hasErrors = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      hasErrors = true;
    }
    setErrors(newErrors);

    if (!hasErrors) {
      try {
        setLoading(true);
        // Placeholder: send via backend/API if added later
        alert('Thanks! I will reply to your email soon.');
        setFormData({ name: '', sendEmail: '', message: '' });
      } catch (error) {
        console.log('Error sending email:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section id="info" className="info-section">
      {/* New stylish hero section */}
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
      <Form 
        onSubmit={handleSubmit} 
        className="stylish-contact-form"
      >
      <div className="form-header">
        <h3>Send me a message</h3>
        <p>I'll get back to you as soon as possible</p>
      </div>

      <Form.Group controlId="formName" className="mb-3 form-group-custom">
        <Form.Label className="form-label-custom">
          Name
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isInvalid={!!errors.name}
          className="form-input-custom"
          placeholder="Your name"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3 form-group-custom">
        <Form.Label className="form-label-custom">
          Email
        </Form.Label>
        <Form.Control
          type="email"
          name="sendEmail"
          value={formData.sendEmail}
          onChange={handleInputChange}
          isInvalid={!!errors.sendEmail}
          className="form-input-custom"
          placeholder="your.email@example.com"
        />
        <Form.Control.Feedback type="invalid">{errors.sendEmail}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formMessage" className="mb-3 form-group-custom">
        <Form.Label className="form-label-custom">
          Message
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          isInvalid={!!errors.message}
          className="form-input-custom"
          placeholder="Tell me about your project or just say hi..."
        />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>
      
      <motion.div
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        <Button 
          type="submit" 
          className="mt-3 submit-button-custom" 
          disabled={loading}
        >
          {loading ? (
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
    </motion.div>
  </motion.div>
)}

      </Container>
      
      <Footer position="relative" />
    </section>
  );
};

export default Info;
