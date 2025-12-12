import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Footer.scss';

const Footer = () => (
  <footer id="contact">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p><i className="fas fa-phone"></i> 0722680547</p>
          <p><i className="fas fa-envelope"></i> autoprocar6@gmail.com</p>
          <p><i className="fas fa-map-marker-alt"></i> A long the Northern bypass</p>
          <div className="social-media">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://web.facebook.com/profile.php?id=61585060049039" className="social-icon facebook" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/autopro_car" className="social-icon twitter" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="social-icon instagram" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@autopro.car" className="social-icon tiktok" target="_blank" rel="noopener noreferrer" title="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://wa.me/254722680547" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.youtube.com/@cryptozone-w9e" className="social-icon youtube" target="_blank" rel="noopener noreferrer" title="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h3>Business Hours</h3>
          <p>Monday - Friday: 7:30 AM - 6:00 PM</p>
          <p>Saturday: 8:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#booking">Book Appointment</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 AutoCare Pro. All rights reserved....Jp.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
