import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/ServicePage.css';

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
        style={{ backgroundImage: 'url(/assets/images/long-distance-highway.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">TRAJETS LONGUE DISTANCE</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-road"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Un confort inégalé pour vos voyages en France et en Europe</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>VOYAGEZ SANS LIMITE, EN TOUT CONFORT</h2>
              <p className="subtitle">Des trajets sur mesure pour vos déplacements à moyenne et longue distance</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre service de transport longue distance est conçu pour vous offrir une alternative 
                premium aux transports en commun. Profitez d'un confort inégalé, d'une intimité 
                totale et d'une flexibilité absolue pour vos déplacements interurbains et 
                internationaux.
              </p>
              <p>
                Que vous voyagiez pour affaires ou pour des raisons personnelles, nos véhicules 
                haut de gamme et nos chauffeurs expérimentés vous garantissent un trajet 
                relaxant et productif, vous permettant d'arriver à destination dans les 
                meilleures conditions.
              </p>
            </div>
            
            <div className="overview-features stagger-items">
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-1' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="feature-content">
                  <h3>Flexibilité totale</h3>
                  <p>Voyagez selon votre propre horaire, sans dépendre des plannings de transport public.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-2' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-couch"></i>
                </div>
                <div className="feature-content">
                  <h3>Confort supérieur</h3>
                  <p>Véhicules spacieux avec sièges ergonomiques pour un voyage reposant, même sur de longues distances.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-3' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-plug"></i>
                </div>
                <div className="feature-content">
                  <h3>Équipements business</h3>
                  <p>WiFi haut débit, prises de recharge et conditions idéales pour travailler pendant votre trajet.</p>
                </div>
              </div>
              
              <div className={`feature-item stagger-item ${overviewVisible ? 'visible stagger-delay-4' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Destinations multiples</h3>
                  <p>Possibilité de faire plusieurs arrêts sur votre trajet ou de créer un itinéraire personnalisé.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={servicesRef} className={`service-details ${servicesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS SERVICES LONGUE DISTANCE</h2>
          <p className="subtitle fade-in">Des solutions adaptées à tous vos besoins de voyage</p>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-suitcase-rolling"></i>
              </div>
              <h3>VOYAGE INTER-VILLES</h3>
              <div className="service-detail-content">
                <p>
                  Notre service de transport inter-villes vous propose une alternative confortable 
                  et personnalisée aux trains et avions pour vos déplacements en France et en Europe. 
                  Profitez d'un voyage de porte à porte sans rupture de charge et sans 
                  les contraintes des transports en commun.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Transport direct de porte à porte</li>
                  <li><i className="fas fa-check"></i>Aucune limite de bagages</li>
                  <li><i className="fas fa-check"></i>Possibilité de faire des arrêts sur votre trajet</li>
                  <li><i className="fas fa-check"></i>Départs et arrivées selon votre planning</li>
                  <li><i className="fas fa-check"></i>Confidentialité et intimité totales</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/intercity-travel.jpg" alt="Voyage inter-villes" loading="lazy" />
            </div>
          </div>
          
          <div className="services-grid reverse">
            <div className="service-detail-image slide-in-left">
              <img src="/assets/images/european-travel.jpg" alt="Voyage européen" loading="lazy" />
            </div>
            
            <div className="service-detail-card slide-in-right">
              <div className="service-detail-icon">
                <i className="fas fa-globe-europe"></i>
              </div>
              <h3>VOYAGES EUROPÉENS</h3>
              <div className="service-detail-content">
                <p>
                  Découvrez l'Europe à votre rythme avec notre service de transport international. 
                  Nos chauffeurs expérimentés, familiers avec les routes internationales et les 
                  formalités aux frontières, vous garantissent un voyage serein vers les 
                  principales capitales et villes européennes.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Service disponible vers toutes les grandes villes européennes</li>
                  <li><i className="fas fa-check"></i>Chauffeurs multilingues</li>
                  <li><i className="fas fa-check"></i>Connaissance des formalités douanières</li>
                  <li><i className="fas fa-check"></i>Possibilité de voyage multi-destinations</li>
                  <li><i className="fas fa-check"></i>Support 24/7 pendant votre séjour</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="services-grid">
            <div className="service-detail-card slide-in-left">
              <div className="service-detail-icon">
                <i className="fas fa-hiking"></i>
              </div>
              <h3>EXCURSIONS & CIRCUITS TOURISTIQUES</h3>
              <div className="service-detail-content">
                <p>
                  Transformez votre transfert longue distance en une expérience touristique enrichissante
                  avec nos circuits sur mesure. Visitez des sites d'intérêt sur votre route, 
                  profitez de haltes gastronomiques dans des restaurants sélectionnés, 
                  et découvrez des lieux insolites hors des sentiers battus.
                </p>
                <ul className="service-features">
                  <li><i className="fas fa-check"></i>Itinéraires personnalisés selon vos centres d'intérêt</li>
                  <li><i className="fas fa-check"></i>Chauffeurs avec connaissance locale approfondie</li>
                  <li><i className="fas fa-check"></i>Réservations dans des établissements partenaires</li>
                  <li><i className="fas fa-check"></i>Service de guide disponible en option</li>
                  <li><i className="fas fa-check"></i>Flexibilité pour adapter le programme en cours de route</li>
                </ul>
              </div>
            </div>
            
            <div className="service-detail-image slide-in-right">
              <img src="/assets/images/tourist-excursion.jpg" alt="Excursion touristique" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="destinations-section">
        <div className="container">
          <h2>DESTINATIONS POPULAIRES</h2>
          <p className="subtitle">Nos trajets les plus demandés avec estimations de prix</p>
          
          <div className="destinations-grid">
            {destinations.map((destination, index) => (
              <div key={index} className="destination-card">
                <h3>{destination.name}</h3>
                <div className="destination-details">
                  <div className="detail-item">
                    <i className="fas fa-road"></i>
                    <span>{destination.distance}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-clock"></i>
                    <span>{destination.time}</span>
                  </div>
                  <div className="detail-item price">
                    <i className="fas fa-tag"></i>
                    <span>{destination.estimatedPrice}</span>
                  </div>
                </div>
                <Link to="/contact" className="destination-button">
                  Demander un devis
                </Link>
              </div>
            ))}
          </div>
          
          <div className="destinations-note">
            <p>
              <i className="fas fa-info-circle"></i>
              Ces prix sont donnés à titre indicatif pour un trajet en berline premium et peuvent varier selon
              la date, l'heure, le nombre de passagers et le type de véhicule. Contactez-nous pour un devis personnalisé.
            </p>
          </div>
        </div>
      </div>
      
      <div className="client-testimonial">
        <div className="container">
          <div className="testimonial-content">
            <div className="testimonial-quote">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              "J'ai opté pour ce service pour un Paris-Bordeaux et je ne regrette absolument pas mon choix. 
              Le chauffeur était ponctuel, professionnel et très agréable. La voiture était impeccable et confortable. 
              J'ai pu travailler tout au long du trajet grâce au WiFi et aux prises de recharge. 
              Je recommande vivement ce service pour ceux qui recherchent confort et productivité pendant leurs déplacements."
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
            <p className="subtitle">Un voyage personnalisé pour votre confort</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'un trajet sur mesure ou d'un itinéraire complexe ?</h3>
            <p>Nos conseillers sont à votre disposition pour créer un voyage adapté à vos besoins spécifiques</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Demander un devis personnalisé
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

export default LongDistancePage;