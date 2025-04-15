import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/AboutPage.css';
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
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque aspect de notre service, du premier contact à la fin de votre trajet.",
      icon: "star"
    },
    {
      title: "Fiabilité",
      description: "Notre engagement envers la ponctualité et la fiabilité est absolu, car nous savons que votre temps est précieux.",
      icon: "clock"
    },
    {
      title: "Personnalisation",
      description: "Chaque client est unique. Nous adaptons notre service à vos préférences et exigences spécifiques.",
      icon: "user-cog"
    },
    {
      title: "Discrétion",
      description: "Nous garantissons une confidentialité totale et une approche discrète pour tous nos clients.",
      icon: "user-secret"
    },
    {
      title: "Innovation",
      description: "Nous intégrons constamment les dernières technologies pour améliorer votre expérience de transport.",
      icon: "lightbulb"
    },
    {
      title: "Responsabilité",
      description: "Notre engagement envers l'environnement et la société se reflète dans nos pratiques quotidiennes.",
      icon: "leaf"
    }
  ];

  // Équipe de direction
  const teamMembers = [
    {
      name: "Pierre Guttin",
      position: "Fondateur & Directeur",
      bio: "Avec plus de 15 ans d'expérience dans le transport VIP, Pierre a fondé l'entreprise avec la vision d'offrir un service de transport d'exception qui dépasse les attentes des clients les plus exigeants.",
      image: "/assets/images/team-founder.jpg"
    },
    {
      name: "Sophie Lambert",
      position: "Directrice des Opérations",
      bio: "Experte en logistique et gestion de flotte, Sophie veille à ce que chaque trajet soit parfaitement planifié et exécuté selon les plus hauts standards de qualité.",
      image: "/assets/images/team-operations.jpg"
    },
    {
      name: "Alexandre Dupont",
      position: "Responsable Service Client",
      bio: "Passionné par l'excellence du service, Alexandre et son équipe sont disponibles 24/7 pour garantir une expérience client irréprochable et personnalisée.",
      image: "/assets/images/team-customer.jpg"
    },
    {
      name: "Marie Lefèvre",
      position: "Chef des Chauffeurs",
      bio: "Ancienne chauffeure VIP pour des diplomates, Marie sélectionne et forme personnellement chaque chauffeur selon des critères rigoureux d'excellence et de professionnalisme.",
      image: "/assets/images/team-drivers.jpg"
    }
  ];

  return (
    <div className="service-page about-page">
      <div 
        ref={headerRef} 
        className={`service-hero ${headerVisible ? 'animate' : ''}`}
        style={{ backgroundImage: 'url(/assets/images/about-hero.jpg)' }}
      >
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <h1 className="slide-in-left">À PROPOS DE NOUS</h1>
          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-icon"><i className="fas fa-gem"></i></span>
            <span className="separator-line"></span>
          </div>
          <p className="slide-in-right">Découvrez notre histoire, notre vision et notre engagement envers l'excellence</p>
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
                Fondée en 2009 par Pierre Guttin, notre entreprise est née d'une passion pour l'excellence et 
                d'une vision claire : transformer le transport privé en une expérience exceptionnelle où chaque 
                détail compte.
              </p>
              <p>
                Ce qui a commencé comme un service de chauffeur privé avec une seule berline s'est rapidement 
                développé pour devenir une référence dans le transport de luxe. Notre croissance a toujours été 
                guidée par une obsession de la qualité et un désir constant de dépasser les attentes de nos clients.
              </p>
              <p>
                Au fil des années, nous avons cultivé des relations privilégiées avec une clientèle exigeante : 
                cadres dirigeants, personnalités, familles fortunées et entreprises internationales qui partagent 
                notre vision de l'excellence.
              </p>
              <p>
                Aujourd'hui, notre entreprise continue d'évoluer, en intégrant les dernières innovations et en 
                développant de nouveaux services, tout en restant fidèle à ce qui a fait notre succès : un service 
                personnalisé d'exception, une attention méticuleuse aux détails et une discrétion absolue.
              </p>
            </div>
            <div className="story-image slide-in-right">
              <img src="/assets/images/about-founder.jpg" alt="Notre fondateur" />
            </div>
          </div>
          
          {/* Citation du fondateur séparée pour éviter le chevauchement */}
          <div className="quote-container">
            <div className="founder-quote-separate">
              <p>"Notre mission est de créer une expérience de transport qui dépasse le simple déplacement pour devenir un moment privilégié."</p>
              <span className="quote-author">Pierre Guttin, Fondateur</span>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={valuesRef} className={`service-details values-section ${valuesVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOS VALEURS</h2>
          <p className="subtitle fade-in">Les principes qui guident chacune de nos actions</p>
          
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
              <img src="/assets/images/about-philosophy.jpg" alt="Notre philosophie" />
            </div>
            <div className="philosophy-text">
              <h2>NOTRE PHILOSOPHIE</h2>
              <p>
                Notre approche est fondée sur l'idée que chaque trajet est une opportunité de créer une 
                expérience mémorable. Nous ne nous contentons pas de vous transporter d'un point A à un point B ; 
                nous créons un moment privilégié où vous pouvez vous détendre, travailler ou simplement profiter 
                du voyage dans un environnement parfaitement adapté à vos besoins.
              </p>
              <ul className="philosophy-list">
                <li>
                  <span className="list-marker">01</span>
                  <div>
                    <h4>Écoute attentive</h4>
                    <p>Nous prenons le temps de comprendre vos besoins spécifiques pour personnaliser notre service.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">02</span>
                  <div>
                    <h4>Anticipation</h4>
                    <p>Nous anticipons chaque détail pour que votre expérience soit parfaitement fluide et sans stress.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">03</span>
                  <div>
                    <h4>Excellence constante</h4>
                    <p>Notre engagement envers la qualité se reflète dans chaque aspect de notre service, du début à la fin.</p>
                  </div>
                </li>
                <li>
                  <span className="list-marker">04</span>
                  <div>
                    <h4>Évolution continue</h4>
                    <p>Nous cherchons constamment à nous améliorer et à innover pour dépasser vos attentes.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={teamRef} className={`service-details team-section ${teamVisible ? 'animate' : ''}`}>
        <div className="container">
          <h2 className="fade-in">NOTRE ÉQUIPE</h2>
          <p className="subtitle fade-in">Des professionnels dévoués qui donnent vie à notre vision</p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`team-card ${teamVisible ? 'visible' : ''}`}
                style={{animationDelay: `${0.2 * index}s`}}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h3>Prêt à découvrir la différence ?</h3>
            <p>Faites l'expérience d'un service de transport qui dépasse toutes vos attentes</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contactez-nous
              </Link>
              <Link to="/flotte-vehicules" className="btn btn-outline">
                <i className="fas fa-car"></i>
                Découvrir notre flotte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;