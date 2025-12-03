"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaBrain, FaComments, FaLightbulb, FaCode, FaBriefcase } from 'react-icons/fa';
import "./css/AIAssistantHero.css";

function AIAssistantHero() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Ask me about my experience...",
    "Inquire about my projects...",
    "Discuss collaboration opportunities...",
    "Learn about my technical skills...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Circuit lines for tech aesthetic
  const circuitLines = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    duration: 3 + Math.random() * 2,
  }));

  const features = [
    {
      icon: <FaBriefcase />,
      title: "Experience",
      desc: "Career & roles",
      color: "#d4af37"
    },
    {
      icon: <FaCode />,
      title: "Projects",
      desc: "Portfolio work",
      color: "#64b5f6"
    },
    {
      icon: <FaBrain />,
      title: "Skills",
      desc: "Technologies",
      color: "#5b7c99"
    },
    {
      icon: <FaLightbulb />,
      title: "Insights",
      desc: "Knowledge",
      color: "#d4af37"
    },
  ];

  return (
    <div className="ai-hero-container">
      {/* Animated circuit board background */}
      <div className="circuit-background">
        {circuitLines.map((line) => (
          <motion.div
            key={line.id}
            className={`circuit-line circuit-line-${line.id % 3}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </div>

      {/* Floating data nodes */}
      <div className="data-nodes">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="data-node"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="ai-hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Robot Icon with pulse */}
        <motion.div
          className="ai-hero-icon-container"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
        >
          <motion.div
            className="icon-pulse-ring"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.8, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="ai-hero-icon"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaRobot />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="ai-hero-title-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="ai-hero-title">
            <span className="title-ai">AI</span>
            <span className="title-assistant">Assistant</span>
          </h1>
          <motion.div
            className="title-binary"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            01001000 01001001
          </motion.div>
        </motion.div>

        {/* Animated subtitle */}
        <motion.div
          className="ai-hero-subtitle-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
            </div>
            <div className="terminal-content">
              <span className="terminal-prompt">$</span>
              <motion.span
                key={messageIndex}
                className="terminal-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                {messages[messageIndex]}
              </motion.span>
              <motion.span
                className="terminal-cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="ai-hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Powered by advanced AI to answer your questions about my work, experience, and expertise.
          <br />
          <span className="description-highlight">Start a conversation below!</span>
        </motion.p>

        {/* Feature cards */}
        <motion.div
          className="ai-features-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 1.1 + index * 0.1,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: `0 15px 40px ${feature.color}40`
              }}
              style={{ borderColor: `${feature.color}40` }}
            >
              <div 
                className="feature-icon"
                style={{ color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator with chat icon */}
        <motion.div
          className="ai-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaComments className="scroll-chat-icon" />
          </motion.div>
          <span className="scroll-text">Start chatting below</span>
        </motion.div>
      </motion.div>

      {/* Neural network visualization */}
      <div className="neural-network">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="neural-line"
            style={{
              left: `${20 + i * 15}%`,
              height: `${30 + i * 10}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="ai-hero-gradient" />
    </div>
  );
}

export default AIAssistantHero;

