import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import AuthContext from '../../context/AuthContext';
//import logo from '../../assets/images/logo.svg'; // Assurez-vous d'avoir ce fichier

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo et liens de gauche */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img alt="Taxi VLB" className="h-16 w-16" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/me-trouver" className="flex flex-col items-center hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs">ME TROUVER</span>
              </Link>
              <Link to="/contact" className="flex flex-col items-center hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs">M'APPELER</span>
              </Link>
            </div>
          </div>

          {/* Logo central - visible uniquement sur les écrans larges */}
          <div className="hidden md:block">
            <Link to="/" className="text-2xl font-bold">
              <div className="rounded-full border-2 border-yellow-500 p-2">
                <span className="text-3xl">VLB</span>
              </div>
            </Link>
          </div>

          {/* Bouton de réservation à droite */}
          <div className="hidden md:block">
            <Link 
              to="/booking" 
              className="bg-white text-black py-2 px-4 rounded-full flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>RÉSERVEZ VOTRE COURSE</span>
            </Link>
            <div className="text-xs text-center mt-1">
              RÉSERVEZ VOTRE CHAUFFEUR TAXI À VERRIÈRES LE BUISSON EN 3 CLICS !
            </div>
          </div>

          {/* Bouton menu hamburger pour mobile */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Barre de navigation principale */}
        <Navigation mobileMenuOpen={mobileMenuOpen} />
        
        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link to="/me-trouver" className="flex items-center space-x-2 hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>ME TROUVER</span>
              </Link>
              <Link to="/contact" className="flex items-center space-x-2 hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>M'APPELER</span>
              </Link>
              <Link to="/booking" className="flex items-center space-x-2 bg-yellow-500 text-black py-2 px-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>RÉSERVEZ VOTRE COURSE</span>
              </Link>
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="text-left hover:text-yellow-500"
                >
                  Se déconnecter
                </button>
              ) : (
                <Link to="/login" className="hover:text-yellow-500">
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;