"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaComments } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import './css/FloatingAIButton.css';

function FloatingAIButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Don't show on the chat page itself
  if (pathname === '/chat') {
    return null;
  }

  return (
    <Link href="/chat" className="floating-ai-link">
      <motion.div
        className="floating-ai-button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Pulsing ring animation */}
        <motion.div
          className="pulse-ring"
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

        {/* Rotating background circle */}
        <motion.div
          className="rotating-bg"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Icon container */}
        <motion.div
          className="icon-container"
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <FaRobot className="ai-icon" />
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="ai-tooltip"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <FaComments className="tooltip-icon" />
              <span>AI Assistant</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles */}
        <motion.div
          className="particle particle-1"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="particle particle-2"
          animate={{
            y: [0, -8, 0],
            x: [0, -5, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="particle particle-3"
          animate={{
            y: [0, -12, 0],
            x: [0, 3, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </Link>
  );
}

export default FloatingAIButton;

