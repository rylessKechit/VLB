import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import aboutHero from '../assets/images/about-hero.jpg';
import aboutPhilosophy from '../assets/images/about-philosophy.jpg';

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

const AboutPage = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [storyRef, storyVisible] = useIntersectionObserver();
  const [valuesRef, valuesVisible] = useIntersectionObserver();
  const [teamRef, teamVisible] = useIntersectionObserver();
  const [statsRef, statsVisible] = useIntersectionObserver();
  const [timelineRef, timelineVisible] = useIntersectionObserver();

  // Valeurs de l'entreprise
  const companyValues = [
    {
      title: "Ponctualité",
      description: "Nous respectons votre temps et garantissons des arrivées à l'heure pour tous vos trajets.",
      icon: "clock"
    },
    {
      title: "Fiabilité",
      description: "Un service disponible 24h/24 et 7j/7, avec des véhicules soigneusement entretenus.",
      icon: "check-double"
    },
    {
      title: "Transparence",
      description: "Des tarifs clairs et compétitifs, sans frais cachés ni surprises désagréables.",
      icon: "file-invoice"
    },
    {
      title: "Propreté",
      description: "Des véhicules propres et bien entretenus pour chaque course.",
      icon: "spray-can"
    },
    {
      title: "Courtoisie",
      description: "Des chauffeurs professionnels, courtois et à l'écoute de vos besoins.",
      icon: "handshake"
    },
    {
      title: "Sécurité",
      description: "Votre sécurité est notre priorité absolue sur chaque trajet.",
      icon: "shield-alt"
    }
  ];

  // Équipe
  const teamMembers = [
    {
      name: "Pierre Guttin",
      position: "Fondateur",
      bio: "Avec plus de 15 ans d'expérience dans le transport, Pierre a fondé Taxi VLB avec la vision d'offrir un service de taxi fiable et accessible à tous.",
      image: "/assets/images/team-founder.jpg"
    },
    {
      name: "Sophie Lambert",
      position: "Responsable des Réservations",
      bio: "Sophie gère les réservations et s'assure que chaque client bénéficie d'un service ponctuel et professionnel.",
      image: "/assets/images/team-operations.jpg"
    },
    {
      name: "Alexandre Dupont",
      position: "Responsable Service Client",
      bio: "Alexandre et son équipe sont à votre écoute pour répondre à toutes vos questions et demandes.",
      image: "/assets/images/team-customer.jpg"
    },
    {
      name: "Marie Lefèvre",
      position: "Responsable des Chauffeurs",
      bio: "Marie forme nos chauffeurs pour garantir un service professionnel et une conduite sûre.",
      image: "/assets/images/team-drivers.jpg"
    }
  ];

  return (
    <div className="service-page about-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: `url(${aboutHero})` }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">À PROPOS DE NOUS</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-taxi"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Découvrez l'histoire et les valeurs de Taxi VLB</p>
        </div>
      </div>
      
      <div ref={storyRef} className={`service-overview ${storyVisible ? 'animate' : ''}`}>
        <div className="container">
          <div className="service-overview-content">
            <div className="gold-accent slide-in-left">
              <h2>NOTRE HISTOIRE</h2>
            </div>
            <div className="story-text slide-in-left">
              <p>
                Fondée en 2009 par Pierre Guttin, Taxi VLB est née d'une volonté de proposer un service 
                de taxi fiable et professionnel à Verrières-le-Buisson et ses environs.
              </p>
              <p>
                Nous avons commencé avec un seul véhicule et une idée simple : offrir un service de qualité 
                à un prix juste. Au fil des années, grâce à la satisfaction de nos clients, nous avons 
                développé notre activité tout en restant fidèles à nos valeurs de départ.
              </p>
              <p>
                Notre clientèle variée, composée de particuliers, de professionnels et de familles, 
                nous fait confiance pour leurs déplacements quotidiens, leurs transferts aéroport 
                et leurs trajets longue distance.
              </p>
              <p>
                Aujourd'hui, Taxi VLB continue de grandir en maintenant son engagement envers 
                un service de qualité, la ponctualité et la satisfaction client.
              </p>
            </div>
            <div className="story-image slide-in-right">
              <img src="/assets/images/about-founder.jpg" alt="Notre équipe" />
            </div>
          </div>
          
          {/* Citation du fondateur */}
          <div className="quote-container">
            <div className="founder-quote-separate">
              <p>"Notre objectif est de fournir un service de taxi fiable et de qualité, adapté aux besoins de chacun."</p>
              <span className="quote-author">Pierre Guttin, Fondateur</span>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={valuesRef} className={`service-details values-section ${valuesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS VALEURS</h2>
          <p className="subtitle fade-in">Les principes qui guident notre service</p>
          
          <div className="values-grid">
            {companyValues.map((value, index) => (
              <div 
                key={index} 
                className={`value-card ${valuesVisible ? 'visible' : ''}`}
                style={{animationDelay: `${0.2 * index}s`}}
              >
                <div className="value-icon">
                  <i className={`fas fa-${value.icon}`}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="philosophy-section">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-image">
              <img src={aboutPhilosophy} alt="Notre philosophie" />
            </div>
            <div className="philosophy-text">
              <h2>NOTRE PHILOSOPHIE</h2>
              <p>
                Chez Taxi VLB, nous croyons qu'un service de taxi doit être simple, fiable et accessible. 
                Notre approche consiste à vous offrir un transport confortable et ponctuel, 
                que ce soit pour vos déplacements quotidiens, vos rendez-vous professionnels 
                ou vos voyages plus longs.
              </p>
              <ul className="philosophy-list">
                <li>
                  <span className="list-marker">01</span>
                  <div>
                    <h4>Service client</h4>
                    <p>Nous sommes à l'écoute de vos besoins pour vous offrir le service le plus adapté.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">02</span>
                  <div>
                    <h4>Simplicité</h4>
                    <p>Réservation facile par téléphone, en ligne ou par email pour votre confort.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">03</span>
                  <div>
                    <h4>Qualité constante</h4>
                    <p>Nous maintenons un niveau de service élevé sur chaque course.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">04</span>
                  <div>
                    <h4>Amélioration continue</h4>
                    <p>Nous écoutons vos retours pour améliorer constamment notre service.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Besoin d'un taxi fiable ?</h3>
            <p>Contactez-nous pour votre prochain trajet</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contactez-nous
              </Link>
              <Link to="/flotte-vehicules" className="btn btn-outline">
                <i className="fas fa-car"></i>
                Découvrir notre véhicule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;