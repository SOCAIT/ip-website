'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function BlockEditor({ blocks, onChange }) {
  const [editingIndex, setEditingIndex] = useState(null);

  const addBlock = (type) => {
    const newBlock = 
      type === 'heading' ? { type: 'heading', level: 2, text: '' } :
      type === 'text' ? { type: 'text', text: '' } :
      type === 'bullet_list' ? { type: 'bullet_list', items: [{ text: '' }] } :
      type === 'numbered_list' ? { type: 'numbered_list', items: [{ text: '' }] } :
      type === 'image' ? { type: 'image', src: '', alt: '', caption: '' } :
      null;
    
    if (newBlock) {
      onChange([...blocks, newBlock]);
      setEditingIndex(blocks.length);
    }
  };

  const updateBlock = (index, updates) => {
    const updated = blocks.map((b, i) => i === index ? { ...b, ...updates } : b);
    onChange(updated);
  };

  const deleteBlock = (index) => {
    if (confirm('Delete this block?')) {
      onChange(blocks.filter((_, i) => i !== index));
      setEditingIndex(null);
    }
  };

  const moveBlock = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    
    const updated = [...blocks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: '📝', color: '#48bb78' },
    { type: 'text', label: 'Paragraph', icon: '📄', color: '#4299e1' },
    { type: 'bullet_list', label: 'Bullet List', icon: '•', color: '#9f7aea' },
    { type: 'numbered_list', label: 'Numbered List', icon: '1.', color: '#805ad5' },
    { type: 'image', label: 'Image', icon: '🖼️', color: '#ed8936' }
  ];

  const buttonStyle = (color) => ({
    padding: '0.75rem 1.25rem',
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  });

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1.25rem', 
        background: 'rgba(154,230,180,0.05)',
        borderRadius: '12px',
        border: '1px dashed rgba(154,230,180,0.3)'
      }}>
        <h4 style={{ 
          color: '#9AE6B4', 
          marginTop: 0, 
          marginBottom: '1rem',
          fontSize: '1rem',
          fontWeight: '600'
        }}>
          ➕ Add Content Block
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {blockTypes.map(({ type, label, icon, color }) => (
            <button 
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              style={buttonStyle(color)}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {blocks.map((block, index) => (
          <div 
            key={index} 
            style={{
              background: editingIndex === index ? 'rgba(154,230,180,0.08)' : 'rgba(255,255,255,0.05)',
              border: editingIndex === index ? '2px solid #9AE6B4' : '2px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1.25rem',
              transition: 'all 0.3s ease',
              boxShadow: editingIndex === index ? '0 4px 20px rgba(154,230,180,0.2)' : '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ 
                  fontSize: '1.5rem',
                  background: 'rgba(154,230,180,0.1)',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {block.type === 'heading' ? '📝' : 
                   block.type === 'text' ? '📄' : 
                   block.type === 'bullet_list' ? '•' :
                   block.type === 'numbered_list' ? '1.' : '🖼️'}
                </span>
                <div>
                  <strong style={{ color: '#9AE6B4', textTransform: 'capitalize', fontSize: '1rem', display: 'block' }}>
                    {block.type.replace('_', ' ')}
                  </strong>
                  <small style={{ color: '#888' }}>Block #{index + 1}</small>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  title="Move up"
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: index === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                    color: index === 0 ? '#666' : 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => index !== 0 && (e.target.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseOut={(e) => index !== 0 && (e.target.style.background = 'rgba(255,255,255,0.1)')}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  title="Move down"
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: index === blocks.length - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                    color: index === blocks.length - 1 ? '#666' : 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: index === blocks.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => index !== blocks.length - 1 && (e.target.style.background = 'rgba(255,255,255,0.2)')}
                  onMouseOut={(e) => index !== blocks.length - 1 && (e.target.style.background = 'rgba(255,255,255,0.1)')}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: editingIndex === index ? '#38a169' : '#4299e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  {editingIndex === index ? '✓ Done' : '✏️ Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteBlock(index)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#f56565',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#e53e3e';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#f56565';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>

            {editingIndex === index ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                {block.type === 'heading' && (
                  <>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.95rem',
                        color: '#ddd',
                        fontWeight: '500'
                      }}>
                        Heading Level:
                      </label>
                      <select
                        value={block.level || 2}
                        onChange={(e) => updateBlock(index, { level: parseInt(e.target.value) })}
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '8px',
                          width: '100%',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value={1} style={{ background: '#1a1a1a' }}>H1 - Main Title</option>
                        <option value={2} style={{ background: '#1a1a1a' }}>H2 - Section</option>
                        <option value={3} style={{ background: '#1a1a1a' }}>H3 - Subsection</option>
                        <option value={4} style={{ background: '#1a1a1a' }}>H4 - Minor Heading</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.95rem',
                        color: '#ddd',
                        fontWeight: '500'
                      }}>
                        Heading Text:
                      </label>
                      <input
                        type="text"
                        value={block.text || ''}
                        onChange={(e) => updateBlock(index, { text: e.target.value })}
                        placeholder="Enter your heading..."
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '8px',
                          width: '100%',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </>
                )}

                {block.type === 'text' && (
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontSize: '0.95rem',
                      color: '#ddd',
                      fontWeight: '500'
                    }}>
                      Content:
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#9AE6B4',
                        fontWeight: 'normal',
                        marginLeft: '0.5rem',
                        background: 'rgba(154,230,180,0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        **bold** *italic* $math$
                      </span>
                    </label>
                    <textarea
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, { text: e.target.value })}
                      rows={6}
                      placeholder="Write your paragraph content here..."
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        width: '100%',
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        resize: 'vertical',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        lineHeight: '1.6'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#9AE6B4';
                        e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                )}

                {(block.type === 'bullet_list' || block.type === 'numbered_list') && (
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.75rem', 
                      fontSize: '0.95rem',
                      color: '#ddd',
                      fontWeight: '500'
                    }}>
                      List Items:
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#9AE6B4',
                        fontWeight: 'normal',
                        marginLeft: '0.5rem',
                        background: 'rgba(154,230,180,0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        **bold** *italic* $math$
                      </span>
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {(block.items || []).map((item, itemIdx) => (
                        <div key={itemIdx} style={{ 
                          display: 'flex', 
                          gap: '0.75rem',
                          alignItems: 'flex-start',
                          background: 'rgba(255,255,255,0.03)',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          <span style={{ 
                            color: '#9AE6B4',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            minWidth: '24px',
                            marginTop: '0.75rem'
                          }}>
                            {block.type === 'bullet_list' ? '•' : `${itemIdx + 1}.`}
                          </span>
                          <textarea
                            value={item.text || ''}
                            onChange={(e) => {
                              const newItems = [...(block.items || [])];
                              newItems[itemIdx] = { ...newItems[itemIdx], text: e.target.value };
                              updateBlock(index, { items: newItems });
                            }}
                            rows={2}
                            placeholder={`Item ${itemIdx + 1}...`}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              background: 'rgba(255,255,255,0.08)',
                              color: 'white',
                              border: '2px solid rgba(255,255,255,0.15)',
                              borderRadius: '8px',
                              fontFamily: 'inherit',
                              fontSize: '1rem',
                              resize: 'vertical',
                              outline: 'none',
                              transition: 'all 0.2s ease'
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = '#9AE6B4';
                              e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = block.items.filter((_, i) => i !== itemIdx);
                              updateBlock(index, { items: newItems });
                            }}
                            title="Remove item"
                            style={{
                              padding: '0.75rem',
                              background: '#f56565',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              transition: 'all 0.2s ease',
                              minWidth: '40px'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#e53e3e'}
                            onMouseOut={(e) => e.target.style.background = '#f56565'}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = [...(block.items || []), { text: '' }];
                        updateBlock(index, { items: newItems });
                      }}
                      style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem 1.25rem',
                        background: '#48bb78',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = '#38a169';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = '#48bb78';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>+</span> Add Item
                    </button>
                  </div>
                )}

                {block.type === 'image' && (
                  <>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.75rem', 
                        fontSize: '0.95rem',
                        color: '#ddd',
                        fontWeight: '500'
                      }}>
                        Image:
                      </label>
                      <ImageUpload
                        currentImage={block.src}
                        onUploadComplete={(url) => updateBlock(index, { src: url })}
                        label="Upload Image"
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.95rem',
                        color: '#ddd',
                        fontWeight: '500'
                      }}>
                        Alt Text:
                        <small style={{ color: '#888', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                          (for accessibility)
                        </small>
                      </label>
                      <input
                        type="text"
                        value={block.alt || ''}
                        onChange={(e) => updateBlock(index, { alt: e.target.value })}
                        placeholder="Describe the image..."
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '8px',
                          width: '100%',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem', 
                        fontSize: '0.95rem',
                        color: '#ddd',
                        fontWeight: '500'
                      }}>
                        Caption:
                        <small style={{ color: '#888', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                          (optional)
                        </small>
                      </label>
                      <input
                        type="text"
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                        placeholder="Add a caption for the image..."
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(255,255,255,0.08)',
                          color: 'white',
                          border: '2px solid rgba(255,255,255,0.15)',
                          borderRadius: '8px',
                          width: '100%',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#9AE6B4';
                          e.target.style.boxShadow = '0 0 0 3px rgba(154,230,180,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={{ color: '#ddd', fontSize: '0.9rem' }}>
                {block.type === 'heading' && <div>H{block.level}: {block.text || '(empty)'}</div>}
                {block.type === 'text' && <div>{block.text?.substring(0, 100) || '(empty)'}...</div>}
                {(block.type === 'bullet_list' || block.type === 'numbered_list') && (
                  <div>
                    {block.type === 'bullet_list' ? '• ' : '1. '}
                    {block.items?.[0]?.text?.substring(0, 50) || '(empty)'}
                    {block.items && block.items.length > 1 && ` ... (+${block.items.length - 1} more)`}
                  </div>
                )}
                {block.type === 'image' && (
                  <div>
                    {block.src && <img src={block.src} alt={block.alt} style={{ maxWidth: '200px', borderRadius: '4px' }} />}
                    {!block.src && <span>(no image)</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {blocks.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            border: '2px dashed rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p style={{ color: '#888', fontSize: '1.1rem', margin: 0 }}>
              No content blocks yet
            </p>
            <p style={{ color: '#666', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Click the buttons above to add headings, paragraphs, lists, or images
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

