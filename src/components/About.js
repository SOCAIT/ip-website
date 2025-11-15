"use client";
// src/components/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faBrain, faCode, faMobile } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const About = () => {
      const textStyle = {
        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
        fontFamily: 'Inter, sans-serif',
        color: 'var(--text-secondary)',
        marginBottom: '2rem',
        lineHeight: '1.8',
        maxWidth: '800px',
        margin: '0 auto 2rem'
      };

      const cvLinkStyle = {
        color: 'var(--accent-purple)',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        borderBottom: '2px solid transparent'
      };
    
      return (
        <section id="about" className="p-5 text-center" style={{
          minHeight: '100vh',
          background: 'transparent',
          position: 'relative'
        }}>
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #e8eaed 0%, #d4af37 50%, #64b5f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'Playfair Display, serif',
            marginBottom: '3rem'
          }}>About Me</h2>
          <Row className="justify-content-center mt-4">
            <Col lg={10}>
              <motion.p
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 50 }}
                style={textStyle}
              >
                I am a Machine Learning Engineer with a passion for creating data-driven solutions. My journey started with a curiosity about how machines learn from data, which led me to study Computer Science and specialize in Artificial Intelligence.
              </motion.p>
              <motion.p
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: 3 }}
                style={textStyle}

              >
                Over the years, I have worked on various projects ranging from predictive modeling to natural language processing. My goal is to build intelligent systems that solve real-world problems effectively.
              </motion.p>
              <motion.p
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: 6 }}
                style={textStyle}

              >
                I believe in continuous learning and enjoy staying up-to-date with the latest advancements in AI and ML. Whether it&apos;s working on a challenging problem or collaborating with a team, I am always eager to contribute my skills and learn from others.
              </motion.p>

              <motion.div
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: 7.5 }}
                style={{
                  marginTop: '3rem',
                  padding: '1.5rem 2rem',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '15px',
                  border: '1px solid var(--glass-border)',
                  display: 'inline-block'
                }}
              >
                 <p style={{ ...textStyle, marginBottom: 0 }}>
                   Checkout my full CV <a 
                     href="/assets/CV(I.P)_oct.pdf" 
                     target="_blank"
                     style={cvLinkStyle}
                     onMouseOver={(e) => {
                       e.currentTarget.style.color = 'var(--accent-blue)';
                       e.currentTarget.style.borderBottom = '2px solid var(--accent-blue)';
                     }}
                     onMouseOut={(e) => {
                       e.currentTarget.style.color = 'var(--accent-purple)';
                       e.currentTarget.style.borderBottom = '2px solid transparent';
                     }}
                   >here</a>
                 </p>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      <Footer position={"relative"} /> 

    </section>

          

      )
};

export default About;
