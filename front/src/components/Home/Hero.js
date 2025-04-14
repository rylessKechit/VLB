import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-taxi.jpg'; // Assurez-vous d'avoir cette image

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-center bg-cover z-0" 
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          ENTREPRISE DE TAXI À VERRIÈRES-LE-BUISSON
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-semibold mb-8">
          TAXI VLB, POUR TOUS VOS TRAJETS PROFESSIONNELS ET PRIVÉS
        </h2>
        
        <p className="text-lg md:text-xl max-w-3xl mb-10">
          Taxi VLB est une entreprise de taxi basée à Verrières le Buisson.
          J'interviens auprès des particuliers, des professionnels pour leur assurer une expérience de conduite fluide et sûre.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/booking" 
            className="bg-yellow-600 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            RÉSERVER UNE COURSE
          </Link>
          <Link 
            to="/contact" 
            className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-colors"
          >
            NOUS CONTACTER
          </Link>
        </div>
      </div>
      
      {/* Flèche vers le bas */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;