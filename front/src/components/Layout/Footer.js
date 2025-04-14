import React from 'react';
import { Link } from 'react-router-dom';
//import logo from '../../assets/images/logo.svg'; // Assurez-vous d'avoir ce fichier

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <img alt="Taxi VLB" className="h-24 w-24" />
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center mb-6 md:mb-0">
            <div className="flex flex-col items-center mx-4">
              <Link to="/me-trouver" className="flex items-center py-2 hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>ME TROUVER</span>
              </Link>
            </div>
            <div className="flex flex-col items-center mx-4">
              <Link to="/contact" className="flex items-center py-2 hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>M'APPELER</span>
              </Link>
            </div>
            <div className="flex flex-col items-center mx-4">
              <Link to="/contact" className="flex items-center py-2 hover:text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ME CONTACTER</span>
              </Link>
            </div>
          </div>

          {/* Contact button */}
          <div className="mb-6 md:mb-0">
            <Link to="/booking" className="bg-yellow-600 text-black py-3 px-6 rounded-full hover:bg-yellow-500 transition-colors">
              RÉSERVEZ VOTRE COURSE
            </Link>
          </div>
        </div>

        {/* Legal section */}
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <Link to="/legislation" className="hover:text-yellow-500 mr-4">LÉGISLATION & RGPD</Link>
              <span>© 2025 GUTTIN PIERRE LANCELOT</span>
            </div>
            <div>
              <Link to="/admin" className="hover:text-yellow-500 mr-4">METTRE À JOUR MON SITE INTERNET</Link>
              <span>CRÉÉ PAR LOCAL.FR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;