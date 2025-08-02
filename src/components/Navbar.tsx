import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../Assets/avatar.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <Link to="/" className="logo-text">Ayurvedic Medicine Suggestion System</Link>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/how-to-use" className="nav-link">How to Use</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <div className="profile">
            <img src={avatar} alt="Profile" className="profile-img" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar; 