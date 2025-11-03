"use client";
import React from 'react';
import { motion } from 'framer-motion';
import './css/CustomCard.css';

function CustomCard({ title, description, img }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="custom-card"
    >
      <div className="card-image" style={{ backgroundImage: `url(${img})` }}>
        <div className="card-content card-text-visible">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomCard;
