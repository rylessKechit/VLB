import React from 'react';
import { Link } from 'react-router-dom';
import airportImage from '../assets/images/airport-transfer.jpg'; // Assurez-vous d'avoir cette image

const AirportTransfersPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center"
        style={{ 
          backgroundImage: `url(${airportImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">TRAJETS VERS OU DEPUIS L'AÉROPORT</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Service de taxi fiable et ponctuel pour tous vos transferts aéroport
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              TAXI VLB, POUR VOS TRAJETS VERS OÙ DEPUIS LES GARES ET LES AÉROPORTS
            </h2>
            
            <p className="mb-6">
              Taxi VLB est votre partenaire de confiance pour assurer un service de transport sûr et professionnel.
              Je suis disponible pour vous transporter vers ou depuis les gares et les aéroports.
            </p>
            
            <p className="mb-10">
              Je suis à votre service pour vous assurer un voyage confortable et sans stress, que vous soyez en partance pour une destination exotique ou que vous reveniez d'un voyage d'affaires.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src="/path/to/airport-image.jpg" // Remplacez par le chemin correct
                    alt="Transfert aéroport" 
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-600">
                  TRAJETS VERS OÙ DEPUIS L'AÉROPORT
                </h3>
                <p className="mb-4">
                  Je m'engage à vous fournir un service ponctuel et fiable pour vous conduire vers l'aéroport en toute tranquillité d'esprit.
                </p>
                <p className="mb-4">
                  Que vous voyagiez seul, en famille ou en groupe, je suis à votre service pour m'assurer que votre trajet soit agréable et sans tracas.
                </p>
                <p>
                  De plus, à votre retour, je serai là pour vous accueillir à l'aéroport et vous ramener chez vous en toute sécurité.
                </p>
              </div>
              
              <div>
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src="/path/to/train-station-image.jpg" // Remplacez par le chemin correct
                    alt="Transfert gare" 
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-xl font-bold mb-4 text-yellow-600">
                  TRANSFERT VERS LES GARES TGV
                </h3>
                <p className="mb-4">
                  Avec mon service de taxi, je vous garantis une prise en charge rapide et efficace pour vous conduire à la gare à temps pour votre train.
                </p>
                <p className="mb-4">
                  Vous pouvez compter sur moi pour vous offrir un service courtois et professionnel, que ce soit pour un voyage d'affaires ou des vacances en famille.
                </p>
                <p>
                  De plus, si vous arrivez en train, je serai disponible pour vous accueillir à la gare et vous ramener à votre destination finale.
                </p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">
                N'hésitez pas à me contacter pour réserver votre trajet de longue distance ou sur mesure.
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/booking" 
                  className="bg-yellow-600 text-white py-3 px-8 rounded-md font-medium hover:bg-yellow-500 transition-colors"
                >
                  Réserver maintenant
                </Link>
                <Link 
                  to="/contact" 
                  className="border border-yellow-600 text-yellow-600 py-3 px-8 rounded-md font-medium hover:bg-yellow-50 transition-colors"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Advantages */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            POURQUOI CHOISIR TAXI VLB POUR VOS TRANSFERTS AÉROPORT ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Ponctualité garantie</h3>
              <p className="text-center">
                Votre temps est précieux. Je m'assure d'être toujours à l'heure pour que vous n'ayez jamais à vous inquiéter de manquer votre vol.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Sécurité et confort</h3>
              <p className="text-center">
                Voyagez dans un véhicule bien entretenu et parfaitement équipé pour vous assurer un trajet sûr et confortable vers l'aéroport.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Suivi des vols</h3>
              <p className="text-center">
                Je surveille l'état de votre vol pour m'adapter aux retards éventuels et être présent à votre arrivée, peu importe l'heure.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Airports Served */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            AÉROPORTS ET GARES DESSERVIS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4">Aéroports</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aéroport Paris-Charles de Gaulle (CDG)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aéroport Paris-Orly (ORY)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aéroport Paris-Beauvais (BVA)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aéroport Paris-Le Bourget</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Gares</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare de Paris-Nord</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare de Paris-Est</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare de Lyon</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare Montparnasse</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare Saint-Lazare</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gare d'Austerlitz</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/booking?service=airport" 
              className="bg-yellow-600 text-white py-3 px-8 rounded-md font-medium hover:bg-yellow-500 transition-colors inline-block"
            >
              Réserver un transfert aéroport
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirportTransfersPage;