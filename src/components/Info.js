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
    fontSize: 'calc(0.6rem + 1vw)'        , // Set the font size for text
    fontFamily: 'sans-serif' ,// Specify Orbitron font', // Set a stylized font
    color: "white",
    marginBottom: '2rem', // Add some bottom margin for spacing,


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
    <section id="contact" className="p-5 text-center" style={{ backgroundColor: '#3f3f3f' }}>
      <Container>
        {/* <h2 style={{ fontSize: 'calc(2rem + 1vw)', fontFamily: 'Orbitron, sans-serif', marginBottom: '1.5rem', color: 'white' }}>
          Contact Me
        </h2>
        <p style={{ fontSize: 'calc(0.8rem + 1vw)', fontFamily: 'sans-serif', color: 'white' }}>
          Feel free to reach out to me on LinkedIn or GitHub, or email me directly.
        </p>
        <motion.p
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}

                transition={{ type: 'spring', stiffness: 50, delay: 3 }}
                style={textStyle}

              >
                Don't forget to checkout my full resume <a href="/assets/CV(I.P)_oct.pdf"  target="_blank">here</a>
              </motion.p> */}
        <Row className="d-flex justify-content-center g-1">
          <Col xs={3} sm="auto" className="p-1">
            <Button href="https://cy.linkedin.com/in/giannis-pastellas-a420611a6" style={{ fontSize: '1.5rem', backgroundColor: '#3f3f3f', borderColor: '#3f3f3f' }}>
              <FaLinkedin /> 
            </Button>
          </Col>
          <Col xs={3} sm="auto" className="p-1">
            <Button href="https://github.com/giannisp09" style={{ fontSize: '1.5rem', backgroundColor: '#3f3f3f', borderColor: '#3f3f3f' }}>
              <FaGithub /> 
            </Button>
          </Col>
          <Col xs={3} sm="auto" className="p-1">
            <Button onClick={toggleFormVisibility} style={{ fontSize: '1.5rem', backgroundColor: '#3f3f3f', borderColor: '#3f3f3f' }}>
              <FaPaperPlane />
            </Button>
          </Col>
          <Col xs={3} sm="auto" className="p-1">
            <Button
              onClick={() => window.location.href = 'mailto:giannispast9@gmail.com'}
              style={{ fontSize: '1.5rem', backgroundColor: '#3f3f3f', borderColor: '#3f3f3f' }}
              className="email-button"
            >
              <FaEnvelope />
              {/* <FaEnvelope /> <span className="email-text">giannispast9@gmail.com.com</span> */}
            </Button>
          </Col>
          
        </Row>

        {formVisible && (
  <div className="d-flex justify-content-center" style={{ padding: '2rem' }}>
    <Form onSubmit={handleSubmit} style={{ marginTop: '2rem', color: 'white', maxWidth: '700px', width: '100%' }}>
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label style={{ textAlign: 'left', display: 'block', fontSize: 'calc(0.6rem + 1vw)', fontFamily: 'sans-serif', color: 'white' }}>
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
        <Form.Label style={{ textAlign: 'left', display: 'block' , fontSize: 'calc(0.6rem + 1vw)', fontFamily: 'sans-serif', color: 'white'}}>
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
        <Form.Label style={{ textAlign: 'left', display: 'block', fontSize: 'calc(0.6rem + 1vw)', fontFamily: 'sans-serif', color: 'white' }}>
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
      
      <Button variant="success" type="submit" className="mt-3" disabled={loading}>
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
