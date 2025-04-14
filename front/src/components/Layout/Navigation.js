import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ mobileMenuOpen }) => {
  // Navigation items
  const navItems = [
    { path: '/', label: 'ACCUEIL' },
    { path: '/airport-transfers', label: 'TRAJETS AÉROPORT / GARE' },
    { path: '/long-distance', label: 'TRAJETS LONGUES DISTANCES' },
    { path: '/custom-trips', label: 'TRAJETS SUR MESURE' },
    { path: '/vip', label: 'PRESTATION VIP' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block bg-yellow-600 mt-3`}>
      <div className="container mx-auto">
        <ul className="flex flex-col md:flex-row md:justify-between">
          {navItems.map((item, index) => (
            <li key={index} className="text-center">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block py-3 px-4 text-black font-medium hover:bg-yellow-700 transition-colors ${
                    isActive ? 'bg-yellow-700' : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;