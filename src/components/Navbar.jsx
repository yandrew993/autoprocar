import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import UserAuth from './UserAuth';
import UserAppointments from './UserAppointments';

const API_BASE = 'https://backend.autoprocar.com';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Sticky navigation
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 54, 93, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.style.background = '#1a365d';
        navbar.style.backdropFilter = 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/Logo-preview.png" alt="AutoPro Car Logo" style={{height: '80px', verticalAlign: 'middle', marginRight: '0px'}} />
            <h2>Auto<span>Pro</span> Car</h2>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" tabIndex={0} role="button">
            <span style={{transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
            <span style={{opacity: menuOpen ? 0 : 1}}></span>
            <span style={{transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'}}></span>
          </div>
          <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/myappointments" onClick={() => setMenuOpen(false)}>My Appointments</Link></li>
          </ul>
          <div className="nav-cta">
            <Link to="/book" className="cta-button book-btn">Book Appointment</Link>
          </div>
        </div>
      </nav>
      {userModal && (
        userLoggedIn ?
          <UserAppointments onLogout={() => { setUserLoggedIn(false); setUserModal(false); fetch(`${API_BASE}/logout.php`, { credentials: 'include' }); }} /> :
          <UserAuth onAuth={() => { setUserLoggedIn(true); setUserModal(false); }} />
      )}
    </header>
  );
};

export default Navbar;
