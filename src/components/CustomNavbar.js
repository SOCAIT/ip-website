// src/components/Navbar.js
"use client";
import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {


  const textStyle = {
    fontSize: '1.2rem', // Set the font size for text
    fontFamily: 'Orbitron', // Specify Orbitron font', // Set a stylized font
    color: "white"

  };
  return (
    <Navbar  expand="lg" sticky="top" className='p-3'  style={{backgroundColor: "#3f3f3f"}}>
      <Link href="/" className="navbar-brand">
        <img src="/assets/ip_no_slogan.png" width={40} height={40} alt="logo" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {/* <Nav.Link as={Link} style={textStyle} to="/">
          Home
        </Nav.Link> */}
        
        <Nav.Link as={Link} style={textStyle} href="/">
          About
        </Nav.Link>
       
        <Nav.Link as={Link} style={textStyle} href="/portfolio">
          Portfolio
        </Nav.Link>

        <Nav.Link as={Link} style={textStyle} href="/articles">
          Articles
        </Nav.Link>

        <Nav.Link as={Link} style={textStyle} href="/info">
          Info
        </Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
