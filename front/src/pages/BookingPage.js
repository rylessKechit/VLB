import React from 'react';
import BookingForm from '../components/Booking/BookingForm';

const BookingPage = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Réservez votre trajet</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Comment ça marche ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">1. Entrez vos adresses</h3>
                <p className="text-gray-600 text-sm">Indiquez votre point de départ et d'arrivée ainsi que la date et l'heure souhaitées.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">2. Obtenez un tarif</h3>
                <p className="text-gray-600 text-sm">Recevez instantanément une estimation de prix pour votre trajet.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">3. Confirmez la réservation</h3>
                <p className="text-gray-600 text-sm">Entrez vos coordonnées et confirmez votre réservation en toute sécurité.</p>
              </div>
            </div>
          </div>
          
          <BookingForm />
          
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pourquoi choisir Taxi VLB ?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p><strong>Tarifs transparents</strong> - Pas de frais cachés, vous connaissez le prix à l'avance.</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p><strong>Chauffeurs professionnels</strong> - Tous nos chauffeurs sont formés et expérimentés.</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p><strong>Disponibilité 24h/24</strong> - Service de taxi disponible à tout moment, tous les jours de la semaine.</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p><strong>Véhicules confortables</strong> - Flotte de véhicules récents et bien entretenus pour votre confort.</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p><strong>Service personnalisé</strong> - Nous nous adaptons à vos besoins spécifiques pour vous offrir un service sur mesure.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;