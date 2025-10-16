import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { authService } from '../../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to continue to your account.</p>

        <form className="auth-form" onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setLoading(true);
          try {
            const res = await authService.login(email, password);
            localStorage.setItem('token', res.token);
            window.dispatchEvent(new Event('auth-changed'));
            navigate('/profile');
          } catch (err: any) {
            setError(err.message || 'Login failed');
          } finally {
            setLoading(false);
          }
        }}>
          <input type="email" placeholder="Email address" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="auth-links">
            <button type="button" className="link-btn">Forgot your password?</button>
          </div>

          {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
          <button type="submit" className="auth-primary-btn" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


