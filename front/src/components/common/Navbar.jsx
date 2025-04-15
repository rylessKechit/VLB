import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/Navbar.css';

const Navbar = ({ mobileMenuOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const navLinks = [
    { path: '/', label: 'Accueil', exact: true },
    {
      label: 'Nos Services',
      isDropdown: true,
      items: [
        { path: '/services-longue-distance', label: 'Voyages Longue Distance' },
        { path: '/services-aeroport-gare', label: 'Transports Aéroport - Gare' }
      ]
    },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li 
              key={index} 
              className={link.isDropdown ? `nav-dropdown ${openDropdown === index ? 'open' : ''}` : ''}
            >
              {link.isDropdown ? (
                <>
                  <span 
                    className="dropdown-toggle" 
                    onClick={() => toggleDropdown(index)}
                  >
                    {link.label}
                    <i className={`fas fa-chevron-down ${openDropdown === index ? 'rotate' : ''}`}></i>
                  </span>
                  <div className="nav-dropdown-content">
                    {link.items.map((item, itemIndex) => (
                      <NavLink 
                        key={itemIndex}
                        to={item.path} 
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setOpenDropdown(null)} // Ferme le menu après clic sur mobile
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={link.exact}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;