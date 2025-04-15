import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const [fleetRef, fleetVisible] = useIntersectionObserver();
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

  // Vehicle fleet carousel items
  const fleetItems = [
    {
      name: 'Mercedes-Benz Classe S',
      image: '/assets/images/mercedes-s-class.jpg',
      description: 'Élégance et confort inégalés pour vos déplacements d\'affaires et événements prestigieux.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'BMW Série 7',
      image: '/assets/images/bmw-7-series.jpg',
      description: 'L\'alliance parfaite entre technologie de pointe et luxe raffiné pour vos trajets professionnels.',
      features: ['Jusqu\'à 3 passagers', 'Écrans tactiles individuels', 'Système audio haut de gamme', 'Ambiance lumineuse personnalisable']
    },
    {
      name: 'Mercedes-Benz Classe V VIP',
      image: '/assets/images/mercedes-v-class.jpg',
      description: 'Espace généreux et aménagements luxueux pour vos déplacements en groupe.',
      features: ['Jusqu\'à 7 passagers', 'Configuration salon privé', 'Bar intégré', 'Isolation acoustique renforcée']
    }
  ];

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
      {/* Hero Section with Video Background */}
      <section 
        ref={heroRef} 
        className={`hero-section fullscreen ${heroVisible ? 'animate' : ''}`}
      >
        <div className="video-background">
          <div className="overlay"></div>
          <video autoPlay loop muted playsInline>
            <source src={videoBackground} type="video/mp4" />
          </video>
        </div>
        
        <div className="hero-content">
          <h1 className="slide-in-left">
            <span className="text-primary">EXCELLENCE</span> & ÉLÉGANCE
          </h1>
          <p className="subtitle fade-in">Transport VIP pour une clientèle d'exception</p>
          <p className="slide-in-right">
            Service de chauffeur privé haut de gamme pour vos déplacements professionnels, 
            événements prestigieux et voyages d'affaires.
          </p>
          <div className="hero-buttons fade-in">
            <Link to="/flotte-vehicules" className="hero-button primary">
              Découvrir notre flotte
            </Link>
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
        >
          <i className="fas fa-chevron-down"></i>
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
            <h2>NOS PRESTATIONS D'EXCEPTION</h2>
            <p className="subtitle">Des services personnalisés pour vos exigences les plus élevées</p>
          </div>
          
          <div className="services-grid">
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-1' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h3>TRANSFERT VIP</h3>
              <p>
                Une expérience d'exception avec chauffeur privé dédié, véhicule de luxe et service personnalisé. 
                Confidentialité, élégance et attention aux moindres détails pour vos déplacements exclusifs.
              </p>
              <Link to="/experience-vip" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-2' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-glass-cheers"></i>
              </div>
              <h3>ÉVÉNEMENTS & SOIRÉES</h3>
              <p>Service de prestige pour vos événements spéciaux, soirées de gala, tapis rouges et premières. Arrivez avec style et distinction.</p>
              <Link to="/services-evenements" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-3' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-route"></i>
              </div>
              <h3>VOYAGES LONGUE DISTANCE</h3>
              <p>Confort et luxe pour vos déplacements entre villes, voyages d'affaires et touristiques. Service sur-mesure sans limite de kilométrage.</p>
              <Link to="/services-longue-distance" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className={`service-card stagger-item ${servicesVisible ? 'visible stagger-delay-4' : ''}`}>
              <div className="service-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>TRANSPORT D'AFFAIRES</h3>
              <p>Solutions dédiées aux entreprises et dirigeants exigeants. Confidentialité, ponctualité et excellence pour vos rendez-vous professionnels.</p>
              <Link to="/services-affaires" className="service-link">
                Découvrir
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fleet Section */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className={`fleet-section ${fleetVisible ? 'animate' : ''}`}
      >
        <div className="container">
          <div className="section-heading">
            <h2>NOTRE FLOTTE PREMIUM</h2>
            <p className="subtitle">Des véhicules d'exception pour une expérience inoubliable</p>
          </div>
          
          <div className="fleet-carousel">
            {fleetItems.map((item, index) => (
              <div 
                key={index} 
                className={`fleet-item ${fleetVisible ? 'visible' : ''}`}
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="fleet-image">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="fleet-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <ul className="fleet-features">
                    {item.features.map((feature, i) => (
                      <li key={i}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/flotte-vehicules" className="btn btn-primary">
                    Réserver ce véhicule
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="fleet-navigation">
            <Link to="/flotte-vehicules" className="view-all-link">
              Découvrir toute notre flotte
              <i className="fas fa-arrow-right"></i>
            </Link>
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
                <h2>L'EXPÉRIENCE VIP</h2>
                <div className="separator-line"></div>
                <p>Bien plus qu'un simple transport, une expérience unique</p>
              </div>
              <p>
                Chaque voyage avec notre service de chauffeur privé est une expérience raffinée, 
                où chaque détail est pensé pour répondre à vos attentes les plus exigeantes.
              </p>
              <ul className="experience-features">
                <li>
                  <i className="fas fa-gem"></i>
                  <span>Chauffeurs d'élite formés au protocole et à l'étiquette</span>
                </li>
                <li>
                  <i className="fas fa-glass-martini-alt"></i>
                  <span>Sélection de boissons et rafraîchissements premium</span>
                </li>
                <li>
                  <i className="fas fa-wifi"></i>
                  <span>Connectivité haut débit et équipements high-tech</span>
                </li>
                <li>
                  <i className="fas fa-shield-alt"></i>
                  <span>Discrétion absolue et confidentialité garantie</span>
                </li>
              </ul>
              <Link to="/experience-vip" className="btn btn-primary">
                Découvrir l'expérience VIP
              </Link>
            </div>
            
            <div className={`experience-image slide-in-right ${experienceVisible ? 'visible' : ''}`}>
              <img src="/assets/images/vip-experience.jpg" alt="Expérience VIP" loading="lazy" />
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
            <h2>ILS NOUS FONT CONFIANCE</h2>
            <p className="subtitle">Ce que disent nos clients d'exception</p>
          </div>
          
          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
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
            <h2>RÉSERVEZ VOTRE EXPÉRIENCE DE LUXE</h2>
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
            <p className="subtitle">Ils nous accordent leur confiance au quotidien</p>
          </div>
          
          <div className={`partners-logos fade-in ${partnersVisible ? 'visible' : ''}`}>
            <div className="partner-logo">
              <img src="/assets/images/logo-cannes-festival.png" alt="Festival de Cannes" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-ritz-paris.png" alt="Ritz Paris" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-louis-vuitton.png" alt="Louis Vuitton" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-chanel.png" alt="Chanel" loading="lazy" />
            </div>
            <div className="partner-logo">
              <img src="/assets/images/logo-air-france.png" alt="Air France" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à vivre l'excellence ?</h2>
            <p>Contactez-nous dès maintenant pour réserver votre expérience de transport VIP.</p>
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