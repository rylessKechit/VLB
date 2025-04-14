const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Permettre les réservations sans compte utilisateur
  },
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis']
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir un email valide'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis']
  },
  pickupAddress: {
    type: String,
    required: [true, 'L\'adresse de départ est requise']
  },
  dropoffAddress: {
    type: String,
    required: [true, 'L\'adresse d\'arrivée est requise']
  },
  pickupDate: {
    type: Date,
    required: [true, 'La date de départ est requise']
  },
  pickupTime: {
    type: String,
    required: [true, 'L\'heure de départ est requise']
  },
  passengers: {
    type: Number,
    required: [true, 'Le nombre de passagers est requis'],
    min: [1, 'Au moins 1 passager est requis'],
    max: [7, 'Maximum 7 passagers autorisés']
  },
  luggage: {
    type: Number,
    default: 0
  },
  serviceType: {
    type: String,
    enum: ['standard', 'airport', 'longDistance', 'vip'],
    default: 'standard'
  },
  roundTrip: {
    type: Boolean,
    default: false
  },
  specialRequests: {
    type: String
  },
  estimatedPrice: {
    type: Number,
    required: [true, 'Le prix estimé est requis']
  },
  distance: {
    type: Number,
    required: [true, 'La distance est requise']
  },
  duration: {
    type: Number,
    required: [true, 'La durée est requise']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'paypal', ''],
    default: ''
  },
  bookingReference: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour générer une référence de réservation unique avant l'enregistrement
BookingSchema.pre('save', async function(next) {
  if (!this.isNew) {
    return next();
  }

  // Générer une référence unique (format: TB-YYMMDD-XXXX)
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 chiffres aléatoires

  this.bookingReference = `VLB-${year}${month}${day}-${randomPart}`;
  
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);