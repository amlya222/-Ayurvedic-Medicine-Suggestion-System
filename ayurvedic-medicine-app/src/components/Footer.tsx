import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          {/* <a href="#privacy" className="footer-link">Privacy Policy</a> */}
        </div>
        <div className="footer-center">
          {/* <div className="social-links">
            <a href="#twitter" className="social-link">🐦</a>
            <a href="#facebook" className="social-link">📘</a>
            <a href="#instagram" className="social-link">📷</a>
          </div> */}
          <p className="copyright">Ayurvedic Medicine Suggestion System</p>
        </div>
        <div className="footer-right">
          {/* <a href="#terms" className="footer-link">Terms of Service</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 