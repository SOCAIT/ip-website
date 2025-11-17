"use client";
import React from 'react';

const Footer = ({ position}) => {
  const currentYear = new Date().getFullYear();

  const footerStyle= {
    textAlign: 'center', padding: '20px', color:"white", fontFamily:"Orbitron",
    position: position,
    bottom: '0',
    width: '100%',
    //   clear: 'both', // Clear floats
    //   zIndex: '1000',
  }

  return (
    <footer  style={footerStyle}>
      <p>&copy; {currentYear} created by Ioannis Pastellas.</p>
    </footer>
  );
};

export default Footer;