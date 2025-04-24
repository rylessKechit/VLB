import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import longDistanceHighway from '../assets/images/long-distance-highway.jpg';

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

const LongDistancePage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // Destinations populaires
  const destinations = [
    { name: 'Paris → Lyon', distance: '465 km', time: '4h30', estimatedPrice: '650€ - 750€' },
    { name: 'Paris → Bordeaux', distance: '585 km', time: '5h45', estimatedPrice: '750€ - 850€' },
    { name: 'Paris → Marseille', distance: '775 km', time: '7h30', estimatedPrice: '950€ - 1050€' },
    { name: 'Paris → Bruxelles', distance: '315 km', time: '3h15', estimatedPrice: '480€ - 580€' },
    { name: 'Paris → Amsterdam', distance: '505 km', time: '5h00', estimatedPrice: '690€ - 790€' },
    { name: 'Paris → Londres', distance: '455 km', time: '5h30', estimatedPrice: '800€ - 900€' }
  ];

  return (
    <div className="service-page long-distance-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: `url(${longDistanceHighway})` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">TRAJETS LONGUE DISTANCE</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-road"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Service de taxi confortable pour vos trajets interurbains</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>VOYAGEZ À TRAVERS LA FRANCE EN TOUTE SÉRÉNITÉ</h2>
              <p className="subtitle">Des trajets longue distance adaptés à tous vos besoins</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de taxi longue distance vous offre une solution pratique et 
                confortable pour vos déplacements entre les villes. Plus besoin de vous soucier 
                des correspondances ou des horaires rigides des transports en commun.
              </p>
              <p>
                Que ce soit pour des déplacements professionnels, familiaux ou touristiques, 
                notre Mercedes Classe V et nos chauffeurs expérimentés vous assurent un voyage 
                agréable et sans stress jusqu'à votre destination.
              </p>
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="feature-content">
                  <h3>Horaires flexibles</h3>
                  <p>Départ à l'heure qui vous convient, sans contrainte d'horaire imposé.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-couch"></i>
                </div>
                <div className="feature-content">
                  <h3>Confort assuré</h3>
                  <p>Véhicule spacieux et bien équipé pour vous garantir un voyage agréable, même sur de longues distances.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-plug"></i>
                </div>
                <div className="feature-content">
                  <h3>Services à bord</h3>
                  <p>WiFi gratuit et prises de recharge pour rester connecté durant votre trajet.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Arrêts possibles</h3>
                  <p>Possibilité de faire des pauses ou des arrêts intermédiaires selon vos besoins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="destinations-section">
        <div className="container">
          <h2>DESTINATIONS POPULAIRES</h2>
          <p className="subtitle">Nos trajets les plus fréquents avec estimation de tarifs</p>
          
          <div className="destinations-grid">
            {destinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <div className="destination-header">
                  <h3 className='arrow'>{destination.name}</h3>
                </div>
                <div className="destination-content">
                  <div className="destination-detail">
                    <div className="detail-item">
                      <i className="fas fa-road"></i>
                      <span>{destination.distance}</span>
                    </div>
                    <div className="destination-detail">
                      <i className="fas fa-clock"></i>
                      <span>{destination.time}</span>
                    </div>
                    <div className="destination-price">
                      <i className="fas fa-tag"></i>
                      <span>{destination.estimatedPrice}</span>
                    </div>
                  </div>
                  <div className="destination-action">
                    <Link to="/contact" className="destination-button">
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="destinations-note">
            <p>
              <i className="fas fa-info-circle"></i>
              Ces tarifs sont indicatifs et peuvent varier selon la date, l'heure et le nombre de passagers. 
              Contactez-nous pour obtenir un devis précis pour votre trajet.
            </p>
          </div>
        </div>
      </div>
      
      <div className="client-testimonial">
        <div className="container">
          <div className="section-heading">
            <h2>CE QUE DISENT NOS CLIENTS</h2>
            <p className="subtitle">Témoignages de clients ayant utilisé notre service longue distance</p>
          </div>
          
          <div className="testimonial-content">
            <div className="testimonial-quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "J'ai choisi ce service de taxi pour un trajet Paris-Bordeaux et j'en suis très satisfait. 
              Le chauffeur était ponctuel et professionnel. Le véhicule était propre et confortable. 
              J'ai pu me reposer et travailler tranquillement pendant le voyage. 
              Je recommande ce service pour les longs trajets, c'est vraiment pratique et abordable."
            </p>
            <div className="testimonial-author">
              <div className="author-name">Laurent M.</div>
              <div className="author-title">Entrepreneur</div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE TRAJET LONGUE DISTANCE</h2>
            <p className="subtitle">Réservation simple et rapide pour votre prochain voyage</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'un trajet vers une autre destination ?</h3>
            <p>Contactez-nous pour obtenir un devis adapté à votre itinéraire</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Appeler directement
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongDistancePage;