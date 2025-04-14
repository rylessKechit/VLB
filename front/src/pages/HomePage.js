import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-8">
              Je mets à votre disposition des véhicules spacieux et bien entretenus pour vous assurer un trajet serein et sécurisé.
              Disponible 7/7 et 24 h/24, je suis à votre service pour vous transporter vers la destination souhaitée.
            </p>
            <p className="text-lg mb-8">
              Que ce soit pour des trajets de longues distances ou sur mesure, je réponds à toutes vos demandes.
              Vous pouvez aussi me confier vos déplacements vers ou depuis les aéroports et les gares.
            </p>
            <Link
              to="/booking"
              className="bg-yellow-600 text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              RÉSERVER MAINTENANT
            </Link>
          </div>
        </div>
      </section>
      
      <Services />
      
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-yellow-600 mb-8">
              PROFITEZ D'UN TRAJET SÉCURISÉ AVEC TAXI VLB
            </h2>
            <div className="md:flex gap-8 items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <p className="mb-4">
                  Vous êtes à la recherche d'un moyen de transport fiable pour vos déplacements
                  privés ou professionnels ? Je vous apporte une solution sur mesure.
                </p>
                <p className="mb-4">
                  Votre voyage sera réalisé à bord d'une berline qui répond à vos besoins en matière de
                  confort et de sécurité.
                </p>
                <p className="mb-4">
                  Pour les groupes de 7 passagers, je mets à votre disposition un van avec un espace
                  de conférence.
                </p>
                <p className="mb-4">
                  Vous avez aussi la possibilité d'écouter de la musique pour accompagner votre trajet.
                  Pour rendre votre voyage encore plus agréable, je vous propose une sélection
                  rafraîchissante d'eaux.
                </p>
                <div className="mt-8">
                  <Link
                    to="/booking"
                    className="bg-yellow-600 text-black py-2 px-6 rounded-md inline-block font-medium hover:bg-yellow-500 transition-colors"
                  >
                    PLANIFIER VOTRE TRAJET
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/path/to/your/taxi-image.jpg" // Remplacez par le chemin correct
                  alt="Taxi VLB"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">MES PARTENAIRES</h2>
          <p className="mb-8">
            Je travaille en étroite collaboration avec l'Institut d'Optique et l'Université de Paris-Saclay.
          </p>
          <div className="flex justify-center space-x-8">
            <img
              src="" // Remplacez par le chemin correct
              alt="Institut d'Optique"
              className="h-16"
            />
            <img
              src="" // Remplacez par le chemin correct
              alt="Université Paris-Saclay"
              className="h-16"
            />
          </div>
        </div>
      </section>
      
      <Testimonials />
    </>
  );
};

export default HomePage;