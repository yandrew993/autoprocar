import React from 'react';
import './WhyChoose.scss';

const WhyChoose = () => (
  <section className="why-choose">
    <div className="container">
      <h3 className="section-title">Why Choose AutoCare Pro?</h3>
      <div className="features-grid">
        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <h3>1-Week Warranty</h3>
          <p>Some repairs come with our comprehensive warranty for your peace of mind</p>
        </div>
        <div className="feature">
          <div className="feature-icon">👨‍🔧</div>
          <h3>Tradetest Certified Technicians</h3>
          <p>Our experts are certified and experienced with all vehicle makes and models</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Transparent Pricing</h3>
          <p>No hidden fees or surprises - we provide detailed estimates upfront</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚙</div>
          <h3>Free Loaner Cars</h3>
          <p>Available for major repair services so you're never without transportation</p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChoose;
