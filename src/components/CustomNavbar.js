"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const isHome = pathname === '/';

  const navbarStyle = {
    background: 'transparent',
    borderBottom: 'none',
    padding: '0.75rem 1.5rem',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  };

  const linkStyle = (href) => ({
    fontSize: '0.78rem',
    fontWeight: '600',
    color: isActive(href) ? '#ffffff' : 'var(--text-secondary)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '0.5rem 0.85rem',
    transition: 'color 0.2s ease',
    position: 'relative',
  });

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Link href="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Image
          src="/assets/ip_no_slogan.png"
          width={32}
          height={32}
          alt="IP"
          priority
          style={{ opacity: 0.9 }}
        />
        {/* <span style={{
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: '700',
          letterSpacing: '0.02em',
        }}>
          Ioannis Pastellas
        </span> */}
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav>
          {[
            { href: '/', label: 'Home' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/automations', label: 'Automations' },
            { href: '/articles', label: 'Articles' },
            { href: '/chat', label: 'AI Assistant' },
          ].map(({ href, label }) => (
            <Nav.Link
              as={Link}
              key={href}
              href={href}
              style={linkStyle(href)}
              onMouseOver={(e) => { if (!isActive(href)) e.currentTarget.style.color = '#ffffff'; }}
              onMouseOut={(e) => { if (!isActive(href)) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {isActive(href) && <span style={{
                position: 'absolute',
                top: '0.2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
              }} />}
              {label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>

      <Link
        href="/info"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#111111',
          background: '#ffffff',
          textDecoration: 'none',
          padding: '0.55rem 1.25rem',
          borderRadius: '100px',
          transition: 'opacity 0.2s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        CONNECT
        <span style={{ fontSize: '1rem' }}>&rsaquo;</span>
      </Link>
    </Navbar>
  );
};

export default CustomNavbar;
