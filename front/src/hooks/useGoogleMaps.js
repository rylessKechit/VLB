import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    // Si l'API est déjà chargée
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Variable pour suivre si le composant est monté
    let isMounted = true;

    const loadScript = () => {
      // Vérifier si le script est déjà en cours de chargement
      if (window.googleMapsScriptLoading) {
        // Attendre que l'API soit chargée
        const checkIfLoaded = setInterval(() => {
          if (window.googleMapsLoaded && isMounted) {
            setIsLoaded(true);
            clearInterval(checkIfLoaded);
          }
        }, 100);
        return;
      }

      // Vérifier si le script est déjà présent
      if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        setIsLoaded(true);
        return;
      }

      // Marquer comme en cours de chargement
      window.googleMapsScriptLoading = true;

      // Créer une fonction de callback globale
      window.initGoogleMapsApi = () => {
        if (isMounted) {
          setIsLoaded(true);
        }
        window.googleMapsLoaded = true;
        window.googleMapsScriptLoading = false;
      };

      const script = document.createElement('script');
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsApi`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        if (isMounted) {
          setLoadError(new Error('Failed to load Google Maps API'));
        }
        window.googleMapsScriptLoading = false;
      };
      
      document.head.appendChild(script);
    };

    loadScript();

    // Nettoyer lorsque le composant est démonté
    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoaded, loadError };
};

export default useGoogleMaps;