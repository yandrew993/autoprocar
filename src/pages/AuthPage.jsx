import React, { useState } from 'react';
import './AuthPage.scss';

const API_BASE = 'https://backend.autoprocar.com';

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (isLogin) {
      // Login
      const res = await fetch(`${API_BASE}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success && data.role === 'user') {
        setSuccess('Login successful!');
        onAuth && onAuth();
      } else {
        setError(data.error || 'Login failed');
      }
    } else {
      // Register
      const res = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Account created! Please log in.');
        setIsLogin(true);
      } else {
        setError(data.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'User Login' : 'Create Account'}</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        {!isLogin && <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <button className="btn primary" type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="btn secondary switch-btn" onClick={() => { setIsLogin(l => !l); setError(''); setSuccess(''); }}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
