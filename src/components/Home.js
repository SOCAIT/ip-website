"use client";
import React from "react";
import WorkExperience from "./WorkExperience";
import Skills from "./Skills";
import Education from "./Education";
import Publications from "./Publications";
import Hero from "./Hero";
import { motion } from 'framer-motion';
import Footer from "./Footer";

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};

function Home() {
  return (
    <section id="home" className="homepage-section">
      <Hero />

      <div className="homepage-content">
        <motion.div {...sectionReveal}>
          <div className="about-brief">
            <p>
              Specializing in <strong>deep learning</strong>, <strong>reinforcement learning</strong>, and
              building intelligent systems from research to production.
            </p>
            <a href="/IoannisPastellasCV.pdf" target="_blank" rel="noopener noreferrer" className="about-cv-link">
              View Full CV <span>&rarr;</span>
            </a>
          </div>
        </motion.div>

        <div className="section-divider" />

        <motion.div {...sectionReveal}>
          <WorkExperience />
        </motion.div>

        <div className="section-divider" />

        <motion.div {...sectionReveal}>
          <Education />
        </motion.div>

        <div className="section-divider" />

        <motion.div {...sectionReveal}>
          <Publications />
        </motion.div>

        <div className="section-divider" />

        <motion.div {...sectionReveal}>
          <Skills />
        </motion.div>
      </div>

      <Footer position={"relative"} />
    </section>
  );
}

export default Home;
