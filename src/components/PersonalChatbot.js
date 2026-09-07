'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaUser, FaCode, FaBriefcase, FaLightbulb, FaComments } from 'react-icons/fa';
import './css/CustomChatbot.css';

function generateConversationId() {
  return 'conv_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function renderFormattedText(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let key = 0;

  lines.forEach((line, lineIndex) => {
    const renderLineWithFormatting = (lineText) => {
      const parts = lineText.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
      return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} style={{ fontWeight: '700', color: '#b8bcc6' }}>{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={idx} style={{
              background: 'rgba(184, 188, 198, 0.1)',
              padding: '0.1rem 0.35rem',
              borderRadius: '3px',
              fontSize: '0.88em',
              fontFamily: 'var(--font-geist-mono), monospace',
              color: '#b8bcc6',
            }}>
              {part.slice(1, -1)}
            </code>
          );
        } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={idx} style={{ fontStyle: 'italic', color: '#ccc' }}>{part.slice(1, -1)}</em>;
        }
        return part;
      });
    };

    if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: '0.4em' }} />);
    } else if (/^#{1,3}\s/.test(line)) {
      const level = line.match(/^(#{1,3})/)[0].length;
      const content = line.replace(/^#{1,3}\s/, '');
      const sizes = ['1.25rem', '1.1rem', '1rem'];
      elements.push(
        <div key={key++} style={{ fontSize: sizes[level - 1], fontWeight: '700', color: '#e8e8e8', marginTop: '0.8em', marginBottom: '0.4em' }}>
          {renderLineWithFormatting(content)}
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)$/);
      if (match) {
        elements.push(
          <div key={key++} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5em', marginBottom: '0.3em' }}>
            <span style={{ fontWeight: '600', color: '#b8bcc6', minWidth: '1.5em' }}>{match[1]}.</span>
            <span style={{ flex: 1 }}>{renderLineWithFormatting(match[2])}</span>
          </div>
        );
      }
    } else if (/^\s+[-•]\s/.test(line)) {
      const leadingSpaces = line.match(/^(\s+)/)?.[1].length || 0;
      const content = line.replace(/^\s+[-•]\s/, '');
      const indent = Math.floor(leadingSpaces / 2) * 1.25;
      elements.push(
        <div key={key++} style={{ display: 'flex', gap: '0.5rem', marginLeft: `${indent}rem`, marginTop: '0.25em', marginBottom: '0.25em' }}>
          <span style={{ color: '#666', minWidth: '0.75em' }}>&bull;</span>
          <span style={{ flex: 1 }}>{renderLineWithFormatting(content)}</span>
        </div>
      );
    } else if (/^[-•]\s/.test(line)) {
      const content = line.replace(/^[-•]\s/, '');
      elements.push(
        <div key={key++} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35em', marginBottom: '0.25em' }}>
          <span style={{ color: '#666', minWidth: '0.75em' }}>&bull;</span>
          <span style={{ flex: 1 }}>{renderLineWithFormatting(content)}</span>
        </div>
      );
    } else {
      elements.push(
        <div key={key++} style={{ marginTop: lineIndex > 0 ? '0.2em' : 0 }}>
          {renderLineWithFormatting(line)}
        </div>
      );
    }
  });

  return <div style={{ textAlign: 'left', width: '100%' }}>{elements}</div>;
}

