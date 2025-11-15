'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaUser, FaCode, FaBriefcase, FaLightbulb, FaComments } from 'react-icons/fa';
import './css/CustomChatbot.css';

function generateConversationId() {
  return 'conv_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Function to render formatted text with markdown-like styling
function renderFormattedText(text) {
  if (!text) return null;

  // Split by lines
  const lines = text.split('\n');
  const elements = [];
  let key = 0;

  lines.forEach((line, lineIndex) => {
    // Handle bold text **text**, inline code `code`, and italic *text*
    const renderLineWithFormatting = (lineText) => {
      // Split by formatting patterns
      const parts = lineText.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
      return parts.map((part, idx) => {
        // Bold **text**
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} style={{ fontWeight: '700', color: '#d4af37' }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Inline code `code`
        else if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code 
              key={idx} 
              style={{ 
                background: 'rgba(212, 175, 55, 0.15)', 
                padding: '0.125rem 0.375rem', 
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'monospace',
                color: '#d4af37',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        // Italic *text* (single asterisk, not bold)
        else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return (
            <em key={idx} style={{ fontStyle: 'italic', color: '#d0d0d0' }}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    // Empty line - add spacing
    if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: '0.5em' }} />);
    }
    // Headings (### Heading)
    else if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})/)[0].length;
      const content = line.replace(/^#{1,3}\s/, '');
      const sizes = ['1.5rem', '1.3rem', '1.15rem'];
      elements.push(
        <div 
          key={key++} 
          style={{ 
            fontSize: sizes[level - 1],
            fontWeight: '700',
            color: '#d4af37',
            marginTop: '1em',
            marginBottom: '0.5em',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.02em'
          }}
        >
          {renderLineWithFormatting(content)}
        </div>
      );
    }
    // Numbered list (e.g., "1. ", "2. ")
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        elements.push(
          <div key={key++} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75em', marginBottom: '0.5em' }}>
            <span style={{ fontWeight: '700', color: '#d4af37', minWidth: '1.5em' }}>{match[1]}.</span>
            <span style={{ flex: 1 }}>{renderLineWithFormatting(match[2])}</span>
          </div>
        );
      }
    }
    // Bullet points with indentation (e.g., "   - " or "     - ")
    else if (/^\s+[-•]\s/.test(line)) {
      const leadingSpaces = line.match(/^(\s+)/)?.[1].length || 0;
      const content = line.replace(/^\s+[-•]\s/, '');
      const indent = Math.floor(leadingSpaces / 2) * 1.5; // Convert spaces to rem
      
      elements.push(
        <div 
          key={key++} 
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginLeft: `${indent}rem`,
            marginTop: '0.35em',
            marginBottom: '0.35em'
          }}
        >
          <span style={{ color: '#d4af37', minWidth: '0.75em' }}>•</span>
          <span style={{ flex: 1 }}>{renderLineWithFormatting(content)}</span>
        </div>
      );
    }
    // Top-level bullet (e.g., "- ")
    else if (/^[-•]\s/.test(line)) {
      const content = line.replace(/^[-•]\s/, '');
      elements.push(
        <div key={key++} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5em', marginBottom: '0.35em' }}>
          <span style={{ color: '#d4af37', minWidth: '0.75em' }}>•</span>
          <span style={{ flex: 1 }}>{renderLineWithFormatting(content)}</span>
        </div>
      );
    }
    // Regular text
    else {
      elements.push(
        <div key={key++} style={{ marginTop: lineIndex > 0 ? '0.25em' : 0 }}>
          {renderLineWithFormatting(line)}
        </div>
      );
    }
  });

  return <div style={{ textAlign: 'left', width: '100%' }}>{elements}</div>;
}

