import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { authService } from '../services/authService';

const Navbar: React.FC = () => {
  const [userNameInitial, setUserNameInitial] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setUserNameInitial(null); return; }
      try {
        const me = await authService.me(token);
        const initial = (me.fullName || me.email || 'U').charAt(0).toUpperCase();
        setUserNameInitial(initial);
      } catch {
        // Stale/invalid token -> remove and show login button
        localStorage.removeItem('token');
        setUserNameInitial(null);
      }
    };
    load();

    const onAuthChanged = () => load();
    window.addEventListener('auth-changed', onAuthChanged);
    return () => window.removeEventListener('auth-changed', onAuthChanged);
  }, []);
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <Link to="/" className="logo-text">Ayurvedic Medicine Suggestion System</Link>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/medicine-search" className="nav-link">Medicine Search</Link>
          <Link to="/how-to-use" className="nav-link">How to Use</Link>
          <a
            href="#stay-healthy"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              const token = localStorage.getItem('token');
              if (!token) {
                alert('Please login for "Stay Healthy" section');
                window.location.href = '/login';
              } else {
                window.location.href = '/stay-healthy';
              }
            }}
          >
            Stay Healthy
          </a>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          {userNameInitial ? (
            <Link to="/profile" className="avatar-circle" aria-label="Profile">{userNameInitial}</Link>
          ) : (
            <Link to="/login" className="login-btn">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 