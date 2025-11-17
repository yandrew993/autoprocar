import React, { useEffect, useState } from 'react';
import './Navbar.scss';
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
    // Smooth scrolling
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false); // close menu on click
      }
    };
    anchors.forEach(anchor => anchor.addEventListener('click', handleClick));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchors.forEach(anchor => anchor.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src="/logo.png" alt="AutoCare Pro Logo" style={{height: '40px', verticalAlign: 'middle', marginRight: '10px'}} />
            <h2>Auto<span>Care</span> Pro</h2>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" tabIndex={0} role="button">
            <span style={{transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'}}></span>
            <span style={{opacity: menuOpen ? 0 : 1}}></span>
            <span style={{transform: menuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'}}></span>
          </div>
          <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#booking" className="cta-button">Book Appointment</a>
            <button className="cta-button" onClick={() => setUserModal(true)} style={{marginLeft: 10}}>
              {userLoggedIn ? 'My Appointments' : 'User Login'}
            </button>
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
