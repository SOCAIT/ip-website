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
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          grab: {
            distance: 150,
            links: {
              opacity: 0.8,
              color: "#d4af37",
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#d4af37", "#64b5f6", "#5b7c99"],
        },
        links: {
          color: "#d4af37",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.2,
          },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 2, max: 6 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
          },
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
          Machine Learning Engineer
        </p>
       
        <p className="homepage-subtitle">
          &quot;Error-Correction is the beginning of infinity.&quot;
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