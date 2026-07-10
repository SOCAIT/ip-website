'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SiteLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/site-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        document.cookie = `site_auth=${password}; path=/; max-age=604800; SameSite=Strict`;
        router.push('/');
      } else {
        setError('Incorrect password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg, #1a1a1a 0%, #111111 40%, #0d0d0d 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost background text, matching hero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: 'clamp(16rem, 35vw, 40rem)',
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.02)',
          letterSpacing: '-0.05em',
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        IP
      </div>

      {/* Initials */}
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '-0.04em',
        marginBottom: '0.25rem',
        fontFamily: 'var(--font-geist-sans), -apple-system, sans-serif',
        position: 'relative',
        zIndex: 1,
      }}>
        IP
      </div>

      {/* Divider line */}
      <div style={{
        width: '28px',
        height: '1px',
        background: 'var(--accent-gold, #b8bcc6)',
        marginBottom: '2rem',
        position: 'relative',
        zIndex: 1,
      }} />

      {/* Card */}
      <div style={{
        maxWidth: '380px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '2.5rem 2rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          color: 'var(--text-secondary, #8a8a8a)',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
          margin: '0 0 0.25rem',
        }}>
          Private Access
        </p>
        <p style={{
          color: 'var(--text-secondary, #8a8a8a)',
          fontSize: '0.9rem',
          textAlign: 'center',
          margin: '0 0 2rem',
          lineHeight: 1.6,
          opacity: 0.7,
        }}>
          This site is currently under restricted access.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            autoFocus
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: 'var(--text-primary, #e8e8e8)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              fontFamily: 'inherit',
              marginBottom: '1rem',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-gold, #b8bcc6)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
          />

          {error && (
            <div style={{
              padding: '10px 16px',
              background: 'rgba(220, 80, 80, 0.08)',
              border: '1px solid rgba(220, 80, 80, 0.2)',
              borderRadius: '8px',
              color: '#dc5050',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 30px',
              background: loading ? 'rgba(255,255,255,0.05)' : 'var(--accent-gold, #b8bcc6)',
              border: 'none',
              borderRadius: '8px',
              color: loading ? 'var(--text-secondary, #8a8a8a)' : 'var(--dark-bg, #111111)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.target.style.opacity = '1'; }}
          >
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
