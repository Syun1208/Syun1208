import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import EditableText from './EditableText';

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: '💻', href: 'https://github.com/Syun1208' },
  { label: 'LinkedIn', icon: '🔗', href: 'https://www.linkedin.com/in/syun-ai/' },
  { label: 'HuggingFace', icon: '🤗', href: 'https://huggingface.co/leonpham1208' },
  { label: 'Scholar', icon: '📚', href: 'https://scholar.google.com/citations?hl=vi&user=TIq18nUAAAAJ' },
  { label: 'YouTube', icon: '▶️', href: 'https://www.youtube.com/c/SyunEngineerChannel' },
  { label: 'Facebook', icon: '📘', href: 'https://www.facebook.com/syun128/' },
  { label: 'Email', icon: '✉️', href: 'mailto:phamlong12082001@gmail.com' },
];

export default function Home({ data, setData }) {
  const { isLoggedIn } = useAuth();
  const fileRef = useRef(null);

  function update(key) {
    return (val) => setData((d) => ({ ...d, [key]: val }));
  }

  function handleAvatarClick() {
    if (isLoggedIn) fileRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const b64 = ev.target.result;
      setData((d) => ({ ...d, avatar: b64 }));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  function handleBadgeEdit(idx) {
    return (val) => {
      setData((d) => {
        const badges = [...d.badges];
        badges[idx] = val;
        return { ...d, badges };
      });
    };
  }

  function addBadge() {
    setData((d) => ({ ...d, badges: [...d.badges, '🆕 New Badge'] }));
  }

  function removeBadge(idx) {
    setData((d) => {
      const badges = d.badges.filter((_, i) => i !== idx);
      return { ...d, badges };
    });
  }

  return (
    <section id="home" className="section hero-section">
      <div className="hero-inner">
        {/* Avatar */}
        <div className={`avatar-wrap${isLoggedIn ? ' avatar-editable' : ''}`} onClick={handleAvatarClick}>
          <img
            src={data.avatar}
            alt="Avatar"
            className="avatar-img"
            onError={(e) => {
              e.target.src = 'https://raw.githubusercontent.com/Syun1208/Syun1208/main/images/avata.jpg';
            }}
          />
          {isLoggedIn && (
            <div className="avatar-overlay">
              <span>📷</span>
              <span className="avatar-overlay-text">Change Photo</span>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {/* Name + Title */}
        <div className="hero-text">
          <EditableText
            tag="h1"
            className="hero-name"
            value={data.name}
            onSave={update('name')}
            isLoggedIn={isLoggedIn}
          />
          <EditableText
            tag="p"
            className="hero-title"
            value={data.title}
            onSave={update('title')}
            isLoggedIn={isLoggedIn}
          />
          <EditableText
            tag="p"
            className="hero-subtitle"
            value={data.subtitle}
            onSave={update('subtitle')}
            isLoggedIn={isLoggedIn}
          />
          <EditableText
            tag="p"
            className="hero-quote"
            value={data.quote}
            onSave={update('quote')}
            isLoggedIn={isLoggedIn}
          />
        </div>

        {/* Badges */}
        <div className="badges-row">
          {data.badges.map((b, i) => (
            <span key={i} className="badge-wrap">
              <EditableText
                tag="span"
                className="badge"
                value={b}
                onSave={handleBadgeEdit(i)}
                isLoggedIn={isLoggedIn}
              />
              {isLoggedIn && (
                <button className="badge-remove" onClick={() => removeBadge(i)} title="Remove badge">
                  ×
                </button>
              )}
            </span>
          ))}
          {isLoggedIn && (
            <button className="badge badge-add" onClick={addBadge}>
              + Add Badge
            </button>
          )}
        </div>

        {/* Social Buttons */}
        <div className="social-row">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
