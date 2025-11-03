'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set cookie and redirect
        document.cookie = `admin_auth=${password}; path=/; max-age=86400; SameSite=Strict`;
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        border: '2px solid rgba(154,230,180,0.3)',
        borderRadius: '20px',
        padding: '3rem 2rem',
        backdropFilter: 'blur(10px)',
      }}>
        <h1 style={{
          color: '#9AE6B4',
          textAlign: 'center',
          marginBottom: '2rem',
          textShadow: '0 0 20px rgba(154,230,180,0.4)',
        }}>
          🔐 Admin Login
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#ddd',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
            }}>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(154,230,180,0.3)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              background: 'rgba(245,101,101,0.1)',
              border: '1px solid rgba(245,101,101,0.3)',
              borderRadius: '8px',
              color: '#f56565',
              marginBottom: '1rem',
              fontSize: '0.9rem',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? '#666' : 'linear-gradient(135deg, #48bb78, #38a169)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#888',
        }}>
          <p>Set ADMIN_PASSWORD in your environment variables</p>
          <Link href="/" style={{ color: '#9AE6B4', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

