import React from 'react';
import { Link } from 'react-router-dom';

// Import des images - assurez-vous d'avoir ces fichiers dans votre projet
import airportImage from '../../assets/images/airport-transfer.jpg';
import longDistanceImage from '../../assets/images/long-distance.jpg';
import customTripsImage from '../../assets/images/custom-trips.jpg';
import vipServiceImage from '../../assets/images/vip-service.jpg';

const ServiceCard = ({ title, image, path, children }) => {
  return (
    <div className="relative group overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{children}</p>
        <Link 
          to={path}
          className="inline-block bg-yellow-600 text-black py-2 px-4 rounded text-sm font-medium hover:bg-yellow-500 transition-colors"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">NOS SERVICES DE TRANSPORT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            title="TRAJETS AÉROPORT / GARE" 
            image={airportImage} 
            path="/airport-transfers"
          >
            Transferts vers tous les aéroports et gares, avec suivi des vols et attente en cas de retard.
          </ServiceCard>
          
          <ServiceCard 
            title="TRAJETS LONGUES DISTANCES" 
            image={longDistanceImage} 
            path="/long-distance"
          >
            Déplacements interurbains confortables et sécurisés, quelle que soit la distance à parcourir.
          </ServiceCard>
          
          <ServiceCard 
            title="TRAJETS SUR MESURE" 
            image={customTripsImage} 
            path="/custom-trips"
          >
            Services personnalisés pour vos besoins spécifiques, adaptés à vos horaires et préférences.
          </ServiceCard>
          
          <ServiceCard 
            title="PRESTATION VIP" 
            image={vipServiceImage} 
            path="/vip"
          >
            Service haut de gamme avec véhicules premium et prestations supplémentaires pour une expérience de luxe.
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default Services;