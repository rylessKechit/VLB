import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
//import logo from '../../assets/images/luxury-logo.png'; // Nouveau logo à créer
import '../../styles/components/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  const headerRef = useRef(null);

  // Gestionnaire de défilement avec hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      
      // Détermine si l'utilisateur a défilé vers le haut ou vers le bas
      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      // Visibility logic - hide header when scrolling down, show when scrolling up
      if (currentScrollPos > 100) {
        setVisible(!isScrollingDown);
        setScrolled(true);
      } else {
        setVisible(true);
        setScrolled(currentScrollPos > 30);
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove('no-scroll');
  }, [location]);

  // Classe pour l'animation d'apparition/disparition du header
  const headerClasses = `header ${scrolled ? 'scrolled' : ''} ${visible ? 'visible' : 'hidden'}`;

  // Fonction pour inverser l'état du menu
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Empêcher le défilement du body quand le menu est ouvert
    if (!mobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  return (
    <header ref={headerRef} className={headerClasses}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src="" alt="Luxury Transport" className="logo" />
          </Link>
        </div>

        <div className="header-right">
          <div className="contact-buttons">
            <Link to="/contact" className="contact-btn" data-tooltip="Appelez-nous">
              <i className="fas fa-phone"></i>
              <span>Réservation téléphonique</span>
            </Link>
            
            <Link to="/#booking" className="contact-btn primary" data-tooltip="Réservation en ligne">
              <i className="fas fa-calendar-alt"></i>
              <span>Réserver maintenant</span>
            </Link>
          </div>
          
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu principal"
            aria-expanded={mobileMenuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
      
      <Navbar mobileMenuOpen={mobileMenuOpen} />
    </header>
  );
};

export default Header;