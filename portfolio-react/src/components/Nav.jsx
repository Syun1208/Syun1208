import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = ['Home', 'About', 'Experience', 'Projects', 'Awards', 'Publications'];

export default function Nav() {
  const { isLoggedIn, logout, setShowLoginModal } = useAuth();
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);

      let current = 'Home';
      for (const id of NAV_LINKS) {
        const el = document.getElementById(id.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = id;
        }
      }
      setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id) {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }

  return (
    <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo('home')}>
          PML.
        </button>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link${active === l ? ' nav-link-active' : ''}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <span className="editing-badge">✏️ Editing</span>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn-login"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
          )}
        </div>

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
