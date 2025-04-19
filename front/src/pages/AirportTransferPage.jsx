import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';
import airportTransferHero from '../assets/images/airport-transfer-hero.jpg';

// Animation utility hook
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

const AirportTransferPage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [destinationsRef, destinationsVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Aéroports desservis
  const airports = [
    { name: 'Paris Charles de Gaulle (CDG)', distance: '25 km', time: '30 min', services: ['Terminal 1', 'Terminal 2', 'Terminal 3'] },
    { name: 'Paris Orly (ORY)', distance: '18 km', time: '25 min', services: ['Orly Sud', 'Orly Ouest'] },
    { name: 'Paris Le Bourget', distance: '20 km', time: '28 min', services: ['Aviation privée'] },
    { name: 'Aéroport de Beauvais-Tillé', distance: '85 km', time: '75 min', services: ['Terminal unique'] }
  ];

  // Gares desservies
  const stations = [
    { name: 'Gare du Nord', services: ['Eurostar', 'Thalys', 'TGV Nord'] },
    { name: 'Gare de Lyon', services: ['TGV Sud-Est', 'Lyria', 'TGV Méditerranée'] },
    { name: 'Gare Montparnasse', services: ['TGV Atlantique', 'TGV Ouest', 'TGV Sud-Ouest'] },
    { name: 'Gare de l\'Est', services: ['TGV Est', 'ICE Allemagne', 'TGV Suisse'] }
  ];

  // Services proposés
  const transferServices = [
    {
      title: 'Accueil personnalisé',
      description: 'Votre chauffeur vous attend en zone d\'arrivée avec votre nom',
      icon: 'id-card'
    },
    {
      title: 'Suivi des vols',
      description: 'Monitoring des horaires de vol et adaptation en cas de retard',
      icon: 'plane-arrival'
    },
    {
      title: 'Assistance bagages',
      description: 'Prise en charge complète de vos bagages',
      icon: 'luggage-cart'
    },
    {
      title: 'Accès prioritaire',
      description: 'Dépose au plus près des terminaux et gares',
      icon: 'ticket-alt'
    },
    {
      title: 'Confort premium',
      description: 'Véhicules haut de gamme avec équipements luxueux',
      icon: 'glass-martini-alt'
    },
    {
      title: 'Service 24/7',
      description: 'Disponibilité permanente, jour et nuit, 7j/7',
      icon: 'clock'
    }
  ];

  return (
    <div className="service-page airport-transfer-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: `url(${airportTransferHero})` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">TRANSFERTS AÉROPORT & GARE</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-plane"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Commencez et terminez vos voyages dans le confort et la sérénité</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>UN SERVICE DE TRANSFERT D'EXCEPTION</h2>
              <p className="subtitle">La garantie d'arriver à destination dans des conditions optimales</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de transfert aéroport et gare transforme les moments souvent stressants 
                de début et de fin de voyage en une expérience agréable et sereine. Nous prenons en charge 
                tous les aspects logistiques pour vous permettre de vous concentrer uniquement sur 
                votre voyage.
              </p>
              <p>
                Que vous arriviez d'un long vol ou que vous ayez un train à prendre, notre priorité est 
                de vous offrir un service ponctuel, confortable et personnalisé qui s'adapte parfaitement 
                à vos besoins spécifiques.
              </p>
            </div>
            
            <div className="service-highlights">
              <div className="highlights-grid">
                {transferServices.map((service, index) => (
                  <div 
                    key={index} 
                    className={`highlight-item ${overviewVisible ? 'visible' : ''}`}
                    style={{animationDelay: `${0.1 * index}s`}}
                  >
                    <div className="highlight-icon">
                      <i className={`fas fa-${service.icon}`}></i>
                    </div>
                    <div className="highlight-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={destinationsRef} className={`destinations-section ${destinationsVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">AÉROPORTS ET GARES DESSERVIS</h2>
          <p className="subtitle fade-in">Une couverture complète pour tous vos besoins de transfert</p>
          
          <div className="destinations-tabs">
            <div className="tabs-header">
              <button className="tab-button active">
                <i className="fas fa-plane"></i>
                Aéroports
              </button>
              <button className="tab-button">
                <i className="fas fa-train"></i>
                Gares
              </button>
            </div>
            
            <div className="tabs-content">
              <div className="tab-panel active">
                <div className="airports-grid">
                  {airports.map((airport, index) => (
                    <div 
                      key={index} 
                      className={`airport-card ${destinationsVisible ? 'visible' : ''}`}
                      style={{animationDelay: `${0.2 * index}s`}}
                    >
                      <div className="airport-icon">
                        <i className="fas fa-plane"></i>
                      </div>
                      <h3>{airport.name}</h3>
                      <div className="airport-details">
                        <div className="detail-item">
                          <i className="fas fa-road"></i>
                          <span>Distance: {airport.distance}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-clock"></i>
                          <span>Temps moyen: {airport.time}</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-terminal"></i>
                          <span>Terminaux: {airport.services.join(', ')}</span>
                        </div>
                      </div>
                      <Link to="/contact" className="airport-cta">
                        Réserver un transfert
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="tab-panel">
                <div className="stations-grid">
                  {stations.map((station, index) => (
                    <div 
                      key={index} 
                      className="station-card"
                    >
                      <div className="station-icon">
                        <i className="fas fa-train"></i>
                      </div>
                      <h3>{station.name}</h3>
                      <div className="station-details">
                        <div className="detail-item">
                          <i className="fas fa-subway"></i>
                          <span>Services: {station.services.join(', ')}</span>
                        </div>
                      </div>
                      <Link to="/contact" className="station-cta">
                        Réserver un transfert
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="process-section">
        <div className="container">
          <h2>COMMENT ÇA FONCTIONNE</h2>
          <p className="subtitle">Un processus simple pour un service impeccable</p>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Réservation</h3>
                <p>Réservez en ligne, par téléphone ou par email en précisant vos informations de vol ou de train</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Confirmation</h3>
                <p>Recevez une confirmation détaillée avec toutes les informations sur votre transfert</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Suivi</h3>
                <p>Notre équipe surveille votre vol/train et ajuste le service en cas de modifications</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Accueil</h3>
                <p>Votre chauffeur vous attend avec une pancarte à votre nom à l'arrivée</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Transfert</h3>
                <p>Profitez d'un trajet confortable dans un véhicule premium jusqu'à votre destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="client-testimonial">
        <div className="container">
          <div className="section-heading">
            <h2>TÉMOIGNAGES DE NOS CLIENTS</h2>
            <p className="subtitle">Ce que disent nos voyageurs sur nos services de transfert aéroport</p>
          </div>
          
          <div className="testimonial-content">
            <div className="testimonial-quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "Un service exceptionnel qui a transformé mon expérience de voyage. Mon vol a été retardé de 2 heures,
              mais le chauffeur était là à m'attendre à mon arrivée avec un grand sourire. Le véhicule était impeccable,
              avec de l'eau fraîche et des serviettes rafraîchissantes. Après un long vol, c'était exactement ce dont
              j'avais besoin. Je recommande vivement ce service à tous les voyageurs exigeants."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Sophie M.</div>
              <div className="author-title">Voyageuse fréquente</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE TRANSFERT</h2>
            <p className="subtitle">Commencez et terminez votre voyage en toute sérénité</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'un service spécial pour votre transfert ?</h3>
            <p>Notre équipe est à votre disposition pour répondre à toutes vos exigences</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demande personnalisée
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransferPage;