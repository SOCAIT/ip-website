"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
// emailjs removed
import Footer from './Footer';
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import CustomChatbot from './CustomChatbot';
import PersonalChatbot from './PersonalChatbot';
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
    <section id="info" className="p-5 text-center" style={{ 
      minHeight: '100vh', 
      background: 'transparent',
      paddingTop: '80px'
    }}>
      <Container>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: '600',
          background: 'linear-gradient(135deg, #e8eaed 0%, #d4af37 50%, #64b5f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Playfair Display, serif',
          marginBottom: '2rem'
        }}>Get In Touch</h2>
        <p className="text-style" style={textStyle}>
          Feel free to reach out to me on LinkedIn or GitHub, or send me a message directly.
        </p>
        <div className="d-flex justify-content-center gap-2 mt-4 social-buttons-row">
          <Button 
            href="https://cy.linkedin.com/in/giannis-pastellas-a420611a6"
            className="social-btn"
            style={{ 
              fontSize: '2rem', 
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px',
              padding: '15px 25px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 172, 254, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaLinkedin /> 
          </Button>
          <Button 
            href="https://github.com/giannisp09"
            className="social-btn"
            style={{ 
              fontSize: '2rem', 
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px',
              padding: '15px 25px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaGithub /> 
          </Button>
          <Button 
            onClick={toggleFormVisibility}
            className="social-btn"
            style={{ 
              fontSize: '2rem', 
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px',
              padding: '15px 25px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--accent-slate)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(91, 124, 153, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaPaperPlane />
          </Button>
          <Button
            onClick={() => window.location.href = 'mailto:giannispast9@gmail.com'}
            className="email-button social-btn"
            style={{ 
              fontSize: '2rem', 
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '15px',
              padding: '15px 25px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 172, 254, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaEnvelope />
          </Button>
        </div>

        {formVisible && (
  <div className="d-flex justify-content-center" style={{ padding: '2rem' }}>
    <Form 
      onSubmit={handleSubmit} 
      style={{ 
        marginTop: '2rem', 
        color: 'var(--text-primary)', 
        maxWidth: '700px', 
        width: '100%',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label style={{ 
          textAlign: 'left', 
          display: 'block', 
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
          fontFamily: 'Inter, sans-serif', 
          color: 'var(--text-primary)',
          fontWeight: '500'
        }}>
          Name
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isInvalid={!!errors.name}
          style={{ maxWidth: '100%' }}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label style={{ 
          textAlign: 'left', 
          display: 'block', 
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
          fontFamily: 'Inter, sans-serif', 
          color: 'var(--text-primary)',
          fontWeight: '500'
        }}>
          Email
        </Form.Label>
        <Form.Control
          type="email"
          name="sendEmail"
          value={formData.sendEmail}
          onChange={handleInputChange}
          isInvalid={!!errors.sendEmail}
          style={{ maxWidth: '100%' }}
        />
        <Form.Control.Feedback type="invalid">{errors.sendEmail}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formMessage" className="mb-3">
        <Form.Label style={{ 
          textAlign: 'left', 
          display: 'block', 
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
          fontFamily: 'Inter, sans-serif', 
          color: 'var(--text-primary)',
          fontWeight: '500'
        }}>
          Message
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          isInvalid={!!errors.message}
          style={{ maxWidth: '100%' }}
        />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>
      
      <Button 
        type="submit" 
        className="mt-3" 
        disabled={loading}
        style={{
          background: 'var(--primary-gradient)',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 30px',
          fontWeight: '600',
          fontSize: '1.1rem',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(157, 127, 245, 0.3)'
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(157, 127, 245, 0.5)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(157, 127, 245, 0.3)';
        }}
      >
        {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Send Message'}
      </Button>
    </Form>
  </div>
)}

        {/* <CustomChatbot /> */}
      </Container>
      
      {/* AI Chat Assistant */}
      <PersonalChatbot />
      
      <Footer position="relative" />
    </section>
  );
};

export default Info;
