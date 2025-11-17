import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';
const ADMIN_CREDENTIALS = {
  username: 'John_Paul',
  password: '#0111469688Jp',
};
const getAppointments = () => JSON.parse(localStorage.getItem('autocare_appointments')) || [];
const setAppointments = (apts) => localStorage.setItem('autocare_appointments', JSON.stringify(apts));
const API_BASE = 'https://backend.autoprocar.com';

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminLoggedIn') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [appointments, setAppointmentsState] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  useEffect(() => {
    if (isLoggedIn) {
      setAppointmentsState(getAppointments());
    }
  }, [isLoggedIn, showModal]);
  const handleLogin = () => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      setLoginError(false);
      setUsername('');
      setPassword('');
    } else {
      setLoginError(true);
    }
  };
  const handleLogout = () => {
    localStorage.setItem('adminLoggedIn', 'false');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError(false);
  };
  const handleDelete = (id) => {
    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    setAppointmentsState(updated);
  };
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL appointments? This cannot be undone.')) {
      setAppointments([]);
      setAppointmentsState([]);
    }
  };
  const handleRegister = async () => {
    setRegisterError('');
    setRegisterSuccess('');
    if (!username || !email || !password) {
      setRegisterError('All fields are required.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (data.success) {
        setRegisterSuccess('Registration successful! You can now log in.');
        setIsRegister(false);
        setUsername('');
        setPassword('');
        setEmail('');
      } else {
        setRegisterError(data.error || 'Registration failed.');
      }
    } catch (e) {
      setRegisterError('Network error. Please try again.');
    }
  };
  // Save appointments to localStorage when changed
  useEffect(() => {
    if (isLoggedIn) setAppointments(appointments);
  }, [appointments, isLoggedIn]);
  // Modal close on outside click or Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && showModal) setShowModal(false);
    };
    const handleClick = (e) => {
      if (e.target.classList.contains('admin-modal')) setShowModal(false);
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showModal]);
  return (
    <>
      <div className="admin-panel">
        <button className="admin-btn" onClick={() => setShowModal(true)}>
          <i className="fas fa-tools"></i>
        </button>
      </div>
      {showModal && (
        <div className="admin-modal">
          <div className="admin-content">
            <div className="admin-header">
              <h2>{isLoggedIn ? 'Appointment Management' : (isRegister ? 'User Registration' : 'Staff Login')}</h2>
              <button className="close-admin" onClick={() => setShowModal(false)}>Close</button>
            </div>
            {!isLoggedIn ? (
              isRegister ? (
                <div className="register-form">
                  <h3>Register as a User</h3>
                  <div className="form-group">
                    <label htmlFor="regUsername">Username</label>
                    <input type="text" id="regUsername" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regEmail">Email</label>
                    <input type="email" id="regEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regPassword">Password</label>
                    <input type="password" id="regPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                  </div>
                  {registerError && <div className="error-message">{registerError}</div>}
                  {registerSuccess && <div className="success-message">{registerSuccess}</div>}
                  <button className="btn primary" style={{width: '100%'}} onClick={handleRegister}>Register</button>
                  <div className="switch-auth">
                    <button className="btn secondary" onClick={() => { setIsRegister(false); setRegisterError(''); setRegisterSuccess(''); }}>Back to Login</button>
                  </div>
                </div>
              ) : (
                <div id="loginSection">
                  <div className="login-form">
                    <h3>Authorized Personnel Only</h3>
                    <div className="form-group">
                      <label htmlFor="adminUsername">Username</label>
                      <input type="text" id="adminUsername" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="adminPassword">Password</label>
                      <input type="password" id="adminPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                    </div>
                    {loginError && <div className="error-message">Invalid credentials. Please try again.</div>}
                    <button className="btn primary" style={{width: '100%'}} onClick={handleLogin}>Login</button>
                    <div className="switch-auth">
                      <button className="btn secondary" onClick={() => { setIsRegister(true); setLoginError(false); }}>Register as User</button>
                    </div>
                    <div className="contact-admin">
                      <p>Need access? Contact the manager.</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div id="adminSection">
                <div className="admin-header">
                  <h2>Appointment Management</h2>
                  <div>
                    <button className="btn secondary" onClick={handleLogout} style={{marginRight: 10}}>Logout</button>
                    <button className="close-admin" onClick={() => setShowModal(false)}>Close</button>
                  </div>
                </div>
                <div id="adminStats">
                  <p>Total Appointments: <span id="totalAppointments">{appointments.length}</span></p>
                  <button className="btn primary" onClick={() => setAppointmentsState(getAppointments())}>Refresh</button>
                  <button className="btn secondary" style={{background: '#e53e3e'}} onClick={handleClearAll}>Clear All</button>
                </div>
                <div id="appointmentsList">
                  <table className="appointments-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Vehicle</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="appointmentsTableBody">
                      {appointments.length === 0 ? (
                        <tr><td colSpan="6" style={{textAlign: 'center'}}>No appointments found.</td></tr>
                      ) : appointments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map(apt => (
                        <tr key={apt.id}>
                          <td>{apt.date}</td>
                          <td>{apt.name}</td>
                          <td>{apt.phone}</td>
                          <td>{apt.service}</td>
                          <td>{apt.vehicle}</td>
                          <td>
                            <button className="delete-btn" onClick={() => handleDelete(apt.id)}>
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default AdminPanel;