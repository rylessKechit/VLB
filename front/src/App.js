import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AirportTransferPage from './pages/AirportTransferPage';
import LongDistancePage from './pages/LongDistancePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

import './styles/global.css';
import './styles/booking-components.css';
import './styles/structure-components.css';
import './styles/pages.css';
import './styles/responsive.css';

import './animations.js'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services-aeroport-gare" element={<AirportTransferPage />} />
            <Route path="/services-longue-distance" element={<LongDistancePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;