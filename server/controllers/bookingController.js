const Booking = require('../models/Booking');
const Price = require('../models/Price');
const { Client } = require('@googlemaps/google-maps-services-js');

// Initialiser le client Google Maps
const googleMapsClient = new Client({});

// @desc    Calculer le prix d'un trajet
// @route   POST /api/bookings/calculate-price
// @access  Public
exports.calculatePrice = async (req, res) => {
  try {
    const { origin, destination, serviceType = 'standard' } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir une adresse de départ et d\'arrivée'
      });
    }

    // Obtenir les tarifs en vigueur
    const priceModel = await Price.findOne({ serviceType, active: true });

    if (!priceModel) {
      return res.status(404).json({
        success: false,
        message: 'Tarifs non disponibles pour ce type de service'
      });
    }

    // Vérifier si la destination est une destination spéciale avec prix fixe
    const specialDestination = priceModel.specialDestinations.find(
      dest => destination.toLowerCase().includes(dest.name.toLowerCase())
    );

    if (specialDestination) {
      return res.status(200).json({
        success: true,
        estimatedPrice: specialDestination.fixedPrice,
        distance: 0, // La distance est fixe pour ces destinations
        duration: 0  // La durée est fixe pour ces destinations
      });
    }

    // Calculer la distance et la durée du trajet avec l'API Google Maps
    const response = await googleMapsClient.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        mode: 'driving',
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });

    if (
      !response.data.rows[0].elements[0] ||
      response.data.rows[0].elements[0].status !== 'OK'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de calculer la distance entre ces adresses'
      });
    }

    // Extraire les informations de distance et de durée
    const distance = response.data.rows[0].elements[0].distance.value / 1000; // Convertir en kilomètres
    const duration = Math.ceil(response.data.rows[0].elements[0].duration.value / 60); // Convertir en minutes

    // Calculer le prix estimé
    let estimatedPrice = priceModel.basePrice + (distance * priceModel.pricePerKm);

    // Appliquer le prix minimum si nécessaire
    if (estimatedPrice < priceModel.minimumPrice) {
      estimatedPrice = priceModel.minimumPrice;
    }

    // Arrondir le prix à l'euro supérieur
    estimatedPrice = Math.ceil(estimatedPrice);

    res.status(200).json({
      success: true,
      estimatedPrice,
      distance: Math.round(distance * 10) / 10, // Arrondir à 1 décimale
      duration
    });
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du calcul du prix',
      error: error.message
    });
  }
};

// @desc    Créer une nouvelle réservation
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      serviceType,
      roundTrip,
      specialRequests,
      estimatedPrice,
      distance,
      duration
    } = req.body;

    // Créer la réservation
    const booking = await Booking.create({
      // Si l'utilisateur est connecté, associer la réservation à son compte
      user: req.user ? req.user.id : null,
      firstName,
      lastName,
      email,
      phone,
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      serviceType,
      roundTrip,
      specialRequests,
      estimatedPrice,
      distance,
      duration,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Envoyer un email de confirmation (à implémenter)
    // sendBookingConfirmationEmail(booking);

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réservation',
      error: error.message
    });
  }
};

// @desc    Obtenir toutes les réservations
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = async (req, res) => {
  try {
    // Si l'utilisateur est un admin, récupérer toutes les réservations
    // Sinon, récupérer uniquement les réservations de l'utilisateur
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 }) // Tri par date de création (plus récent d'abord)
      .populate('user', 'firstName lastName email');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des réservations',
      error: error.message
    });
  }
};

// @desc    Obtenir une réservation par ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier si l'utilisateur est autorisé à accéder à cette réservation
    if (req.user.role !== 'admin' && (!booking.user || booking.user.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à accéder à cette réservation'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la réservation',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le statut d'une réservation
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Mettre à jour le statut
    booking.status = status;
    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut de la réservation',
      error: error.message
    });
  }
};

// @desc    Annuler une réservation
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée'
      });
    }

    // Vérifier si l'utilisateur est autorisé à annuler cette réservation
    if (req.user.role !== 'admin' && (!booking.user || booking.user.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à annuler cette réservation'
      });
    }

    // Vérifier si la réservation peut être annulée
    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: `La réservation ne peut pas être annulée car elle est déjà ${booking.status === 'completed' ? 'terminée' : 'annulée'}`
      });
    }

    // Mettre à jour le statut
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'annulation de la réservation',
      error: error.message
    });
  }
};