export function PersonalChatbot() {
  const welcome = {
    placeholder: 'Ask about my work, projects, or how we might collaborate.',
  };

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const conversationIdRef = useRef(generateConversationId());
  const scrollAreaRef = useRef(null);
  const chatSectionRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  useEffect(() => {
    if (messages.length > 0 && chatSectionRef.current) {
      chatSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages.length]);

  async function sendMessage() {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    setErrorMessage(null);
    const userMessage = { id: 'm_' + Date.now(), role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    setTimeout(() => {
      if (chatSectionRef.current) {
        chatSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    try {
      // Goes through /api/chat so the upstream webhook URL stays server-side.
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: trimmed, sessionId: conversationIdRef.current }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable right now.');

      setMessages(prev => [...prev, { id: 'm_' + Date.now() + '_a', role: 'assistant', content: data.output ?? '' }]);
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
    setTimeout(() => {
      const el = document.querySelector('.chat-textarea');
      if (el) el.focus();
    }, 100);
  };

  const quickQuestions = [
    { icon: <FaBriefcase />, title: 'Experience', question: 'Tell me about your work experience' },
    { icon: <FaCode />, title: 'Projects', question: 'What projects have you worked on?' },
    { icon: <FaLightbulb />, title: 'Skills', question: 'What are your technical skills?' },
    { icon: <FaComments />, title: 'Collaborate', question: 'How can we work together?' },
  ];

  const inputStyle = { flex: 1 };
  const sendBtnStyle = {};

  return (
    <>
      {/* Fixed input bar */}
      <div className="chatbot-fixed-input">
        <div className="chat-input-pill">
          {/* <button className="chat-input-plus" type="button" aria-label="Attach">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3.75v10.5M3.75 9h10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button> */}
          <textarea
            className="chat-textarea"
            placeholder={welcome.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          {/* <button className="chat-input-mic" type="button" aria-label="Voice input">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1a2.5 2.5 0 0 0-2.5 2.5v4a2.5 2.5 0 0 0 5 0v-4A2.5 2.5 0 0 0 8 1Z" stroke="currentColor" strokeWidth="1.3"/><path d="M12 7.5a4 4 0 0 1-8 0M8 12.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
          </button> */}
          <button
            className="chat-send-btn"
            onClick={sendMessage}
            disabled={isSending || !inputValue.trim()}
            type="button"
            aria-label="Send"
          >
            <FaPaperPlane style={{ fontSize: '0.85rem' }} />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <section
        ref={chatSectionRef}
        className="chatbot-section"
        style={{ backgroundColor: 'transparent', paddingTop: '1rem', paddingBottom: '7rem' }}
      >
        <div className="chatbot-container">
          <div className="chatbot-card" style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <FaRobot style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#e8e8e8' }}>
                  Ask about my work
                </span>
              </div>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                backgroundColor: 'var(--accent-gold)', opacity: 0.7,
              }} />
            </div>

            {/* Messages */}
            <div ref={scrollAreaRef} className="messages-area" style={{ padding: '1.5rem' }}>
              {messages.length === 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.question)}
                      style={{
                        textAlign: 'left',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--glass-border)',
                        background: 'transparent',
                        color: '#e8e8e8',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                    >
                      <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', flexShrink: 0 }}>{q.icon}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>{q.title}</span>
                    </button>
                  ))}
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
                      }}
                    >
                      {m.role === 'assistant' && (
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: 'rgba(184, 188, 198, 0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: '2px',
                        }}>
                          <FaRobot style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }} />
                        </div>
                      )}

                      <div style={{
                        ...(m.role === 'user' ? {
                          maxWidth: '75%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          borderBottomRightRadius: '4px',
                          backgroundColor: 'var(--accent-gold)',
                          color: '#111',
                          fontWeight: '500',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          fontSize: '0.92rem',
                          lineHeight: '1.5',
                        } : {
                          flex: 1,
                          padding: '0.5rem 0',
                          color: '#ddd',
                          wordBreak: 'break-word',
                          fontSize: '0.95rem',
                          lineHeight: '1.7',
                        })
                      }}>
                        {m.role === 'user' ? m.content : renderFormattedText(m.content)}
                      </div>

                      {m.role === 'user' && (
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.06)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: '2px',
                        }}>
                          <FaUser style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} />
                        </div>
                      )}
                    </div>
                  ))}

                  {isSending && (
                    <div className="d-flex gap-2" style={{ alignItems: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(184, 188, 198, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <FaRobot style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }} />
                      </div>
                      <Spinner animation="border" size="sm" style={{ color: 'var(--accent-gold)', borderWidth: '2px' }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Thinking...</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(255, 100, 100, 0.08)',
                      color: '#ffaaaa',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      border: '1px solid rgba(255, 100, 100, 0.15)',
                    }}>
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalChatbot;
