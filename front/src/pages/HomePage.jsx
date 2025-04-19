import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Importez Helmet pour gérer les métadonnées
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/HomePage.css';
import headerImage from '../assets/images/header-image.jpg';
import mercedesVClass from '../assets/images/mercedes-v-class.jpg';
import vipExperience from '../assets/images/vip-experience.jpg';
import logoAirFRance from '../assets/images/logo-air-france.png';
import logoCannesFestival from '../assets/images/logo-cannes-festival.png';
import logoLouisVuitton from '../assets/images/logo-louis-vuitton.png';
import logoChanel from '../assets/images/logo-chanel.png';
import logoRitzParis from '../assets/images/logo-ritz-paris.png';

// Animation utility
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

const HomePage = () => {
  // Refs and animation states for each section
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [vehicleRef, vehicleVisible] = useIntersectionObserver();
  const [experienceRef, experienceVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [bookingRef, bookingVisible] = useIntersectionObserver();
  const [partnersRef, partnersVisible] = useIntersectionObserver();

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Testimonials data
  const testimonials = [
    {
      name: 'Martin Dupont',
      role: 'Cadre commercial',
      text: 'Service exceptionnel pour mes déplacements professionnels. Le chauffeur était ponctuel, la voiture impeccable et le trajet confortable. Je recommande vivement ce service pour tous vos déplacements d\'affaires.',
    },
    {
      name: 'Émilie Laurent',
      role: 'Voyageuse fréquente',
      text: 'Un service remarquable ! J\'utilise régulièrement ce taxi pour mes transferts vers CDG et je n\'ai jamais été déçue. Le chauffeur suit mon vol et est toujours là à mon arrivée, même en cas de retard. Un vrai confort après un long voyage.',
    },
    {
      name: 'Thomas Moreau',
      role: 'Chef d\'entreprise',
      text: 'La Mercedes Classe V est parfaite pour les réunions mobiles. J\'ai pu travailler confortablement pendant mon trajet grâce au WiFi et à l\'espace généreux. Un gain de temps précieux dans mes journées chargées.',
    },
    {
      name: 'Sophie Bertrand',
      role: 'Organisatrice d\'événements',
      text: 'J\'ai réservé ce service pour le transport de clients VIP lors d\'un événement d\'entreprise. Le professionnalisme du chauffeur et le confort du véhicule ont fait forte impression. Merci pour votre fiabilité !',
    },
    {
      name: 'Pierre Lefebvre',
      role: 'Retraité',
      text: 'À notre âge, voyager peut être stressant. Ce service nous a permis de rejoindre l\'aéroport sereinement. Le chauffeur a été d\'une gentillesse exceptionnelle, nous aidant avec nos bagages et s\'adaptant à notre rythme.',
    }
  ];

  // Current testimonial index for carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">
      {/* SEO Metadata avec Helmet */}
      <Helmet>
        <title>Taxi VLB - Service de taxi à Verrières-le-Buisson</title>
        <meta name="description" content="Taxi VLB vous propose un service de transport avec Mercedes Classe V à Verrières-le-Buisson. Transferts aéroport CDG, Orly, gares, et longue distance. Réservation 24h/24, 7j/7." />
        <meta name="keywords" content="taxi Verrières-le-Buisson, Mercedes Classe V, transfert aéroport, transport gare, chauffeur privé" />
        <link rel="canonical" href="https://www.taxivlb.com" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", ".hero-content p"]
            },
            "name": "Taxi VLB - Service de taxi à Verrières-le-Buisson",
            "description": "Service de transport avec Mercedes Classe V. Transferts aéroport, gare et longue distance disponibles 24h/24, 7j/7.",
            "url": "https://www.taxivlb.com",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Taxi VLB",
              "url": "https://www.taxivlb.com"
            }
          }
        `}</script>
      </Helmet>

      <section 
        ref={heroRef} 
        className={`hero-section fullscreen ${heroVisible ? 'animate' : ''}`}
        style={{ 
          backgroundImage: `url(${headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >

      <div className="overlay"></div>
        
        <div className="hero-content">
          <h1 className="slide-in-left">
            <span className="text-primary">TAXI VLB</span>
          </h1>
          <p className="subtitle fade-in">Service de transport avec Mercedes Classe V pour une clientèle exigeante</p>
          <p className="slide-in-right">
            Chauffeur privé haut de gamme pour vos transferts aéroport, gare, événements professionnels et voyages d'affaires.
            Disponible 24h/24, 7j/7.
          </p>
          <div className="hero-buttons fade-in">
            <a 
              href="#vehicle" 
              className="hero-button primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('vehicle');
              }}
            >
              Découvrir notre Mercedes Classe V
            </a>
            <a 
              href="#booking" 
              className="hero-button secondary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('booking');
              }}
            >
              Réserver maintenant
            </a>
          </div>
        </div>
        
        <a 
          href="#services" 
          className="scroll-down-button"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('services');
          }}
          aria-label="Défiler vers les services"
        >
          <i className="fas fa-chevron-down" aria-hidden="true"></i>
        </a>
      </section>
      
      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef} 
        className={`services-section ${servicesVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>SERVICES DE TRANSPORT À VERRIÈRES-LE-BUISSON</h2>
            <p className="subtitle">Des prestations personnalisées pour tous vos besoins de déplacement</p>
          </div>
          
          <div className="services-grid">
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-2' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-plane-arrival" aria-hidden="true"></i>
              </div>
              <h3>TRANSFERT AÉROPORT</h3>
              <p>Service de transfert aéroport premium vers CDG, Orly et Beauvais. Suivi des vols, prise en charge des bagages et attente incluse en cas de retard.</p>
              <Link to="/services-aeroport-gare" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
            
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-3' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-route" aria-hidden="true"></i>
              </div>
              <h3>VOYAGES LONGUE DISTANCE</h3>
              <p>Confort et luxe pour vos déplacements entre villes, voyages d'affaires et touristiques avec notre Mercedes Classe V. Service sur-mesure sans limite de kilométrage.</p>
              <Link to="/services-longue-distance" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
            
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-4' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-train" aria-hidden="true"></i>
              </div>
              <h3>TRANSPORT GARE</h3>
              <p>Service de transfert vers les gares parisiennes (Gare du Nord, Gare de Lyon, Gare Montparnasse). Ponctualité et confort garantis pour vos voyages en train.</p>
              <Link to="/services-aeroport-gare" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vehicle Section */}
      <section 
        id="vehicle" 
        ref={vehicleRef} 
        className={`vehicle-section ${vehicleVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>NOTRE MERCEDES CLASSE V</h2>
            <p className="subtitle">Un véhicule d'exception pour une expérience de transport inoubliable</p>
          </div>
          
          <div className={`vehicle-showcase fade-in ${vehicleVisible ? 'visible' : ''}`}>
            <div className="vehicle-image">
              <img src={mercedesVClass} alt="Mercedes-Benz Classe V Taxi à Verrières-le-Buisson" loading="lazy" />
            </div>
            <div className="vehicle-details">
              <h3>Mercedes-Benz Classe V</h3>
              <p className="vehicle-description">
                Notre Mercedes Classe V est le véhicule idéal pour tous vos déplacements à Verrières-le-Buisson et en Île-de-France, alliant élégance, confort et praticité. 
                Avec un espace généreux et des aménagements luxueux, il peut accueillir jusqu'à 7 passagers et leurs bagages 
                dans des conditions optimales de confort.
              </p>
              <ul className="vehicle-features-list">
                <li><i className="fas fa-check" aria-hidden="true"></i> Jusqu'à 7 passagers</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Espace pour 7 bagages</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Configuration salon privé</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Sièges en cuir confortable</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Climatisation multi-zone</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Éclairage d'ambiance</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> WiFi gratuit à bord</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Prises de recharge USB</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Bouteilles d'eau offertes</li>
                <li><i className="fas fa-check" aria-hidden="true"></i> Isolation acoustique renforcée</li>
              </ul>
              <a href="#booking" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                scrollToSection('booking');
              }}>
                Réserver maintenant
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section 
        id="experience" 
        ref={experienceRef} 
        className={`experience-section ${experienceVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="experience-content">
            <div className={`experience-text slide-in-left ${experienceVisible ? 'visible' : ''}`}>
              <div className="section-heading text-left">
                <h2>L'EXPÉRIENCE TAXI À VERRIÈRES-LE-BUISSON</h2>
                <div className="separator-line"></div>
                <p>Bien plus qu'un simple transport, une expérience unique</p>
              </div>
              <p>
                Chaque trajet avec notre service de taxi à Verrières-le-Buisson est une expérience raffinée, 
                où chaque détail est pensé pour répondre à vos attentes les plus exigeantes.
              </p>
              <ul className="experience-features">
                <li>
                  <i className="fas fa-gem" aria-hidden="true"></i>
                  <span>Chauffeur professionnel formé au protocole et à l'étiquette</span>
                </li>
                <li>
                  <i className="fas fa-glass-martini-alt" aria-hidden="true"></i>
                  <span>Sélection de boissons et rafraîchissements premium à bord</span>
                </li>
                <li>
                  <i className="fas fa-wifi" aria-hidden="true"></i>
                  <span>Connectivité haut débit WiFi et équipements high-tech</span>
                </li>
                <li>
                  <i className="fas fa-shield-alt" aria-hidden="true"></i>
                  <span>Discrétion absolue et confidentialité garantie durant tout votre trajet</span>
                </li>
              </ul>
              <Link to="/experience-vip" className="btn btn-primary">
                Découvrir l'expérience
              </Link>
            </div>
            
            <div className={`experience-image slide-in-right ${experienceVisible ? 'visible' : ''}`}>
              <img src={vipExperience} alt="Expérience taxi à Verrières-le-Buisson dans Mercedes Classe V" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={testimonialsRef} 
        className={`testimonials-section ${testimonialsVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>AVIS CLIENTS SUR NOTRE SERVICE DE TAXI</h2>
            <p className="subtitle">Ce que disent nos clients sur notre service à Verrières-le-Buisson</p>
          </div>
          
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <i className="fas fa-quote-left" aria-hidden="true"></i>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={index === currentTestimonial ? 'active' : ''}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Témoignage ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section 
        id="booking" 
        ref={bookingRef} 
        className={`booking-section ${bookingVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>RÉSERVATION DE TAXI À VERRIÈRES-LE-BUISSON</h2>
            <p className="subtitle">Un service sur-mesure pour répondre à toutes vos exigences</p>
          </div>
          
          <div className={`booking-container fade-in ${bookingVisible ? 'visible' : ''}`}>
            <BookingForm />
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section 
        id="partners" 
        ref={partnersRef} 
        className={`partners-section ${partnersVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>NOS PARTENAIRES DE PRESTIGE</h2>
            <p className="subtitle">Ils nous font confiance pour leurs déplacements à Verrières-le-Buisson et en Île-de-France</p>
          </div>
          
          <div className={`partners-logos fade-in ${partnersVisible ? 'visible' : ''}`}>
            <div className="partner-logo">
              <img src={logoCannesFestival} alt="Partenariat Taxi VLB avec Festival de Cannes" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src={logoRitzParis} alt="Partenariat Taxi VLB avec Ritz Paris" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src={logoLouisVuitton} alt="Partenariat Taxi VLB avec Louis Vuitton" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src={logoChanel} alt="Partenariat Taxi VLB avec Chanel" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src={logoAirFRance} alt="Partenariat Taxi VLB avec Air France" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Areas Section - Nouvelle section pour le SEO local */}
      <section id="service-areas" className="service-areas-section">
        <div className="container">
          <div className="section-heading">
            <h2>ZONES DE SERVICE - TAXI VLB</h2>
            <p className="subtitle">Nous desservons Verrières-le-Buisson et ses environs</p>
          </div>
          
          <div className="service-areas-content">
            <div className="primary-area">
              <h3>Verrières-le-Buisson et proximité</h3>
              <p>Notre service de taxi avec Mercedes Classe V couvre principalement Verrières-le-Buisson et les villes environnantes, notamment :</p>
              <ul className="areas-list">
                <li>Antony</li>
                <li>Massy</li>
                <li>Palaiseau</li>
                <li>Igny</li>
                <li>Bièvres</li>
                <li>Sceaux</li>
                <li>Châtenay-Malabry</li>
                <li>Wissous</li>
              </ul>
            </div>
            
            <div className="secondary-areas">
              <h3>Transferts aéroports et gares</h3>
              <p>Nous assurons des transferts premium vers/depuis :</p>
              <ul className="areas-list">
                <li>Aéroport Paris Charles de Gaulle (CDG)</li>
                <li>Aéroport Paris Orly (ORY)</li>
                <li>Aéroport Paris Beauvais (BVA)</li>
                <li>Gare du Nord</li>
                <li>Gare de Lyon</li>
                <li>Gare Montparnasse</li>
                <li>Gare de l'Est</li>
                <li>Gare Saint-Lazare</li>
              </ul>
            </div>
            
            <div className="long-distance">
              <h3>Service longue distance</h3>
              <p>Nous proposons également des trajets longue distance vers les principales villes françaises :</p>
              <ul className="areas-list">
                <li>Lyon</li>
                <li>Bordeaux</li>
                <li>Marseille</li>
                <li>Lille</li>
                <li>Strasbourg</li>
                <li>Nantes</li>
                <li>Bruxelles</li>
                <li>Amsterdam</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Nouvelle section pour le SEO */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-heading">
            <h2>QUESTIONS FRÉQUENTES - TAXI VLB</h2>
            <p className="subtitle">Tout ce que vous devez savoir sur notre service de taxi à Verrières-le-Buisson</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item">
              <h3>Comment réserver un taxi à Verrières-le-Buisson ?</h3>
              <p>Vous pouvez réserver notre service de taxi Mercedes Classe V via notre formulaire de réservation en ligne, par téléphone au +33 6 00 00 00 00 ou par email. Nous recommandons de réserver à l'avance pour garantir la disponibilité.</p>
            </div>
            
            <div className="faq-item">
              <h3>Quel est le prix d'une course de taxi avec Mercedes Classe V ?</h3>
              <p>Nos tarifs dépendent de plusieurs facteurs : distance, durée, horaire et services additionnels. Utilisez notre calculateur en ligne pour obtenir un devis instantané pour votre trajet spécifique.</p>
            </div>
            
            <div className="faq-item">
              <h3>Le prix inclut-il l'attente en cas de retard de vol ?</h3>
              <p>Oui, pour les transferts aéroport, nous suivons l'état de votre vol en temps réel et l'attente en cas de retard est incluse dans votre tarif, sans supplément.</p>
            </div>
            
            <div className="faq-item">
              <h3>Combien de personnes peuvent voyager dans votre Mercedes Classe V ?</h3>
              <p>Notre Mercedes Classe V peut accueillir confortablement jusqu'à 7 passagers avec leurs bagages.</p>
            </div>
            
            <div className="faq-item">
              <h3>Proposez-vous des sièges auto pour enfants ?</h3>
              <p>Oui, nous proposons des sièges auto adaptés aux enfants de tous âges sur demande lors de votre réservation (supplément de 5€).</p>
            </div>
            
            <div className="faq-item">
              <h3>Quels modes de paiement acceptez-vous ?</h3>
              <p>Nous acceptons les paiements en espèces, par carte bancaire directement auprès du chauffeur, ou par virement bancaire pour les réservations professionnelles.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Réservez votre taxi à Verrières-le-Buisson</h2>
            <p>Contactez-nous dès maintenant pour réserver votre expérience de transport avec Mercedes Classe V.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Appeler directement
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;