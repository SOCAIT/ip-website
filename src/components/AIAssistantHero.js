"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCode, FaBrain, FaLightbulb } from 'react-icons/fa';
import "./css/AIAssistantHero.css";

function AIAssistantHero() {
  const features = [
    { icon: <FaBriefcase />, title: "Experience", desc: "Career & roles" },
    { icon: <FaCode />, title: "Projects", desc: "Portfolio work" },
    { icon: <FaBrain />, title: "Skills", desc: "Technologies" },
    { icon: <FaLightbulb />, title: "Insights", desc: "Knowledge" },
  ];

  return (
    <div className="ai-hero-container">
      <motion.div
        className="ai-hero-content"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="ai-hero-title">AI Assistant</h1>

        <motion.p
          className="ai-hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Ask questions about my work, experience, and expertise.
        </motion.p>

        <motion.div
          className="ai-features-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AIAssistantHero;
