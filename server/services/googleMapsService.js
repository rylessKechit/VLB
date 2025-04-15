const axios = require('axios');
const config = require('../config/environment');

class GoogleMapsService {
  static async getRouteDetails(originPlaceId, destinationPlaceId, departureTime) {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: `place_id:${originPlaceId}`,
            destination: `place_id:${destinationPlaceId}`,
            departure_time: Math.floor(departureTime.getTime() / 1000),
            traffic_model: 'best_guess',
            key: config.googleMapsApiKey,
          },
        }
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Directions API error: ${response.data.status}`);
      }

      const route = response.data.routes[0];
      const leg = route.legs[0];

      return {
        distance: {
          value: leg.distance.value, // in meters
          text: leg.distance.text,
        },
        duration: {
          value: leg.duration.value, // in seconds
          text: leg.duration.text,
          inTraffic: leg.duration_in_traffic ? leg.duration_in_traffic.value : leg.duration.value,
        },
        polyline: route.overview_polyline.points,
        startLocation: {
          lat: leg.start_location.lat,
          lng: leg.start_location.lng,
        },
        endLocation: {
          lat: leg.end_location.lat,
          lng: leg.end_location.lng,
        },
      };
    } catch (error) {
      console.error('Error fetching route details:', error);
      throw error;
    }
  }

  static async getPlaceDetails(placeId) {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/details/json',
        {
          params: {
            place_id: placeId,
            fields: 'formatted_address,geometry',
            key: config.googleMapsApiKey,
          },
        }
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      const { result } = response.data;

      return {
        address: result.formatted_address,
        location: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        },
      };
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error;
    }
  }
}

module.exports = GoogleMapsService;