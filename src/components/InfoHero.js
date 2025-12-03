"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import "./css/InfoHero.css";

function InfoHero({ onToggleForm, socialButtons }) {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  // Particle effect data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="info-hero-container">
      {/* Animated background particles */}
      <div className="info-hero-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="info-particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated geometric decorations */}
      <div className="info-hero-decorations">
        <motion.div
          className="deco-circle deco-circle-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="deco-circle deco-circle-2"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="deco-line deco-line-1"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="deco-line deco-line-2"
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="info-hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
      >
        {/* Title with split text animation */}
        <motion.div className="info-hero-title-container">
          <motion.h1
            className="info-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="title-word title-word-1">Let's</span>
            <span className="title-word title-word-2">Connect</span>
          </motion.h1>
          
          {/* Animated underline */}
          <motion.div
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        {/* Subtitle with typing effect appearance */}
        <motion.div
          className="info-hero-subtitle-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="info-hero-subtitle">
            <span className="subtitle-highlight">Open for opportunities</span> and 
            <span className="subtitle-highlight"> collaborations</span>
          </p>
          <p className="info-hero-description">
            Feel free to reach out on any platform, or send me a message directly.
          </p>
        </motion.div>

        {/* Social buttons with stagger animation */}
        <motion.div
          className="info-hero-social-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://cy.linkedin.com/in/giannis-pastellas-a420611a6"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card social-card-linkedin"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(100, 181, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-card-icon">
              <FaLinkedin />
            </div>
            <div className="social-card-content">
              <h3>LinkedIn</h3>
              <p>Professional network</p>
            </div>
            <div className="social-card-arrow">→</div>
          </motion.a>

          <motion.a
            href="https://github.com/giannisp09"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card social-card-github"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-card-icon">
              <FaGithub />
            </div>
            <div className="social-card-content">
              <h3>GitHub</h3>
              <p>Open source projects</p>
            </div>
            <div className="social-card-arrow">→</div>
          </motion.a>

          {/* <motion.button
            onClick={onToggleForm}
            className="social-card social-card-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(91, 124, 153, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-card-icon">
              <FaPaperPlane />
            </div>
            <div className="social-card-content">
              <h3>Message</h3>
              <p>Send me a note</p>
            </div>
            <div className="social-card-arrow">→</div>
          </motion.button> */}

          <motion.a
            href="mailto:giannispast9@gmail.com"
            className="social-card social-card-email"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(100, 181, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="social-card-icon">
              <FaEnvelope />
            </div>
            <div className="social-card-content">
              <h3>Email</h3>
              <p>Direct contact</p>
            </div>
            <div className="social-card-arrow">→</div>
          </motion.a>
        </motion.div>

        {/* Floating info badge */}
        <motion.div
          className="info-hero-badge"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 150 }}
        >
          <motion.div
            className="badge-pulse"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="badge-text">Available for projects</span>
        </motion.div>
      </motion.div>

      {/* Gradient overlay */}
      <div className="info-hero-gradient" />
    </div>
  );
}

export default InfoHero;

