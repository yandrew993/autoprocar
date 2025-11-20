import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';
const API_BASE = 'https://backend.autoprocar.com';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [appointments, setAppointmentsState] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments(role === 'admin').then(setAppointmentsState);
    }
  }, [isLoggedIn, role]);

  const handleLogin = async () => {
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setRole(data.role);
        setUsername('');
        setPassword('');
      } else {
        setLoginError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (e) {
      setLoginError('Network error. Please try again.');
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

  const handleLogout = async () => {
    await fetch(`${API_BASE}/logout.php`, { credentials: 'include' });
    setIsLoggedIn(false);
    setRole('');
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/delete_appointment.php?id=${id}`, { credentials: 'include' });
    setAppointmentsState(await fetchAppointments(role === 'admin'));
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`${API_BASE}/update_appointment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
      credentials: 'include',
    });
    setAppointmentsState(await fetchAppointments(role === 'admin'));
  };

  async function fetchAppointments(all = false) {
    const url = all ? `${API_BASE}/get_appointments.php?all=1` : `${API_BASE}/get_appointments.php`;
    const res = await fetch(url, { credentials: 'include' });
    return res.json();
  }

  return (
    <div className="admin-content" style={{margin: '2rem auto', maxWidth: 800}}>
      <div className="admin-header">
        <h2>{isLoggedIn ? (role === 'admin' ? 'Appointment Management' : 'My Appointments') : (isRegister ? 'User Registration' : 'Staff/User Login')}</h2>
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
              <span>Have an account? <button className="btn secondary" style={{display:'inline',marginLeft:4}} onClick={() => { setIsRegister(false); setRegisterError(''); setRegisterSuccess(''); }}>Click Login</button></span>
            </div>
          </div>
        ) : (
          <div id="loginSection">
            <div className="login-form">
              <h3>Staff or User Login</h3>
              <div className="form-group">
                <label htmlFor="adminUsername">Username</label>
                <input type="text" id="adminUsername" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
              </div>
              <div className="form-group">
                <label htmlFor="adminPassword">Password</label>
                <input type="password" id="adminPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>
              {loginError && <div className="error-message">{loginError}</div>}
              <button className="btn primary" style={{width: '100%'}} onClick={handleLogin}>Login</button>
              <div className="switch-auth">
                <span>Don't have an account? <button className="btn secondary" style={{display:'inline',marginLeft:4}} onClick={() => { setIsRegister(true); setLoginError(''); }}>Click Register</button></span>
              </div>
              
            </div>
          </div>
        )
      ) : (
        <div id="adminSection">
          <div className="admin-header">
            <h2>{role === 'admin' ? 'Appointment Management' : 'My Appointments'}</h2>
            <div>
              <button className="btn secondary" onClick={handleLogout} style={{marginRight: 10}}>Logout</button>
            </div>
          </div>
          <div id="adminStats">
            <p>Total Appointments: <span id="totalAppointments">{appointments.length}</span></p>
            <button className="btn primary" onClick={async () => setAppointmentsState(await fetchAppointments(role === 'admin'))}>Refresh</button>
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
                      {role === 'admin' && (
                        <>
                          <button className="delete-btn" onClick={() => handleDelete(apt.id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                          {apt.status === 'pending' && (
                            <>
                              <button className="btn secondary" style={{marginLeft: 8}} onClick={() => handleStatusChange(apt.id, 'accepted')}>Approve</button>
                              <button className="btn secondary" style={{marginLeft: 8, background: '#e53e3e'}} onClick={() => handleStatusChange(apt.id, 'rejected')}>Reject</button>
                            </>
                          )}
                          {apt.status === 'accepted' && <span style={{marginLeft: 8, color: 'green'}}>Accepted</span>}
                          {apt.status === 'rejected' && <span style={{marginLeft: 8, color: 'red'}}>Rejected</span>}
                          {apt.status === 'completed' && <span style={{marginLeft: 8, color: 'blue'}}>Completed</span>}
                        </>
                      )}
                      {role !== 'admin' && (
                        <>
                          {apt.status === 'pending' && <span style={{marginLeft: 8, color: '#bfa600'}}>Pending</span>}
                          {apt.status === 'accepted' && <span style={{marginLeft: 8, color: 'green'}}>Accepted</span>}
                          {apt.status === 'rejected' && <span style={{marginLeft: 8, color: 'red'}}>Rejected</span>}
                          {apt.status === 'completed' && <span style={{marginLeft: 8, color: 'blue'}}>Completed</span>}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPanel;