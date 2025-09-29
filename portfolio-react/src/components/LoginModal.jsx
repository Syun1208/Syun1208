import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { login, showLoginModal, setShowLoginModal } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = login(username, password);
      if (!ok) {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 400);
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) {
      setShowLoginModal(false);
      setError('');
    }
  }

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal-box">
        <button
          className="modal-close"
          onClick={() => { setShowLoginModal(false); setError(''); }}
          aria-label="Close"
        >
          ×
        </button>
        <div className="modal-header">
          <span className="modal-logo">🔐</span>
          <h2>Owner Login</h2>
          <p className="modal-sub">Access portfolio editing mode</p>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <div className="pw-wrap">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className="btn-login-submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
