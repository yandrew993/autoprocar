import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSignals from './components/TrustSignals';
//import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
//import Booking from './components/Booking';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import './App.scss';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <TrustSignals />
            <WhyChoose />
            <Testimonials />
          </>
        } />
        <Route path="/myappointments" element={<MyAppointmentsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book" element={<BookingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
