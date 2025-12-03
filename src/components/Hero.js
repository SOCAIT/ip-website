"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./css/Hero.css";

function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Ioannis Pastellas";
  const subtitle = "Machine Learning Engineer";
  const quote = "Error-Correction is the beginning of infinity.";

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="hero-container">
      {/* Floating geometric shapes */}
      <div className="hero-shapes">
        <motion.div
          className="shape shape-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="shape shape-2"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="shape shape-3"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main hero content */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Name with typing effect and glitch */}
        <div className="hero-name-container">
          <h1 className="hero-name" data-text={displayedText}>
            {displayedText}
            <span className="cursor-blink">|</span>
          </h1>
          <motion.div
            className="hero-name-underline"
            initial={{ width: 0 }}
            animate={{ width: isTypingComplete ? "100%" : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* Subtitle with fade in */}
        <motion.div
          className="hero-subtitle-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hero-role">
            <span className="role-bracket">&lt;</span>
            <span className="role-text">{subtitle}</span>
            <span className="role-bracket">/&gt;</span>
          </div>
        </motion.div>

        {/* Quote with elegant reveal */}
        <motion.div
          className="hero-quote-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="quote-mark quote-mark-left">&ldquo;</div>
          <p className="hero-quote">{quote}</p>
          <div className="quote-mark quote-mark-right">&rdquo;</div>
        </motion.div>

        {/* Decorative elements */}
        <div className="hero-decorative-lines">
          <motion.div
            className="decorative-line decorative-line-left"
            initial={{ width: 0 }}
            animate={{ width: isTypingComplete ? "100px" : 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.div
            className="decorative-dot"
            initial={{ scale: 0 }}
            animate={{ scale: isTypingComplete ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          />
          <motion.div
            className="decorative-line decorative-line-right"
            initial={{ width: 0 }}
            animate={{ width: isTypingComplete ? "100px" : 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypingComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="hero-gradient-overlay" />
    </div>
  );
}

export default Hero;

