import React, { useState, useEffect } from 'react';
import './Booking.scss';

const API_BASE = 'https://autoprocar.com/backend';

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: '',
    date: getTomorrow(),
    description: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Set min date for booking
    document.getElementById('date').min = new Date().toISOString().split('T')[0];
    setForm((f) => ({ ...f, date: getTomorrow() }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, vehicle, service, date } = form;
    if (!name || !phone || !vehicle || !service || !date) {
      alert('Please fill in all required fields.');
      return;
    }
    // Send to backend
    const res = await fetch(`${API_BASE}/book_appointment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        vehicle: form.vehicle,
        service: form.service,
        date: form.date,
        description: form.description,
      }),
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      setSuccess(true);
      setForm({
        name: '',
        phone: '',
        email: '',
        vehicle: '',
        service: '',
        date: getTomorrow(),
        description: '',
      });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      alert(data.error || 'Failed to book appointment.');
    }
  };

  return (
    <section id="booking" className="booking">
      <div className="container">
        <h2 className="section-title">Book Your Appointment</h2>
        <form className="booking-form" id="bookingForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input type="text" id="name" required placeholder="Enter your full name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" required placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle">Vehicle Information *</label>
            <select id="vehicle" required value={form.vehicle} onChange={handleChange}>
              <option value="">Select Make</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes</option>
              <option value="volvo">Volvo</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="service">Service Needed *</label>
            <select id="service" required value={form.service} onChange={handleChange}>
              <option value="">Select Service</option>
              <option value="oil">Oil Change</option>
              <option value="brakes">Brake Service</option>
              <option value="tires">Tire Rotation</option>
              <option value="ac">A/C Repair</option>
              <option value="engine">Engine Diagnostics</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input type="date" id="date" required value={form.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Problem Description</label>
            <textarea id="description" placeholder="Describe the issue you're experiencing..." value={form.description} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn primary" style={{width: '100%'}}>Request Appointment</button>
        </form>
        {success && (
          <div className="success-message" id="successMessage">
            <i className="fas fa-check-circle"></i> Appointment booked successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
