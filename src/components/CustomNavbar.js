// src/components/Navbar.js
"use client";
import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {


  const textStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
    color: "white",
    transition: 'all 0.3s ease',
    padding: '0.5rem 0.75rem'
  };
  
  const navbarStyle = {
    background: 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  };

  return (
    <Navbar expand="lg" sticky="top" className='p-3' style={navbarStyle}>
      <Link href="/" className="navbar-brand">
        <img 
          src="/assets/ip_no_slogan.png" 
          width={40} 
          height={40} 
          alt="logo"
          style={{
            transition: 'transform 0.3s ease',
            filter: 'drop-shadow(0 2px 8px rgba(157, 127, 245, 0.5))'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link 
          as={Link} 
          style={textStyle} 
          href="/"
          onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          About
        </Nav.Link>
       
        <Nav.Link 
          as={Link} 
          style={textStyle} 
          href="/portfolio"
          onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          Portfolio
        </Nav.Link>

        <Nav.Link 
          as={Link} 
          style={textStyle} 
          href="/articles"
          onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          Articles
        </Nav.Link>

        <Nav.Link 
          as={Link} 
          style={textStyle} 
          href="/info"
          onMouseOver={(e) => e.currentTarget.style.color = '#64b5f6'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          Connect
        </Nav.Link>

        <Nav.Link 
          as={Link} 
          style={textStyle} 
          href="/chat"
          onMouseOver={(e) => e.currentTarget.style.color = '#d4af37'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          AI Assistant
        </Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
