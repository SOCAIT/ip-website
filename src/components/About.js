"use client";
// src/components/About.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from './Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faBrain, faCode, faMobile } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const About = () => {
    const headingStyle = {
        fontSize: 'calc(2rem + 1vw)', // Set the font size for text
        fontFamily: 'Orbitron, sans-serif', // Specify Orbitron font', // Set a stylized font
        marginBottom: '1.5rem', // Add some bottom margin for spacing,
        color: "white",
        marginTop: "3rem"
      };
    
      const textStyle = {
        fontSize: 'calc(0.8rem + 1vw)'        , // Set the font size for text
        fontFamily: 'sans-serif' ,// Specify Orbitron font', // Set a stylized font
        color: "white",
        marginBottom: '2rem', // Add some bottom margin for spacing,


      };

      const serviceStyle = {
        fontSize: 'calc(1.2rem + 1vw)', // Set the font size for text
        fontFamily: 'Orbitron, sans-serif', // Specify Orbitron font', // Set a stylized font
        marginBottom: '1.5rem', // Add some bottom margin for spacing,
        color: "white",
        textAlign: 'center'
      };

      const serviceTextStyle = {
        fontSize: 'calc(1rem + 1vw)'        , // Set the font size for text
        fontFamily:'Orbitron, sans-serif', // Specify Orbitron font', // Set a stylized font
        color: "white",
        marginBottom: '2rem', // Add some bottom margin for spacing,
        marginTop: '2rem'

      };
    
      return (
        <section id="about" className="p-5 text-center">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>About Me</h2>
          <Row className="justify-content-center mt-4">
            <Col lg={8}>
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
                I believe in continuous learning and enjoy staying up-to-date with the latest advancements in AI and ML. Whether it's working on a challenging problem or collaborating with a team, I am always eager to contribute my skills and learn from others.
              </motion.p>

              <motion.p
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 50, delay: 7.5 }}
                style={textStyle}

              >
                 Checkout my full CV <a href="/assets/CV(I.P)_oct.pdf"  target="_blank">here</a>
              </motion.p>
            </Col>
          </Row>
        </motion.div>
      </Container>
      <Footer position={"relative"} /> 

    </section>

          

      )
};

export default About;
