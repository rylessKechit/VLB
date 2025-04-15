import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/FleetPage.css';
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

const FleetPage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [overviewRef, overviewVisible] = useIntersectionObserver();
  const [fleetRef, fleetVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();

  // État pour filtrer la flotte
  const [activeFilter, setActiveFilter] = useState('all');

  // Données de la flotte
  const fleetData = [
    {
      id: 'mercedes-e',
      name: 'Mercedes-Benz Classe E',
      category: 'sedan',
      categoryName: 'Berline de Luxe',
      passengers: 3,
      luggage: 3,
      description: "La Mercedes Classe E incarne l'équilibre parfait entre élégance et technologie, offrant une expérience de conduite raffinée et confortable.",
      features: [
        'Sièges en cuir confortables',
        'Climatisation bi-zone',
        'Système audio premium',
        'Wifi à bord',
        'Prises de recharge USB',
        'Bouteilles d\'eau offertes'
      ],
      image: '/assets/images/mercedes-e-class.jpg',
    },
    {
      id: 'tesla-model3',
      name: 'Tesla Model 3',
      category: 'green',
      categoryName: 'Véhicule Électrique',
      passengers: 4,
      luggage: 4,
      description: "La Tesla Model 3 représente l'avenir du transport premium avec sa motorisation 100% électrique et ses technologies de pointe.",
      features: [
        'Motorisation 100% électrique',
        'Écran tactile central 15"',
        'Toit panoramique en verre',
        'Intérieur minimaliste',
        'Accélération 0-100 km/h en 3,3s',
        'Wifi et streaming à bord'
      ],
      image: '/assets/images/tesla-model-3.jpg',
    },
    {
      id: 'mercedes-s',
      name: 'Mercedes-Benz Classe S',
      category: 'premium',
      categoryName: 'Berline Premium',
      passengers: 3,
      luggage: 3,
      description: "La Mercedes Classe S représente le summum du luxe automobile avec son confort exceptionnel et ses technologies avancées.",
      features: [
        'Sièges massants et climatisés',
        'Système audio Burmester 4D',
        'Éclairage d\'ambiance 64 couleurs',
        'Tablettes tactiles à l\'arrière',
        'Minibar intégré',
        'Isolation phonique renforcée'
      ],
      image: '/assets/images/mercedes-s-class.jpg',
    },
    {
      id: 'bmw-7',
      name: 'BMW Série 7',
      category: 'premium',
      categoryName: 'Berline Premium',
      passengers: 3,
      luggage: 3,
      description: "La BMW Série 7 offre une expérience de conduite exceptionnelle alliant sportivité et raffinement pour vos déplacements.",
      features: [
        'Sièges Executive Lounge',
        'Sky Lounge panoramique',
        'Système divertissement arrière',
        'Commande gestuelle',
        'Assistant personnel intelligent',
        'Parfumeur d\'ambiance'
      ],
      image: '/assets/images/bmw-7-series.jpg',
    },
    {
      id: 'bmw-x5',
      name: 'BMW X5',
      category: 'suv',
      categoryName: 'SUV de Luxe',
      passengers: 5,
      luggage: 5,
      description: "Le BMW X5 combine élégance et praticité avec son espace intérieur généreux et sa position de conduite surélevée.",
      features: [
        'Intérieur spacieux et modulable',
        'Position de conduite surélevée',
        'Système audio Harman Kardon',
        'Grand coffre pour bagages',
        'Climatisation 4 zones',
        'Vitres teintées'
      ],
      image: '/assets/images/bmw-x5.jpg',
    },
    {
      id: 'mercedes-v',
      name: 'Mercedes-Benz Classe V',
      category: 'van',
      categoryName: 'Van VIP',
      passengers: 7,
      luggage: 7,
      description: "Le Mercedes Classe V transformé en salon mobile avec des sièges face-à-face pour les groupes jusqu'à 7 personnes.",
      features: [
        'Configuration salon face-à-face',
        'Tables de travail intégrées',
        'Réfrigérateur et porte-gobelets',
        'Prises 220V pour ordinateurs',
        'Éclairage d\'ambiance',
        'Séparation chauffeur'
      ],
      image: '/assets/images/mercedes-v-class.jpg',
    }
  ];

  // Filtrer les véhicules selon la catégorie active
  const filteredVehicles = activeFilter === 'all' 
    ? fleetData 
    : fleetData.filter(vehicle => vehicle.category === activeFilter);

  return (
    <div className="service-page fleet-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/fleet-hero.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">DÉCOUVREZ NOS VÉHICULES</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-car"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Sélectionnez le véhicule parfait pour votre prochain trajet</p>
        </div>
      </div>
      
      <div ref={overviewRef} className={`service-details fleet-overview ${overviewVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>UNE SÉLECTION EXIGEANTE DE VÉHICULES PREMIUM</h2>
              <p className="subtitle">Le parfait équilibre entre luxe, confort et fiabilité</p>
            </div>
            
            <div className="overview-text fade-in">
              <p>
                Notre flotte de véhicules a été méticuleusement sélectionnée pour répondre aux attentes 
                de notre clientèle exigeante. Chaque véhicule est choisi non seulement pour son prestige 
                et son confort, mais aussi pour sa fiabilité et sa sécurité.
              </p>
              <p>
                Régulièrement renouvelés et entretenus avec le plus grand soin, nos véhicules sont toujours 
                dans un état impeccable. De la berline de luxe au van VIP en passant par nos véhicules 
                électriques, vous trouverez toujours le véhicule parfaitement adapté à vos besoins.
              </p>
            </div>
            
            <div className="fleet-features">
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Flotte récente</h3>
                  <p>Tous nos véhicules ont moins de 2 ans et sont régulièrement renouvelés.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <div className="feature-content">
                  <h3>Entretien rigoureux</h3>
                  <p>Maintenance par des concessionnaires officiels selon les plus hauts standards.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-hand-sparkles"></i>
                </div>
                <div className="feature-content">
                  <h3>Propreté irréprochable</h3>
                  <p>Nettoyage complet intérieur et extérieur avant chaque service.</p>
                </div>
              </div>
              
              <div className={`feature-item ${overviewVisible ? 'visible' : ''}`}>
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Sécurité optimale</h3>
                  <p>Équipements de sécurité à la pointe et vérifications régulières.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={fleetRef} className={`service-details fleet-showcase ${fleetVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">DÉCOUVREZ NOS VÉHICULES</h2>
          <p className="subtitle fade-in">Sélectionnez le véhicule parfait pour votre prochain trajet</p>
          
          <div className="fleet-filters">
            <button 
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Tous les véhicules
            </button>
            <button 
              className={`filter-button ${activeFilter === 'sedan' ? 'active' : ''}`}
              onClick={() => setActiveFilter('sedan')}
            >
              Berlines de Luxe
            </button>
            <button 
              className={`filter-button ${activeFilter === 'green' ? 'active' : ''}`}
              onClick={() => setActiveFilter('green')}
            >
              Véhicules Électriques
            </button>
            <button 
              className={`filter-button ${activeFilter === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveFilter('premium')}
            >
              Berlines Premium
            </button>
            <button 
              className={`filter-button ${activeFilter === 'suv' ? 'active' : ''}`}
              onClick={() => setActiveFilter('suv')}
            >
              SUV de Luxe
            </button>
            <button 
              className={`filter-button ${activeFilter === 'van' ? 'active' : ''}`}
              onClick={() => setActiveFilter('van')}
            >
              Vans VIP
            </button>
          </div>
          
          <div className="fleet-grid">
            {filteredVehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id} 
                className={`vehicle-card ${fleetVisible ? 'visible' : ''}`} 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="vehicle-image">
                  <img src={vehicle.image} alt={vehicle.name} />
                  <div className="vehicle-category">{vehicle.categoryName}</div>
                </div>
                <div className="vehicle-details">
                  <h3>{vehicle.name}</h3>
                  <div className="vehicle-specs">
                    <div className="spec-item">
                      <i className="fas fa-users"></i>
                      <span>Jusqu'à {vehicle.passengers} passagers</span>
                    </div>
                    <div className="spec-item">
                      <i className="fas fa-suitcase"></i>
                      <span>Jusqu'à {vehicle.luggage} bagages</span>
                    </div>
                  </div>
                  <p className="vehicle-description">{vehicle.description}</p>
                  <div className="vehicle-features">
                    <h4>Équipements</h4>
                    <ul>
                      {vehicle.features.slice(0, 3).map((feature, i) => (
                        <li key={i}><i className="fas fa-check"></i> {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="vehicle-actions">
                    <button className="vehicle-details-btn">
                      Voir les détails
                    </button>
                    <Link to="/contact" className="vehicle-book-btn">
                      Réserver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div ref={bookingRef} className={`booking-section ${bookingVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVEZ VOTRE VÉHICULE</h2>
            <p className="subtitle">Choisissez l'excellence pour votre prochain déplacement</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Vous avez des exigences particulières ?</h3>
            <p>Notre flotte peut s'adapter à vos besoins spécifiques</p>
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

export default FleetPage;