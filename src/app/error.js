'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import './not-found.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="status-page">
      <section className="status-section">
        <div className="status-container">
          <p className="status-code">500</p>
          <h1 className="status-title">Something broke on my end</h1>
          <p className="status-text">
            This one is not your fault. Try again, and if it keeps happening I would like to know.
          </p>
          <div className="status-links">
            <button type="button" onClick={reset} className="status-link status-link-primary">
              Try again
            </button>
            <Link href="/" className="status-link">Home</Link>
            <Link href="/info" className="status-link">Tell me about it</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
