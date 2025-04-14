import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AirportTransfersPage from './pages/AirportTransfersPage';
import LongDistancePage from './pages/LongDistancePage';
import CustomTripsPage from './pages/CustomTripsPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/airport-transfers" element={<AirportTransfersPage />} />
                <Route path="/long-distance" element={<LongDistancePage />} />
                <Route path="/custom-trips" element={<CustomTripsPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;