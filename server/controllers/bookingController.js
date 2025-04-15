const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const GoogleMapsService = require('../services/googleMapsService');
const nodemailer = require('nodemailer');
const config = require('../config/environment');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res) => {
  const {
    pickupAddress,
    pickupPlaceId,
    dropoffAddress,
    dropoffPlaceId,
    pickupDateTime,
    passengers,
    luggage,
    roundTrip,
    returnDateTime,
    price,
    customerInfo,
  } = req.body;

  // Validate required fields
  if (!pickupAddress || !pickupPlaceId || !dropoffAddress || !dropoffPlaceId || !pickupDateTime || !price || !customerInfo) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  try {
    // Get location coordinates from Google Maps
    const pickupDetails = await GoogleMapsService.getPlaceDetails(pickupPlaceId);
    const dropoffDetails = await GoogleMapsService.getPlaceDetails(dropoffPlaceId);

    // Create booking
    const booking = await Booking.create({
      pickupAddress: {
        text: pickupAddress,
        placeId: pickupPlaceId,
        location: {
          type: 'Point',
          coordinates: [pickupDetails.location.lng, pickupDetails.location.lat],
        },
      },
      dropoffAddress: {
        text: dropoffAddress,
        placeId: dropoffPlaceId,
        location: {
          type: 'Point',
          coordinates: [dropoffDetails.location.lng, dropoffDetails.location.lat],
        },
      },
      pickupDateTime: new Date(pickupDateTime),
      passengers: passengers || 1,
      luggage: luggage || 0,
      roundTrip: roundTrip || false,
      returnDateTime: returnDateTime ? new Date(returnDateTime) : undefined,
      price: {
        amount: price.amount,
        currency: price.currency || 'EUR',
      },
      customerInfo,
    });

    // Format date and time for notifications
    const formattedPickupDate = new Date(pickupDateTime).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    
    const formattedPickupTime = new Date(pickupDateTime).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: config.emailPort,
      secure: config.emailSecure,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    // Email to driver
    const driverMailOptions = {
      from: `"Taxi VLB Website" <${config.emailUser}>`,
      to: config.driverEmail,
      subject: 'Nouvelle réservation de course',
      html: `
        <h1>Nouvelle réservation de course</h1>
        <p><strong>Référence:</strong> ${booking._id}</p>
        <p><strong>Client:</strong> ${customerInfo.name}</p>
        <p><strong>Téléphone:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <h2>Détails de la course</h2>
        <p><strong>Adresse de départ:</strong> ${pickupAddress}</p>
        <p><strong>Adresse d'arrivée:</strong> ${dropoffAddress}</p>
        <p><strong>Date:</strong> ${formattedPickupDate}</p>
        <p><strong>Heure:</strong> ${formattedPickupTime}</p>
        <p><strong>Passagers:</strong> ${passengers || 1}</p>
        <p><strong>Bagages:</strong> ${luggage || 0}</p>
        <p><strong>Aller-retour:</strong> ${roundTrip ? 'Oui' : 'Non'}</p>
        ${roundTrip && returnDateTime ? `<p><strong>Date de retour:</strong> ${new Date(returnDateTime).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>` : ''}
        ${roundTrip && returnDateTime ? `<p><strong>Heure de retour:</strong> ${new Date(returnDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>` : ''}
        <p><strong>Prix:</strong> ${price.amount} ${price.currency}</p>
        ${customerInfo.specialRequests ? `<p><strong>Demandes spéciales:</strong> ${customerInfo.specialRequests}</p>` : ''}
      `,
    };

    // Email to customer
    const customerMailOptions = {
      from: `"Taxi VLB" <${config.emailUser}>`,
      to: customerInfo.email,
      subject: 'Confirmation de votre réservation - Taxi VLB',
      html: `
        <h1>Confirmation de votre réservation</h1>
        <p>Bonjour ${customerInfo.name},</p>
        <p>Nous vous confirmons la réservation de votre course avec Taxi VLB.</p>
        <h2>Détails de votre course</h2>
        <p><strong>Référence:</strong> ${booking._id}</p>
        <p><strong>Adresse de départ:</strong> ${pickupAddress}</p>
        <p><strong>Adresse d'arrivée:</strong> ${dropoffAddress}</p>
        <p><strong>Date:</strong> ${formattedPickupDate}</p>
        <p><strong>Heure:</strong> ${formattedPickupTime}</p>
        <p><strong>Passagers:</strong> ${passengers || 1}</p>
        <p><strong>Bagages:</strong> ${luggage || 0}</p>
        <p><strong>Aller-retour:</strong> ${roundTrip ? 'Oui' : 'Non'}</p>
        ${roundTrip && returnDateTime ? `<p><strong>Date de retour:</strong> ${new Date(returnDateTime).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>` : ''}
        ${roundTrip && returnDateTime ? `<p><strong>Heure de retour:</strong> ${new Date(returnDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>` : ''}
        <p><strong>Prix estimé:</strong> ${price.amount} ${price.currency}</p>
        <p>Votre chauffeur sera à l'adresse indiquée à l'heure prévue. Vous recevrez un SMS de confirmation avant la course.</p>
        <p>Pour toute modification ou annulation, veuillez nous contacter au plus tôt au <a href="tel:+33600000000">+33 6 00 00 00 00</a>.</p>
        <p>Merci de votre confiance et à bientôt,</p>
        <p>L'équipe Taxi VLB</p>
      `,
    };

    // Send emails
    await transporter.sendMail(driverMailOptions);
    await transporter.sendMail(customerMailOptions);

    // Envoyer une notification WhatsApp
    if (config.whatsappNotificationsEnabled) {
      // Créer le message WhatsApp
      const whatsappMessage = `
🚖 *NOUVELLE RÉSERVATION* 🚖

*Référence:* ${booking._id}
*Client:* ${customerInfo.name}
*Téléphone:* ${customerInfo.phone}
*Email:* ${customerInfo.email}

*DÉTAILS DE LA COURSE*
*Départ:* ${pickupAddress}
*Destination:* ${dropoffAddress}
*Date:* ${formattedPickupDate}
*Heure:* ${formattedPickupTime}
*Passagers:* ${passengers || 1}
*Bagages:* ${luggage || 0}
*Aller-retour:* ${roundTrip ? 'Oui' : 'Non'}
*Prix:* ${price.amount} ${price.currency}

${customerInfo.specialRequests ? `*Demandes spéciales:* ${customerInfo.specialRequests}` : ''}
`;

      try {
        // Vérifier que le service WhatsApp est prêt
        const whatsappStatus = whatsappService.getStatus();
        
        if (whatsappStatus.isReady) {
          // Envoyer le message via whatsapp-web.js
          const result = await whatsappService.sendMessage(config.driverPhoneNumber, whatsappMessage);
          
          if (result.success) {
            console.log('Notification WhatsApp envoyée avec succès');
          } else {
            console.warn('Impossible d\'envoyer la notification WhatsApp:', result.error);
          }
        } else {
          console.warn(`Service WhatsApp non prêt (${whatsappStatus.status}). Notification non envoyée.`);
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de la notification WhatsApp:', error);
        // Ne pas échouer la réponse si la notification WhatsApp échoue
      }
    }

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation.',
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500);
    throw new Error(`Failed to create booking: ${error.message}`);
  }
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Public
exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = asyncHandler(async (req, res) => {
  // Add pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  
  // Filter options
  const filterOptions = {};
  
  if (req.query.status) {
    filterOptions.status = req.query.status;
  }
  
  if (req.query.date) {
    const startDate = new Date(req.query.date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(req.query.date);
    endDate.setHours(23, 59, 59, 999);
    
    filterOptions.pickupDateTime = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const bookings = await Booking.find(filterOptions)
    .sort({ pickupDateTime: -1 })
    .limit(limit)
    .skip(startIndex);

  const total = await Booking.countDocuments(filterOptions);

  res.status(200).json({
    success: true,
    count: bookings.length,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
    data: bookings,
  });
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  booking.status = status;
  
  if (status === 'confirmed') {
    // Send confirmation email/SMS to customer
    // Implementation would go here
  }

  await booking.save();

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Public (with validation)
exports.cancelBooking = asyncHandler(async (req, res) => {
  const { email, bookingReference } = req.body;

  if (!email || !bookingReference) {
    res.status(400);
    throw new Error('Please provide email and booking reference');
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Validate customer email
  if (booking.customerInfo.email !== email) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  // Check if cancellation is allowed (e.g., not too close to pickup time)
  const now = new Date();
  const pickupTime = new Date(booking.pickupDateTime);
  const hoursDifference = (pickupTime - now) / (1000 * 60 * 60);

  if (hoursDifference < 2) {
    res.status(400);
    throw new Error('Cancellation is only allowed at least 2 hours before pickup time');
  }

  booking.status = 'cancelled';
  await booking.save();

  // Send cancellation email
  // Implementation would go here

  res.status(200).json({
    success: true,
    message: 'Booking cancelled successfully',
  });
});