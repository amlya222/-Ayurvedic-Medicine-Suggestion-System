import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { authService } from '../../services/authService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>

        <form className="auth-form" onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          if (password !== confirm) {
            setError('Passwords do not match');
            return;
          }
          setLoading(true);
          try {
            await authService.signup(fullName, email, password);
            alert('Your profile is created. Kindly please log in.');
            navigate('/login');
          } catch (err: any) {
            setError(err.message || 'Signup failed');
          } finally {
            setLoading(false);
          }
        }}>
          <input type="text" placeholder="Full name" className="auth-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder="Email address" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm password" className="auth-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

          {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
          <button type="submit" className="auth-primary-btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>

        <p className="auth-terms">
          By signing up, you agree to our <button className="link-btn">Terms of Service</button> and <button className="link-btn">Privacy Policy</button>.
        </p>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login" className="auth-link">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


