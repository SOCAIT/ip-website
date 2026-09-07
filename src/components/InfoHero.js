"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import "./css/InfoHero.css";

function InfoHero({ onToggleForm }) {
  return (
    <div className="info-hero-container">
      <motion.div
        className="info-hero-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="info-hero-title">Get in touch</h1>

        <motion.p
          className="info-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Open to roles, collaborations, and consulting.
        </motion.p>

        <motion.p
          className="info-hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          LinkedIn, GitHub, or email. Pick whatever is easiest.
        </motion.p>

        <motion.div
          className="info-hero-social-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a
            href="https://cy.linkedin.com/in/giannis-pastellas-a420611a6"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <FaLinkedin className="social-card-icon" />
            <div className="social-card-content">
              <h3>LinkedIn</h3>
              <p>Work and posts</p>
            </div>
            <span className="social-card-arrow">&#8599;</span>
          </a>

          <a
            href="https://github.com/giannisp09"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
          >
            <FaGithub className="social-card-icon" />
            <div className="social-card-content">
              <h3>GitHub</h3>
              <p>Code</p>
            </div>
            <span className="social-card-arrow">&#8599;</span>
          </a>

          <a
            href="mailto:giannispast9@gmail.com"
            className="social-card"
          >
            <FaEnvelope className="social-card-icon" />
            <div className="social-card-content">
              <h3>Email</h3>
              <p>Write to me</p>
            </div>
            <span className="social-card-arrow">&#8599;</span>
          </a>
        </motion.div>

        <motion.div
          className="info-hero-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Open to new work
        </motion.div>
      </motion.div>
    </div>
  );
}

export default InfoHero;
