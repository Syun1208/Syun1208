import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_auth');
    if (stored === 'true') setIsLoggedIn(true);
  }, []);

  function login(username, password) {
    if (username === 'admin' && password === 'Syun1208@') {
      setIsLoggedIn(true);
      localStorage.setItem('portfolio_auth', 'true');
      setShowLoginModal(false);
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem('portfolio_auth');
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, showLoginModal, setShowLoginModal }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
