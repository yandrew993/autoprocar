import React, { useEffect, useState } from 'react';
const API_BASE = 'https://autoprocar.com/backend';

export default function UserAppointments({ onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/get_appointments.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => { setAppointments(data); setLoading(false); });
  }, []);

  return (
    <div className="user-appts-modal">
      <div className="user-appts-header">
        <h2>Your Appointments</h2>
        <button className="btn secondary" onClick={onLogout}>Logout</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>No appointments found.</td></tr>
            ) : appointments.map(apt => (
              <tr key={apt.id}>
                <td>{apt.date}</td>
                <td>{apt.service}</td>
                <td>{apt.vehicle}</td>
                <td>{apt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
