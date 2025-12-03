"use client";
import React from "react";
import './ArticleContent.css';

// Helper function to parse text with markdown-style formatting
function parseFormattedText(text) {
  if (!text) return null;
  
  const parts = [];
  let currentIndex = 0;
  let key = 0;
  
  // Combined regex to match **bold**, *italic*, `code`, and inline math $...$
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\$[^$]+\$)/g;
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
        <strong key={`bold-${key++}`} className="text-bold">
          {matched.slice(2, -2)}
        </strong>
      );
    } else if (matched.startsWith('*') && matched.endsWith('*')) {
      // Italic text
      parts.push(
        <em key={`italic-${key++}`} className="text-italic">
          {matched.slice(1, -1)}
        </em>
      );
    } else if (matched.startsWith('`') && matched.endsWith('`')) {
      // Inline code
      parts.push(
        <code key={`code-${key++}`} className="text-code">
          {matched.slice(1, -1)}
        </code>
      );
    } else if (matched.startsWith('$') && matched.endsWith('$')) {
      // Inline math - render as code-like style
      parts.push(
        <code key={`math-${key++}`} className="text-math">
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
    <div className="article-content-wrapper">
      {blocks.map((block, idx) => {
        if (block.type === "heading") {
          const Tag = `h${block.level || 2}`;
          return (
            <Tag key={idx} className={`content-heading heading-${block.level || 2}`}>
              {parseFormattedText(block.text)}
            </Tag>
          );
        }
        if (block.type === "text") {
          return (
            <p key={idx} className="content-paragraph">
              {parseFormattedText(block.text)}
            </p>
          );
        }
        if (block.type === "bullet_list") {
          return (
            <ul key={idx} className="content-list bullet-list">
              {(block.items || []).map((item, itemIdx) => (
                <li key={itemIdx} className="list-item">
                  {parseFormattedText(item.text)}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "numbered_list") {
          return (
            <ol key={idx} className="content-list numbered-list">
              {(block.items || []).map((item, itemIdx) => (
                <li key={itemIdx} className="list-item">
                  {parseFormattedText(item.text)}
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={idx} className="content-figure">
              <img 
                src={block.src} 
                alt={block.alt || ''} 
                className="content-image"
                loading="lazy"
              />
              {block.caption && (
                <figcaption className="content-caption">
                  {parseFormattedText(block.caption)}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === "code") {
          return (
            <pre key={idx} className="content-code-block">
              <code>{block.text}</code>
            </pre>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={idx} className="content-blockquote">
              {parseFormattedText(block.text)}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}


