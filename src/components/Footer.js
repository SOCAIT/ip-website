"use client";
import React from 'react';

const Footer = ({ position }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem 1rem',
      color: 'var(--text-secondary)',
      fontSize: '0.85rem',
      position: position,
      bottom: 0,
      width: '100%',
      letterSpacing: '0.02em',
    }}>
      <p style={{ margin: 0 }}>&copy; {currentYear} Ioannis Pastellas</p>
    </footer>
  );
};

export default Footer;
