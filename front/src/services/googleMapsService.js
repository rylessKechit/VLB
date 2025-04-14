import axios from 'axios';

// Clé API Google Maps (à remplacer par la vôtre)
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Autocomplete pour les adresses
export const getPlacePredictions = async (input, setResults) => {
  if (!input || input.length < 3) {
    setResults([]);
    return;
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&components=country:fr&key=${API_KEY}`
    );

    if (response.data.predictions) {
      setResults(response.data.predictions);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des prédictions:', error);
    setResults([]);
  }
};

// Obtenir les détails d'un lieu à partir de son place_id
export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry&key=${API_KEY}`
    );

    if (response.data.result) {
      return response.data.result;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du lieu:', error);
    return null;
  }
};

// Obtenir un itinéraire entre deux adresses
export const getDirections = async (origin, destination) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=driving&key=${API_KEY}`
    );

    if (response.data.routes && response.data.routes.length > 0) {
      return response.data.routes[0];
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'itinéraire:', error);
    return null;
  }
};

// Géocoder une adresse pour obtenir ses coordonnées
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    );

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors du géocodage de l\'adresse:', error);
    return null;
  }
};