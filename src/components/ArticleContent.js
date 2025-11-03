"use client";
import React from "react";

// Helper function to parse text with markdown-style formatting
function parseFormattedText(text) {
  if (!text) return null;
  
  const parts = [];
  let currentIndex = 0;
  let key = 0;
  
  // Combined regex to match **bold**, *italic*, and inline math $...$
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\$[^$]+\$)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.substring(currentIndex, match.index)}
        </span>
      );
    }
    
    const matched = match[0];
    
    // Check what type of formatting it is
    if (matched.startsWith('**') && matched.endsWith('**')) {
      // Bold text
      parts.push(
        <strong key={`bold-${key++}`} style={{ fontWeight: 'bold', color: '#9AE6B4' }}>
          {matched.slice(2, -2)}
        </strong>
      );
    } else if (matched.startsWith('*') && matched.endsWith('*')) {
      // Italic text
      parts.push(
        <em key={`italic-${key++}`} style={{ fontStyle: 'italic', color: '#9AE6B4' }}>
          {matched.slice(1, -1)}
        </em>
      );
    } else if (matched.startsWith('$') && matched.endsWith('$')) {
      // Inline math - render as code-like style
      parts.push(
        <code key={`math-${key++}`} style={{ 
          fontFamily: 'monospace',
          background: 'rgba(154,230,180,0.15)',
          padding: '0.15rem 0.4rem',
          borderRadius: '4px',
          fontSize: '0.95em',
          color: '#9AE6B4'
        }}>
          {matched.slice(1, -1)}
        </code>
      );
    }
    
    currentIndex = match.index + matched.length;
  }
  
  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(
      <span key={`text-${key++}`}>
        {text.substring(currentIndex)}
      </span>
    );
  }
  
  return parts.length > 0 ? parts : text;
}

export default function ArticleContent({ blocks }) {
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          const Tag = `h${block.level || 2}`;
          return (
            <Tag key={idx} style={{
              margin: 0,
              padding: '0.5rem 0',
              color: '#9AE6B4',
              textShadow: '0 0 8px rgba(154,230,180,0.4)'
            }}>
              {parseFormattedText(block.text)}
            </Tag>
          );
        }
        if (block.type === "text") {
          return (
            <p key={idx} style={{
              margin: 0,
              lineHeight: 1.85,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.1rem',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '1.08rem'
            }}>
              {parseFormattedText(block.text)}
            </p>
          );
        }
        if (block.type === "bullet_list") {
          return (
            <ul key={idx} style={{
              margin: 0,
              paddingLeft: '2rem',
              lineHeight: 1.85,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.1rem 1.1rem 1.1rem 2.5rem',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '1.08rem',
              listStyleType: 'disc'
            }}>
              {(block.items || []).map((item, itemIdx) => (
                <li key={itemIdx} style={{ 
                  marginBottom: itemIdx < block.items.length - 1 ? '0.75rem' : '0',
                  paddingLeft: '0.5rem'
                }}>
                  {parseFormattedText(item.text)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "numbered_list") {
          return (
            <ol key={idx} style={{
              margin: 0,
              paddingLeft: '2rem',
              lineHeight: 1.85,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.1rem 1.1rem 1.1rem 2.5rem',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '1.08rem',
              listStyleType: 'decimal'
            }}>
              {(block.items || []).map((item, itemIdx) => (
                <li key={itemIdx} style={{ 
                  marginBottom: itemIdx < block.items.length - 1 ? '0.75rem' : '0',
                  paddingLeft: '0.5rem'
                }}>
                  {parseFormattedText(item.text)}
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={idx} style={{
              margin: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '0.75rem'
            }}>
              <img src={block.src} alt={block.alt || ''} style={{ width: '100%', borderRadius: '8px' }} />
              {block.caption && (
                <figcaption style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem', color: '#fff' }}>
                  {parseFormattedText(block.caption)}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      })}
    </div>
  );
}


