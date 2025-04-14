import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    rating: 5,
    text: 'Service impeccable ! Ponctualité, propreté du véhicule et courtoisie du chauffeur. Je recommande vivement pour tous vos déplacements.',
    date: '15/03/2025'
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    rating: 5,
    text: 'Excellente prestation pour mon trajet vers l\'aéroport. Le chauffeur a pris en charge mes bagages et a été très professionnel tout au long du trajet.',
    date: '02/02/2025'
  },
  {
    id: 3,
    name: 'Marie Lecomte',
    rating: 5,
    text: 'Service à la hauteur de mes attentes pour mes déplacements professionnels réguliers. Ponctualité et confort sont au rendez-vous à chaque fois.',
    date: '10/01/2025'
  },
  {
    id: 4,
    name: 'Pierre Lambert',
    rating: 5,
    text: 'Très satisfait de la prestation. Le chauffeur connaît parfaitement les itinéraires et a su éviter les embouteillages. Je recommande !',
    date: '22/12/2024'
  }
];

const TestimonialCard = ({ name, rating, text, date }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <div className="h-12 w-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-2">{date}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalPages]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const visibleTestimonials = testimonials.slice(
    activeIndex * testimonialsPerPage,
    (activeIndex * testimonialsPerPage) + testimonialsPerPage
  );

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          LES AVIS ET LES TÉMOIGNAGES DE MES CLIENTS
        </h2>
        
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold">5.0</span>
            <span className="mx-2 text-gray-500 text-sm">(24)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              rating={testimonial.rating}
              text={testimonial.text}
              date={testimonial.date}
            />
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className="flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full ${
                activeIndex === index ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/search?q=taxi+vlb+verrieres+le+buisson&oq=taxi+vlb+verr&aqs=chrome.0.69i59j69i57j69i60l2.1885j0j7&sourceid=chrome&ie=UTF-8#lrd=0x47e5d86c72f652e7:0x8c0a97d0a4504e89,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-600 text-black py-2 px-6 rounded-md inline-block font-medium hover:bg-yellow-500 transition-colors"
          >
            Donnez-nous votre avis sur Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;