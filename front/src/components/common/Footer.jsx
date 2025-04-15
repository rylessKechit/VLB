import { Link } from 'react-router-dom';
import '../../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="Taxi VLB Logo" />
          </Link>
        </div>
        
        <div className="footer-links">
          <div className="footer-link-group">
            <Link to="/" className="footer-icon-link">
              <i className="fas fa-map-marker-alt"></i>
              <span>ME TROUVER</span>
            </Link>
          </div>
          
          <div className="footer-link-group">
            <Link to="/" className="footer-icon-link">
              <i className="fas fa-phone"></i>
              <span>M'APPELER</span>
            </Link>
          </div>
          
          <div className="footer-link-group">
            <Link to="/contact" className="footer-icon-link">
              <i className="fas fa-envelope"></i>
              <span>ME CONTACTER</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-legal">
          <Link to="/legals">LÉGISLATION & RGPD</Link>
        </div>
        
        <div className="footer-copyright">
          &copy; {currentYear} GUTTIN PIERRE LANCELOT
        </div>
        
        <div className="footer-admin">
          <a href="/admin">METTRE À JOUR MON SITE INTERNET</a>
        </div>
        
        <div className="footer-credits">
          <span>CRÉÉ PAR <a href="https://example.com" target="_blank" rel="noopener noreferrer">VOTRE AGENCE</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;