import React from 'react';
import './Services.scss';

const Services = () => (
  <section id="services" className="services">
    <div className="container">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🔧</div>
          <h3>Routine Maintenance</h3>
          <ul>
            <li>Oil Changes</li>
            <li>Brake Service</li>
            <li>Tire Rotation</li>
            <li>Fluid Flushes</li>
            <li>Filter Replacements</li>
          </ul>
        </div>
        <div className="service-card">
          <div className="service-icon">🚨</div>
          <h3>Common Repairs</h3>
          <ul>
            <li>Check Engine Light</li>
            <li>Transmission</li>
            <li>A/C & Heating</li>
            <li>Electrical Systems</li>
            <li>Suspension</li>
          </ul>
        </div>
        <div className="service-card">
          <div className="service-icon">⚡</div>
          <h3>Specialized Services</h3>
          <ul>
            <li>Engine Diagnostics</li>
            <li>Performance Upgrades</li>
            <li>Hybrid Services</li>
            <li>Fleet Maintenance</li>
            <li>Custom Installations</li>
          </ul>
        </div>
        <div className="service-card">
          <div className="service-icon">🔹</div>
          <h3>Other Services</h3>
          <ul>
            <li>Car Identity</li>
            <li>Reverting</li>
            <li>Car Tinting</li>
            <li>Tracker</li>
            <li>Car Painting</li>
            <li>Stone Chip Spraying</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
