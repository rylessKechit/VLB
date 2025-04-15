import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Importez Helmet pour gérer les métadonnées
import BookingForm from '../components/booking/BookingForm';
import '../styles/pages/HomePage.css';

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

  // Background video for hero
  const videoBackground = 'https://example.com/luxury-car-video.mp4'; // Remplacez par URL vidéo réelle

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
      name: 'Sophie Marceau',
      role: 'Actrice',
      text: 'Un service d\'exception que j\'utilise régulièrement lors de mes déplacements professionnels. Discrétion, ponctualité et confort absolu.',
      image: '/assets/images/testimonial-1.jpg'
    },
    {
      name: 'Jean Dujardin',
      role: 'Acteur et Producteur',
      text: 'Une prestation VIP impeccable pour tous mes trajets entre Paris et les festivals. Je recommande sans hésitation ce service haut de gamme.',
      image: '/assets/images/testimonial-2.jpg'
    },
    {
      name: 'Marion Cotillard',
      role: 'Actrice',
      text: 'Le summum du luxe et de l\'élégance pour vos déplacements. Un chauffeur toujours disponible et parfaitement professionnel.',
      image: '/assets/images/testimonial-3.jpg'
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
        <title>Taxi VLB - Service de taxi VIP à Verrières-le-Buisson | Mercedes Classe V</title>
        <meta name="description" content="Taxi VLB vous propose un service de transport VIP avec Mercedes Classe V à Verrières-le-Buisson. Transferts aéroport CDG, Orly, gares, et longue distance. Réservation 24h/24, 7j/7." />
        <meta name="keywords" content="taxi Verrières-le-Buisson, taxi VIP, Mercedes Classe V, transfert aéroport, transport gare, chauffeur privé" />
        <link rel="canonical" href="https://www.taxivlb.com" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", ".hero-content p"]
            },
            "name": "Taxi VLB - Service de taxi VIP à Verrières-le-Buisson",
            "description": "Service de transport VIP avec Mercedes Classe V. Transferts aéroport, gare et longue distance disponibles 24h/24, 7j/7.",
            "url": "https://www.taxivlb.com",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Taxi VLB",
              "url": "https://www.taxivlb.com"
            }
          }
        `}</script>
      </Helmet>

      {/* Hero Section with Video Background */}
      <section 
        ref={heroRef} 
        className={`hero-section fullscreen ${heroVisible ? 'animate' : ''}`}
      >
        <div className="video-background">
          <div className="overlay"></div>
          <video autoPlay loop muted playsInline aria-hidden="true">
            <source src={videoBackground} type="video/mp4" />
          </video>
        </div>
        
        <div className="hero-content">
          <h1 className="slide-in-left">
            <span className="text-primary">TAXI VLB</span> - Transport VIP à Verrières-le-Buisson
          </h1>
          <p className="subtitle fade-in">Service de transport VIP avec Mercedes Classe V pour une clientèle exigeante</p>
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
            <h2>SERVICES DE TRANSPORT VIP À VERRIÈRES-LE-BUISSON</h2>
            <p className="subtitle">Des prestations personnalisées pour tous vos besoins de déplacement</p>
          </div>
          
          <div className="services-grid">
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-1' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-crown" aria-hidden="true"></i>
              </div>
              <h3>TRANSFERT VIP</h3>
              <p>
                Une expérience d'exception avec chauffeur privé dédié, Mercedes Classe V et service personnalisé. 
                Confidentialité, élégance et attention aux moindres détails pour vos déplacements exclusifs.
              </p>
              <Link to="/experience-vip" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
            
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
            <h2>NOTRE MERCEDES CLASSE V - TAXI DE LUXE À VERRIÈRES-LE-BUISSON</h2>
            <p className="subtitle">Un véhicule d'exception pour une expérience de transport inoubliable</p>
          </div>
          
          <div className={`vehicle-showcase fade-in ${vehicleVisible ? 'visible' : ''}`}>
            <div className="vehicle-image">
              <img src="/assets/images/mercedes-v-class.jpg" alt="Mercedes-Benz Classe V Taxi de luxe à Verrières-le-Buisson" loading="lazy" />
            </div>
            <div className="vehicle-details">
              <h3>Mercedes-Benz Classe V VIP</h3>
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
                <h2>L'EXPÉRIENCE TAXI VIP À VERRIÈRES-LE-BUISSON</h2>
                <div className="separator-line"></div>
                <p>Bien plus qu'un simple transport, une expérience unique</p>
              </div>
              <p>
                Chaque trajet avec notre service de taxi VIP à Verrières-le-Buisson est une expérience raffinée, 
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
                Découvrir l'expérience VIP
              </Link>
            </div>
            
            <div className={`experience-image slide-in-right ${experienceVisible ? 'visible' : ''}`}>
              <img src="/assets/images/vip-experience.jpg" alt="Expérience taxi VIP à Verrières-le-Buisson dans Mercedes Classe V" loading="lazy" />
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
            <h2>AVIS CLIENTS SUR NOTRE SERVICE DE TAXI VIP</h2>
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
                    <div className="author-image">
                      <img src={testimonial.image} alt={`Avis client ${testimonial.name} sur Taxi VLB`} loading="lazy" />
                    </div>
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
            <h2>RÉSERVATION DE TAXI VIP À VERRIÈRES-LE-BUISSON</h2>
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
            <p className="subtitle">Ils nous font confiance pour leurs déplacements VIP à Verrières-le-Buisson et en Île-de-France</p>
          </div>
          
          <div className={`partners-logos fade-in ${partnersVisible ? 'visible' : ''}`}>
            <div className="partner-logo">
              <img src="/assets/images/logo-cannes-festival.png" alt="Partenariat Taxi VLB avec Festival de Cannes" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-ritz-paris.png" alt="Partenariat Taxi VLB avec Ritz Paris" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-louis-vuitton.png" alt="Partenariat Taxi VLB avec Louis Vuitton" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-chanel.png" alt="Partenariat Taxi VLB avec Chanel" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-air-france.png" alt="Partenariat Taxi VLB avec Air France" loading="lazy" />
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
              <p>Notre service de taxi de luxe avec Mercedes Classe V couvre principalement Verrières-le-Buisson et les villes environnantes, notamment :</p>
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
            <p className="subtitle">Tout ce que vous devez savoir sur notre service de taxi VIP à Verrières-le-Buisson</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item">
              <h3>Comment réserver un taxi VIP à Verrières-le-Buisson ?</h3>
              <p>Vous pouvez réserver notre service de taxi Mercedes Classe V via notre formulaire de réservation en ligne, par téléphone au +33 6 00 00 00 00 ou par email. Nous recommandons de réserver à l'avance pour garantir la disponibilité.</p>
            </div>
            
            <div className="faq-item">
              <h3>Quel est le prix d'une course de taxi VIP avec Mercedes Classe V ?</h3>
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
              <p>Oui, nous proposons des sièges auto adaptés aux enfants de tous âges sur demande lors de votre réservation (supplément de 15€).</p>
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
            <h2>Réservez votre taxi VIP à Verrières-le-Buisson</h2>
            <p>Contactez-nous dès maintenant pour réserver votre expérience de transport VIP avec Mercedes Classe V.</p>
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