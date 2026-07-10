'use client';

import { useCallback, useState } from 'react';
import ImageUpload from './ImageUpload';

const BLOCK_TYPES = [
  { type: 'heading',       label: 'Heading',   icon: 'H' },
  { type: 'text',          label: 'Paragraph', icon: '¶' },
  { type: 'bullet_list',   label: 'Bullets',   icon: '•' },
  { type: 'numbered_list', label: 'Numbers',   icon: '#' },
  { type: 'image',         label: 'Image',     icon: '▣' },
  { type: 'code',          label: 'Code',      icon: '</>' },
  { type: 'quote',         label: 'Quote',     icon: '"' },
];

function newBlock(type) {
  switch (type) {
    case 'heading':       return { type, level: 2, text: '' };
    case 'text':          return { type, text: '' };
    case 'bullet_list':   return { type, items: [{ text: '' }] };
    case 'numbered_list': return { type, items: [{ text: '' }] };
    case 'image':         return { type, src: '', alt: '', caption: '' };
    case 'code':          return { type, text: '' };
    case 'quote':         return { type, text: '' };
    default:              return null;
  }
}

export default function BlockEditor({ blocks, onChange }) {
  // Index at which an inline "+" picker is currently open (0..blocks.length).
  // null = no picker open. Used to insert a new block at that exact position.
  const [insertAt, setInsertAt] = useState(null);

  const insert = useCallback((index, type) => {
    const b = newBlock(type);
    if (!b) return;
    const next = [...blocks];
    next.splice(index, 0, b);
    onChange(next);
    setInsertAt(null);
  }, [blocks, onChange]);

  const add = useCallback((type) => {
    const b = newBlock(type);
    if (b) onChange([...blocks, b]);
  }, [blocks, onChange]);

  const update = useCallback((i, patch) => {
    onChange(blocks.map((b, idx) => idx === i ? { ...b, ...patch } : b));
  }, [blocks, onChange]);

  const remove = useCallback((i) => {
    onChange(blocks.filter((_, idx) => idx !== i));
  }, [blocks, onChange]);

  const move = useCallback((i, dir) => {
    const j = dir === 'up' ? i - 1 : i + 1;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }, [blocks, onChange]);

  // Inline divider between blocks. On hover shows a "+", on click reveals
  // the block-type picker for inserting at this exact position.
  const renderInserter = (index) => {
    const open = insertAt === index;
    return (
      <div className={`be-inserter${open ? ' be-inserter--open' : ''}`}>
        {open ? (
          <div className="be-inserter__picker">
            {BLOCK_TYPES.map(({ type, label, icon }) => (
              <button
                key={type}
                type="button"
                className="be-toolbar__btn"
                onClick={() => insert(index, type)}
              >
                <span className="be-toolbar__icon">{icon}</span>
                {label}
              </button>
            ))}
            <button
              type="button"
              className="be-inserter__cancel"
              onClick={() => setInsertAt(null)}
              title="Cancel"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="be-inserter__btn"
            onClick={() => setInsertAt(index)}
            title="Insert block here"
          >
            <span className="be-inserter__line" />
            <span className="be-inserter__plus">+</span>
            <span className="be-inserter__line" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Add-block toolbar */}
      <div className="be-toolbar">
        {BLOCK_TYPES.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            className="be-toolbar__btn"
            onClick={() => add(type)}
          >
            <span className="be-toolbar__icon">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Blocks */}
      <div>
        {blocks.length > 0 && renderInserter(0)}
        {blocks.map((block, i) => (
          <div key={i}>
          <div className="be-block">
            {/* Hover actions */}
            <div className="be-block__actions">
              <button
                type="button"
                className="be-block__action"
                title="Move up"
                disabled={i === 0}
                onClick={() => move(i, 'up')}
              >
                ↑
              </button>
              <button
                type="button"
                className="be-block__action"
                title="Move down"
                disabled={i === blocks.length - 1}
                onClick={() => move(i, 'down')}
              >
                ↓
              </button>
              <button
                type="button"
                className="be-block__action"
                title="Insert block below"
                onClick={() => setInsertAt(i + 1)}
              >
                +
              </button>
              <button
                type="button"
                className="be-block__action be-block__action--danger"
                title="Remove block"
                onClick={() => remove(i)}
              >
                ✕
              </button>
            </div>

            {/* ─── Heading ─── */}
            {block.type === 'heading' && (
              <>
                <div className="be-heading-level">
                  {[1, 2, 3, 4].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`be-heading-level__btn${block.level === lvl ? ' be-heading-level__btn--active' : ''}`}
                      onClick={() => update(i, { level: lvl })}
                    >
                      H{lvl}
                    </button>
                  ))}
                </div>
                <input
                  className={`be-heading-input be-heading-input--h${block.level || 2}`}
                  value={block.text || ''}
                  onChange={(e) => update(i, { text: e.target.value })}
                  placeholder="Heading text..."
                />
              </>
            )}

            {/* ─── Paragraph ─── */}
            {block.type === 'text' && (
              <>
                <span className="be-block__type">Paragraph &nbsp;·&nbsp; **bold** *italic* $math$</span>
                <textarea
                  className="be-text-input"
                  value={block.text || ''}
                  onChange={(e) => update(i, { text: e.target.value })}
                  placeholder="Write here..."
                  rows={3}
                />
              </>
            )}

            {/* ─── Lists ─── */}
            {(block.type === 'bullet_list' || block.type === 'numbered_list') && (
              <>
                <span className="be-block__type">
                  {block.type === 'bullet_list' ? 'Bullet list' : 'Numbered list'}
                </span>
                {(block.items || []).map((item, ii) => (
                  <div key={ii} className="be-list-item">
                    <span className="be-list-marker">
                      {block.type === 'bullet_list' ? '•' : `${ii + 1}.`}
                    </span>
                    <input
                      className="be-list-input"
                      value={item.text || ''}
                      onChange={(e) => {
                        const items = [...(block.items || [])];
                        items[ii] = { ...items[ii], text: e.target.value };
                        update(i, { items });
                      }}
                      placeholder={`Item ${ii + 1}`}
                    />
                    <button
                      type="button"
                      className="be-list-remove"
                      onClick={() => {
                        update(i, { items: block.items.filter((_, k) => k !== ii) });
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="be-list-add"
                  onClick={() => update(i, { items: [...(block.items || []), { text: '' }] })}
                >
                  + Add item
                </button>
              </>
            )}

            {/* ─── Image ─── */}
            {block.type === 'image' && (
              <>
                <span className="be-block__type">Image</span>
                <ImageUpload
                  currentImage={block.src}
                  onUploadComplete={(url) => update(i, { src: url })}
                  label="Upload Image"
                />
                <div className="be-image-fields">
                  <input
                    className="admin-input"
                    value={block.alt || ''}
                    onChange={(e) => update(i, { alt: e.target.value })}
                    placeholder="Alt text (accessibility)"
                  />
                  <input
                    className="admin-input"
                    value={block.caption || ''}
                    onChange={(e) => update(i, { caption: e.target.value })}
                    placeholder="Caption (optional)"
                  />
                </div>
              </>
            )}

            {/* ─── Code ─── */}
            {block.type === 'code' && (
              <>
                <span className="be-block__type">Code</span>
                <textarea
                  className="be-code-input"
                  value={block.text || ''}
                  onChange={(e) => update(i, { text: e.target.value })}
                  placeholder="Paste or write code..."
                  rows={5}
                  spellCheck={false}
                />
              </>
            )}

            {/* ─── Quote ─── */}
            {block.type === 'quote' && (
              <>
                <span className="be-block__type">Blockquote</span>
                <textarea
                  className="be-quote-input"
                  value={block.text || ''}
                  onChange={(e) => update(i, { text: e.target.value })}
                  placeholder="Enter a quote..."
                  rows={3}
                />
              </>
            )}
          </div>
          {renderInserter(i + 1)}
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="be-empty">
            <p>No content blocks yet</p>
            <small>Use the toolbar above to add headings, text, images, and more</small>
          </div>
        )}
      </div>
    </div>
  );
}
