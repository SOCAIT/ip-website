"use client";
import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
// styles imported globally in app/globals.css
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import Publications from "./Publications";
import Hero from "./Hero";
import { Container, Row, Col } from 'react-bootstrap';

import { motion } from 'framer-motion';
import Footer from "./Footer";

function Home() {
  const [init, setInit] = useState(false);

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
      
      {/* Hero Section - New stylish component */}
      <Hero />

      {/* CV Floating Card - Fixed positioning and animation */}
      <motion.div
        className="cv-floating-container"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          type: 'spring', 
          stiffness: 60,
          damping: 15,
          delay: 0.2 
        }}
      >
        <motion.div
          className="homepage-check-cv"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 60px rgba(212, 175, 55, 0.4)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Checkout my full CV <a href="/IoannisPastellasCV.pdf" target="_blank" rel="noopener noreferrer">here</a>
        </motion.div>
      </motion.div>

      <Container className="text-center homepage-content">
        <Row>
          <Col lg='6'>
            <WorkExperience />
          </Col>
          <Col lg='6'>
            <Education />
            <Publications />
          </Col>
        </Row>

        <Skills />

        <Footer position={"relative"}/>
      </Container>
    </section>
  );
}

export default Home;