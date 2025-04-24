import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Adjust the path as necessary

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Taxi VLB Logo" />
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
          &copy; {currentYear} TAXI VLB
        </div>
      </div>
    </footer>
  );
};

export default Footer;