export function PersonalChatbot() {
  const welcome = {
    title: 'Ask Me Anything',
    desc: 'I\'m here to answer your questions about my experience, skills, projects, and how we can work together. Feel free to ask anything!',
    placeholder: 'Ask about my experience, skills, projects...',
  };

  const webhookUrl = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL ?? '';

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const conversationIdRef = useRef(generateConversationId());
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  async function sendMessage() {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    setErrorMessage(null);

    const userMessage = {
      id: 'm_' + Date.now(),
      role: 'user',
      content: trimmed,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      if (!webhookUrl) {
        throw new Error('Chat webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: trimmed,
          sessionId: conversationIdRef.current,
        }),
      });

      let assistantText = '';
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (typeof data === 'string') {
          assistantText = data;
        } else if (data && typeof data === 'object') {
          const candidate = data.output ?? data.message ?? data.text;
          assistantText = typeof candidate === 'string' ? candidate : JSON.stringify(data);
        } else {
          assistantText = String(data);
        }
      } else {
        assistantText = await response.text();
      }

      if (!response.ok) {
        throw new Error(assistantText || 'Request failed');
      }

      const assistantMessage = {
        id: 'm_' + Date.now() + '_assistant',
        role: 'assistant',
        content: assistantText,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setErrorMessage(err?.message || 'Unknown error');
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  const quickQuestions = [
    { icon: <FaBriefcase />, title: 'Experience', question: 'Tell me about your work experience', desc: 'Career background' },
    { icon: <FaCode />, title: 'Projects', question: 'What projects have you worked on?', desc: 'Portfolio highlights' },
    { icon: <FaLightbulb />, title: 'Skills', question: 'What are your technical skills?', desc: 'Technologies & tools' },
    { icon: <FaComments />, title: 'Collaboration', question: 'How can we work together?', desc: 'Get in touch' },
  ];

  return (
    <>
      {/* Fixed Input Overlay */}
      <div className="chatbot-fixed-input">
        <div className="chatbot-container">
          <div className="d-flex align-items-end gap-2">
            <textarea
              className="chat-textarea"
              style={{
                flex: 1,
                resize: 'none',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(10, 14, 26, 0.95)',
                color: 'white',
                padding: '1rem 1.125rem',
                fontSize: '1rem',
                minHeight: '52px',
                maxHeight: '200px',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                lineHeight: '1.5',
                letterSpacing: '0.01em',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(20px)'
              }}
              placeholder={welcome.placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
            />
            <Button
              className="send-button"
              onClick={sendMessage}
              disabled={isSending || !inputValue.trim()}
              style={{
                height: '52px',
                minWidth: '52px',
                borderRadius: '12px',
                backgroundColor: '#d4af37',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1.25rem',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => !isSending && !inputValue.trim() ? null : e.target.style.backgroundColor = '#b8941f'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#d4af37'}
            >
              <FaPaperPlane style={{ fontSize: '1.1rem', color: '#000' }} />
            </Button>
          </div>
        </div>
      </div>

      <section className="py-5 chatbot-section" style={{ backgroundColor: 'transparent', paddingTop: '4rem', paddingBottom: '8rem' }}>
        <div className="chatbot-container">
          <div className="chatbot-card">
          {/* Header */}
          <div className="chatbot-header">
            <div className="d-flex align-items-center gap-3">
              <div 
                className="robot-icon-large"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(212, 175, 55, 0.4)',
                  flexShrink: 0
                }}
              >
                <FaRobot style={{ fontSize: '1.8rem', color: '#d4af37' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 
                  style={{ 
                    fontSize: '1.5rem', 
                    fontFamily: 'Orbitron, sans-serif', 
                    marginBottom: '0.35rem',
                    color: 'white',
                    fontWeight: '700',
                    letterSpacing: '0.02em'
                  }}
                >
                  AI Assistant
                </h2>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#c5c5c5', 
                  marginBottom: 0,
                  letterSpacing: '0.01em',
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif'
                }}>
                  Ask me anything about Giannis
                </p>
              </div>
              <div 
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#d4af37',
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
                  animation: 'pulse 2s infinite'
                }}
              />
            </div>
          </div>

          {/* Warning if webhook not configured */}
          {!webhookUrl && (
            <div 
              style={{
                padding: '1rem 1.5rem',
                background: 'rgba(212, 175, 55, 0.1)',
                color: '#ffcccc',
                fontSize: '0.95rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                letterSpacing: '0.01em',
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                lineHeight: '1.6'
              }}
            >
              ⚠️ Chatbot webhook URL not configured. Set NEXT_PUBLIC_CHAT_WEBHOOK_URL in your .env.local file.
            </div>
          )}

          {/* Messages Area */}
          <div 
            ref={scrollAreaRef}
            className="messages-area"
          >
            {messages.length === 0 ? (
              <div 
                className="welcome-screen"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1rem'
                }}
              >
              
                
                <div className="quick-questions-grid">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      className="quick-question-btn"
                      onClick={() => handleQuickQuestion(q.question)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '0.9rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="btn-icon" style={{ color: '#d4af37', fontSize: '1.1rem' }}>{q.icon}</span>
                        <span className="btn-title" style={{ 
                          fontWeight: '600', 
                          fontFamily: 'Orbitron, sans-serif',
                          fontSize: '0.95rem',
                          letterSpacing: '0.015em'
                        }}>{q.title}</span>
                      </div>
                      <div className="btn-desc" style={{ 
                        fontSize: '0.8rem', 
                        color: '#aaa',
                        letterSpacing: '0.01em',
                        lineHeight: '1.4'
                      }}>{q.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {messages.map((m) => (
                  <div 
                    key={m.id} 
                    className="d-flex gap-2"
                    style={{ 
                      justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-start',
                      width: '100%'
                    }}
                  >
                    {m.role === 'assistant' && (
                      <div 
                        className="robot-icon-small"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(212, 175, 55, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid rgba(212, 175, 55, 0.4)',
                          flexShrink: 0,
                          marginTop: '4px'
                        }}
                      >
                        <FaRobot style={{ fontSize: '1rem', color: '#d4af37' }} />
                      </div>
                    )}
                    
                    <div
                      className={m.role === 'user' ? 'message-bubble' : 'assistant-message'}
                      style={{
                        ...(m.role === 'user' ? {
                          maxWidth: '75%',
                          padding: '1rem 1.25rem',
                          borderRadius: '18px',
                          borderBottomRightRadius: '4px',
                          backgroundColor: '#d4af37',
                          color: '#0a0e1a',
                          fontWeight: '500',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          letterSpacing: '0.01em',
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif'
                        } : {
                          flex: 1,
                          padding: '0.75rem 0',
                          color: '#f5f5f5',
                          wordBreak: 'break-word',
                          fontSize: '1.05rem',
                          lineHeight: '1.8',
                          letterSpacing: '0.015em',
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                          fontWeight: '400',
                          textAlign: 'left'
                        })
                      }}
                    >
                      {m.role === 'user' ? m.content : renderFormattedText(m.content)}
                    </div>
                    
                    {m.role === 'user' && (
                      <div 
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(100, 181, 246, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '4px',
                          border: '2px solid rgba(100, 181, 246, 0.4)'
                        }}
                      >
                        <FaUser style={{ fontSize: '0.9rem', color: '#64b5f6' }} />
                      </div>
                    )}
                  </div>
                ))}
                
                {isSending && (
                  <div className="d-flex gap-2" style={{ alignItems: 'flex-start', width: '100%' }}>
                    <div 
                      className="robot-icon-small"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(212, 175, 55, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(212, 175, 55, 0.4)',
                        flexShrink: 0,
                        marginTop: '4px'
                      }}
                    >
                      <FaRobot style={{ fontSize: '1rem', color: '#d4af37' }} />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: '0.75rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.625rem'
                      }}
                    >
                      <Spinner animation="border" size="sm" style={{ color: '#d4af37' }} />
                      <span style={{ 
                        color: '#d0d0d0', 
                        fontSize: '1rem',
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                        letterSpacing: '0.015em'
                      }}>Thinking...</span>
                    </div>
                  </div>
                )}
                
                {errorMessage && (
                  <div 
                    style={{
                      padding: '0.875rem 1rem',
                      background: 'rgba(212, 175, 55, 0.1)',
                      color: '#ffcccc',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em',
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                      lineHeight: '1.5',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
    </>
  );
}

export default PersonalChatbot;

