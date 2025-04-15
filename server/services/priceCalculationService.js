class PriceCalculationService {
    // Constants for price calculation
    static BASE_FARE = 5.0; // Base fare in EUR
    static PRICE_PER_KM = 1.5; // Price per kilometer in EUR
    static PRICE_PER_MINUTE = 0.5; // Price per minute in EUR
    static NIGHT_RATE_MULTIPLIER = 1.3; // 30% increase for night rides
    static WEEKEND_RATE_MULTIPLIER = 1.2; // 20% increase for weekend rides
    static LUGGAGE_PRICE = 2.0; // Additional price per luggage
    static ROUND_TRIP_DISCOUNT = 0.9; // 10% discount for round trips
  
    /**
     * Calculate ride price based on various factors
     * @param {Object} params - Price calculation parameters
     * @param {Object} params.distance - Distance object with value in meters
     * @param {Object} params.duration - Duration object with value in seconds
     * @param {Date} params.pickupDateTime - Pickup date and time
     * @param {number} params.passengers - Number of passengers
     * @param {number} params.luggage - Number of luggage pieces
     * @param {boolean} params.roundTrip - Whether the ride is a round trip
     * @returns {Object} Price details
     */
    static calculatePrice({
      distance,
      duration,
      pickupDateTime,
      passengers,
      luggage,
      roundTrip,
    }) {
      // Convert distance from meters to kilometers
      const distanceInKm = distance.value / 1000;
      
      // Convert duration from seconds to minutes
      const durationInMinutes = duration.value / 60;
      
      // Calculate base price based on distance and duration
      const distancePrice = distanceInKm * this.PRICE_PER_KM;
      const timePrice = durationInMinutes * this.PRICE_PER_MINUTE;
      let totalPrice = this.BASE_FARE + distancePrice + timePrice;
      
      // Add price for luggage
      if (luggage > 0) {
        totalPrice += luggage * this.LUGGAGE_PRICE;
      }
      
      // Apply time-based multipliers (night and weekend rates)
        const hour = pickupDateTime.getHours();
        const dayOfWeek = pickupDateTime.getDay();
        
        // Apply night rate (between 10 PM and 6 AM)
        if (hour >= 22 || hour < 6) {
        totalPrice *= this.NIGHT_RATE_MULTIPLIER;
        }
        
        // Apply weekend rate (Saturday and Sunday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
        totalPrice *= this.WEEKEND_RATE_MULTIPLIER;
        }
        
        // Apply round trip discount
        if (roundTrip) {
        totalPrice *= 2 * this.ROUND_TRIP_DISCOUNT; // Multiply by 2 for round trip, then apply discount
        }
        
        // Round to 2 decimal places
        totalPrice = Math.round(totalPrice * 100) / 100;
        
        // Calculate min and max estimates (±10%)
        const minPrice = Math.round((totalPrice * 0.9) * 100) / 100;
        const maxPrice = Math.round((totalPrice * 1.1) * 100) / 100;
        
        return {
        exactPrice: totalPrice,
        minPrice,
        maxPrice,
        currency: 'EUR',
        breakdown: {
            baseFare: this.BASE_FARE,
            distanceCharge: Math.round(distancePrice * 100) / 100,
            timeCharge: Math.round(timePrice * 100) / 100,
            luggageCharge: luggage > 0 ? Math.round((luggage * this.LUGGAGE_PRICE) * 100) / 100 : 0,
            nightRate: hour >= 22 || hour < 6,
            weekendRate: dayOfWeek === 0 || dayOfWeek === 6,
            roundTripDiscount: roundTrip,
        },
        distanceInfo: {
            value: distance.value,
            text: distance.text,
        },
        durationInfo: {
            value: duration.value,
            text: duration.text,
        }
    };
  }
}

module.exports = PriceCalculationService;