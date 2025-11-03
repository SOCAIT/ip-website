"use client";
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// styles imported globally in app/globals.css
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { motion } from 'framer-motion';
import Footer from "./Footer";

function Home() {
  const [init, setInit] = useState(false);

  const textStyle = {
    fontSize: 'calc(0.8rem + 1vw)'        , // Set the font size for text
    fontFamily: 'sans-serif' ,// Specify Orbitron font', // Set a stylized font
    color: "white",
    marginBottom: '2rem', // Add some bottom margin for spacing,


  }; 

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#3f3f3f",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section id="home" className="homepage-section">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="particles-background"
        />
      )}
      <Container className="text-center homepage-content">
        <h1 className="homepage-title">Ioannis Pastellas</h1>
        <p className="homepage-subtitle">
          Machine Learning Engineer with over <span className="highlight">4 years</span> of demonstrated experience in <span className="highlight"> ML </span> & <span className="highlight">Reinforcement Learning</span>.
        </p>
       
        <p className="homepage-subtitle">
          "Error-Correction is the beginning of infinity."
        </p>

        <Row>
        <Col lg='6' >
          <WorkExperience />
        </Col>
        <Col  lg='6'>
          <Education />
        </Col>



        </Row>
 
        <motion.p
                initial={{ y: '100vh' }}
                animate={{ y: 0 }}

                transition={{ type: 'spring', stiffness: 50, delay: 3 }}
                // style={textStyle}
                className='homepage-check-cv'

              >
                 Checkout my full CV <a href="/assets/CV(I.P)_oct.pdf"  target="_blank">here</a>
              </motion.p>
        {/* <WorkExperience />
        <Education /> */}

        <Skills />


        <Footer position={"relative"}/>
        

      </Container>
      
      

    </section>
  );
}

export default Home;