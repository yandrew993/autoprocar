import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSignals from './components/TrustSignals';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <TrustSignals />
      <Services />
      <WhyChoose />
      <Booking />
      <Testimonials />
      <Footer />
      <AdminPanel />
    </div>
  );
}

export default App;
