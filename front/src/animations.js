document.addEventListener('DOMContentLoaded', () => {
  // Observer config
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Créer des observateurs seulement si les éléments à observer existent
  const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item');
  
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      fadeObserver.observe(el);
    });
  }
  
  // Animation pour sections avec classe .animate
  const animateSections = document.querySelectorAll('.service-hero, .service-overview, .service-details, .booking-section');
  
  if (animateSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);
    
    animateSections.forEach(el => {
      sectionObserver.observe(el);
    });
  }
  
  // Effet parallaxe pour les images de fond
  const parallaxElements = document.querySelectorAll('.service-hero, .cta-banner');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        if (element) {  // Vérifier que l'élément existe
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const screenHeight = window.innerHeight;
          
          if (scrollY + screenHeight > elementTop && scrollY < elementTop + elementHeight) {
            const translateY = (scrollY - elementTop) * 0.3;
            element.style.backgroundPosition = `center -${translateY}px`;
          }
        }
      });
    });
  }
  
  // Animation du menu lors du défilement
  const header = document.querySelector('.header');
  
  if (header) {  // Vérifier que l'élément header existe
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animation du compteur pour les chiffres
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target') || '0');
          const duration = 2000;
          const increment = target / (duration / 16);
          
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            counter.textContent = Math.round(current).toString();
            
            if (current < target) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toString();
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
  
  // Gestion spécifique du bouton de défilement automatique
  const scrollDownButton = document.querySelector('.scroll-down-button');
  
  if (scrollDownButton) {  // Vérifier que le bouton existe
    scrollDownButton.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollDownButton.getAttribute('href');
      
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
});