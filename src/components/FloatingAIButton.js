"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import './css/FloatingAIButton.css';

function FloatingAIButton() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  if (pathname === '/chat') {
    return null;
  }

  return (
    <Link href="/chat" className="floating-ai-link">
      <motion.div
        className="floating-ai-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <FaRobot className="ai-icon" />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="ai-tooltip"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
            >
              AI Assistant
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

export default FloatingAIButton;
