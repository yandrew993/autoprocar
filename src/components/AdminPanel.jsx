import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';

// API helpers
const API_BASE = 'https://autoprocar.com/backend'; // Update to your actual backend URL

async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/login.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  return res.json();
}

async function adminLogout() {
  await fetch(`${API_BASE}/logout.php`, { credentials: 'include' });
}

async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/get_appointments.php?all=1`, { credentials: 'include' });
  return res.json();
}

async function deleteAppointment(id) {
  await fetch(`${API_BASE}/delete_appointment.php?id=${id}`, { credentials: 'include' });
}

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [appointments, setAppointmentsState] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments().then(setAppointmentsState);
    }
  }, [isLoggedIn, showModal]);

  const handleLogin = async () => {
    const result = await adminLogin(username, password);
    if (result.success && result.role === 'admin') {
      setIsLoggedIn(true);
      setLoginError(false);
      setUsername('');
      setPassword('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError(false);
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setAppointmentsState(await fetchAppointments());
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`${API_BASE}/update_appointment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
      credentials: 'include',
    });
    setAppointmentsState(await fetchAppointments());
  };

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
              <h2>{isLoggedIn ? 'Appointment Management' : 'Staff Login'}</h2>
              <button className="close-admin" onClick={() => setShowModal(false)}>Close</button>
            </div>
            {!isLoggedIn ? (
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
                  <div className="contact-admin">
                    <p>Need access? Contact the manager.</p>
                  </div>
                </div>
              </div>
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
                  <button className="btn primary" onClick={async () => setAppointmentsState(await fetchAppointments())}>Refresh</button>
                  {/* Clear All functionality would require a backend endpoint for batch delete */}
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
                            {apt.status === 'pending' && (
                              <>
                                <button className="btn secondary" style={{marginLeft: 8}} onClick={() => handleStatusChange(apt.id, 'accepted')}>Accept</button>
                                <button className="btn secondary" style={{marginLeft: 8, background: '#e53e3e'}} onClick={() => handleStatusChange(apt.id, 'rejected')}>Reject</button>
                              </>
                            )}
                            {apt.status === 'accepted' && <span style={{marginLeft: 8, color: 'green'}}>Accepted</span>}
                            {apt.status === 'rejected' && <span style={{marginLeft: 8, color: 'red'}}>Rejected</span>}
                            {apt.status === 'completed' && <span style={{marginLeft: 8, color: 'blue'}}>Completed</span>}
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
