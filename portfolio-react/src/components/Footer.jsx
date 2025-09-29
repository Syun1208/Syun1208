export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {year} <span className="footer-name">Pham Minh Long</span>. All rights reserved.
        </p>
        <p className="footer-sub">Built with React · Vite · Love ☕</p>
      </div>
    </footer>
  );
}
