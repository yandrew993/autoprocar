import React, { useState } from 'react';
const API_BASE = 'https://backend.autoprocar.com';

export default function UserAuth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
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
        onAuth();
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
        setIsLogin(true);
        setError('Account created! Please log in.');
      } else {
        setError(data.error || 'Registration failed');
      }
    }
  };

  return (
    <div className="user-auth-modal">
      <form className="user-auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'User Login' : 'Create Account'}</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        {!isLogin && <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {error && <div className="error-message">{error}</div>}
        <button className="btn primary" type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" className="btn secondary" onClick={() => { setIsLogin(l => !l); setError(''); }}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
