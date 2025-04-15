import { useState, useEffect, useRef } from 'react';
import '../../styles/components/AddressInput.css';

const AddressInput = ({ id, value, onChange, onSelect, placeholder }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Charger le script Google Maps si nécessaire
  useEffect(() => {
    // Variable to track if the component is still mounted
    let isMounted = true;
    
    // Fonction pour charger l'API Google Maps
    const loadGoogleMapsScript = () => {
      // Vérifie si le script n'est pas déjà chargé
      if (window.google && window.google.maps && window.google.maps.places) {
        if (isMounted) {
          setIsInitialized(true);
        }
        return;
      }
      
      // Vérifie si le script est déjà en cours de chargement
      if (window.googleMapsScriptLoading) {
        // Attendre que le script soit chargé
        const checkLoaded = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.places) {
            clearInterval(checkLoaded);
            if (isMounted) {
              setIsInitialized(true);
            }
          }
        }, 100);
        return;
      }
      
      // Marquer le script comme en cours de chargement
      window.googleMapsScriptLoading = true;
      
      // Créer une fonction de callback globale
      window.initGoogleMapsAutocomplete = () => {
        window.googleMapsScriptLoading = false;
        if (isMounted) {
          setIsInitialized(true);
        }
      };
      
      // Charger le script
      const script = document.createElement('script');
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };
    
    loadGoogleMapsScript();
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);
  
  // Initialiser l'autocomplete quand l'API est chargée
  useEffect(() => {
    if (isInitialized && inputRef.current && !autocompleteRef.current) {
      try {
        // Créer l'autocomplete
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'fr' },
          fields: ['address_components', 'formatted_address', 'place_id', 'geometry']
        });
        
        // Ajouter l'événement de sélection
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.place_id) {
            onChange(place.formatted_address || '');
            onSelect(place.formatted_address || '', place.place_id);
          }
        });
        
        console.log(`Autocomplete initialized for ${id}`);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'autocomplete:', error);
      }
    }
  }, [isInitialized, id, onChange, onSelect]);
  
  // Réinitialisation de l'autocomplete si la valeur est effacée
  useEffect(() => {
    if (value === '' && autocompleteRef.current) {
      // Ne pas réinitialiser l'autocomplete, juste vider l'input
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [value]);
  
  return (
    <div className="address-input">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="address-field"
      />
    </div>
  );
};

export default AddressInput;