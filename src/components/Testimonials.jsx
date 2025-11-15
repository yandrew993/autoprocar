import React from 'react';
import './Testimonials.scss';

const Testimonials = () => (
  <section id="testimonials" className="testimonials">
    <div className="container">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial">
          <p>They fixed my transmission issue in one day and saved me thousands compared to the dealer. The team was professional and kept me updated throughout the process. Highly recommended!</p>
          <div className="customer">- Dr Veronicah A.</div>
        </div>
        <div className="testimonial">
          <p>Honest service and fair pricing. They explained everything clearly and didn't push unnecessary repairs. I've been taking my cars here for years and never been disappointed.</p>
          <div className="customer">- Omondi M.</div>
        </div>
        <div className="testimonial">
          <p>The team at AutoCare Pro has been maintaining our company fleet for years. Their reliable and professional service has minimized our vehicle downtime significantly.</p>
          <div className="customer">- Business Solutions Inc.</div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
