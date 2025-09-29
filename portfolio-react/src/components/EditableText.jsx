import { useState, useRef, useEffect } from 'react';

export default function EditableText({
  value,
  onSave,
  isLoggedIn,
  tag: Tag = 'span',
  className = '',
  multiline = false,
  style = {},
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (multiline) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
      }
    }
  }, [editing, multiline]);

  function handleSave() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  function handleKeyDown(e) {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          className="editable-input editable-textarea"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        className="editable-input"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <Tag
      className={`${className} editable-field`}
      style={style}
      onClick={() => setEditing(true)}
      title="Click to edit"
    >
      {value}
      <span className="edit-icon" aria-hidden="true">✏️</span>
    </Tag>
  );
}
