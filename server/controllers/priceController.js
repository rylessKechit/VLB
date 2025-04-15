const asyncHandler = require('express-async-handler');
const GoogleMapsService = require('../services/googleMapsService');
const PriceCalculationService = require('../services/priceCalculationService');

// @desc    Calculate price estimate
// @route   POST /api/price/estimate
// @access  Public
exports.calculatePriceEstimate = asyncHandler(async (req, res) => {
  const {
    pickupPlaceId,
    dropoffPlaceId,
    pickupDateTime,
    passengers,
    luggage,
    roundTrip,
  } = req.body;

  if (!pickupPlaceId || !dropoffPlaceId || !pickupDateTime) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  try {
    // Get route details from Google Maps
    const routeDetails = await GoogleMapsService.getRouteDetails(
      pickupPlaceId,
      dropoffPlaceId,
      new Date(pickupDateTime)
    );

    // Calculate price based on distance, duration, and other factors
    const priceEstimate = PriceCalculationService.calculatePrice({
      distance: routeDetails.distance,
      duration: routeDetails.duration,
      pickupDateTime: new Date(pickupDateTime),
      passengers: passengers || 1,
      luggage: luggage || 0,
      roundTrip: roundTrip || false,
    });

    res.status(200).json({
      success: true,
      data: {
        estimate: priceEstimate,
        route: {
          distance: routeDetails.distance,
          duration: routeDetails.duration,
          polyline: routeDetails.polyline,
        },
      },
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Failed to calculate price: ${error.message}`);
  }
});