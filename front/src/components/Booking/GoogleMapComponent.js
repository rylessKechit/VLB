import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 48.7485, // Coordonnées approximatives de Verrières-le-Buisson
  lng: 2.2636
};

const libraries = ['places', 'directions'];

const GoogleMapComponent = ({ origin, destination }) => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState(defaultCenter);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // Calculer l'itinéraire entre l'origine et la destination
  const calculateRoute = useCallback(async () => {
    if (!origin || !destination || !isLoaded) return;

    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      });

      setDirectionsResponse(result);

      // Mise à jour des marqueurs
      const newMarkers = [
        {
          position: result.routes[0].legs[0].start_location,
          label: 'A',
          title: 'Point de départ'
        },
        {
          position: result.routes[0].legs[0].end_location,
          label: 'B',
          title: 'Point d\'arrivée'
        }
      ];

      setMarkers(newMarkers);

      // Centrer la carte sur la position moyenne
      if (result.routes[0] && result.routes[0].bounds) {
        const bounds = result.routes[0].bounds;
        const center = {
          lat: (bounds.getSouthWest().lat() + bounds.getNorthEast().lat()) / 2,
          lng: (bounds.getSouthWest().lng() + bounds.getNorthEast().lng()) / 2
        };
        setCenter(center);
      }
    } catch (error) {
      console.error('Erreur lors du calcul de l\'itinéraire:', error);
    }
  }, [origin, destination, isLoaded]);

  // Calculer l'itinéraire lorsque l'origine ou la destination change
  useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div className="flex items-center justify-center h-full">Erreur de chargement de Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Chargement de la carte...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Afficher les marqueurs si pas d'itinéraire */}
      {!directionsResponse && markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          label={marker.label}
          title={marker.title}
        />
      ))}
      
      {/* Afficher l'itinéraire s'il est calculé */}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            polylineOptions: {
              strokeColor: '#FFC107',
              strokeWeight: 6
            },
            suppressMarkers: false
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;