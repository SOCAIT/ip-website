"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "./css/Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      {/* Ghost background text */}
      <div className="hero-ghost-text" aria-hidden="true">
        <span>IP</span>
      </div>

      {/* Role tags - left side */}
      <motion.div
        className="hero-roles"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="role-line" />
        <div className="role-list">
          <span>ML Engineer</span>
          <span><strong>Researcher</strong></span>
          <span>Builder</span>
          {/* <span className="role-italic">AI specialist</span> */}
        </div>
      </motion.div>

      {/* Center photo */}
      <div className="hero-photo-area">
        <motion.div
          className="hero-photo-motion"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Image
            src="/ipastellas_hero.png"
            alt="Ioannis Pastellas"
            width={600}
            height={800}
            priority
            className="hero-photo"
          />
        </motion.div>
      </div>

      {/* Name at bottom */}
      <motion.h1
        className="hero-name"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        IOANNIS PASTELLAS
      </motion.h1>
    </div>
  );
}

export default Hero;
