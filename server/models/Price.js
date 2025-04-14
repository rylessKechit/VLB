const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ['standard', 'airport', 'longDistance', 'vip'],
    required: true
  },
  basePrice: {
    type: Number,
    required: [true, 'Le prix de base est requis']
  },
  pricePerKm: {
    type: Number,
    required: [true, 'Le prix par kilomètre est requis']
  },
  minimumPrice: {
    type: Number,
    required: [true, 'Le prix minimum est requis']
  },
  // Tarifs spéciaux pour certains aéroports ou gares
  specialDestinations: [
    {
      name: {
        type: String,
        required: true
      },
      fixedPrice: {
        type: Number,
        required: true
      }
    }
  ],
  // Pourcentage de supplément pour les heures creuses (nuit, week-end, jours fériés)
  nightSurcharge: {
    type: Number,
    default: 0
  },
  weekendSurcharge: {
    type: Number,
    default: 0
  },
  holidaySurcharge: {
    type: Number,
    default: 0
  },
  // Pourcentage de réduction pour les trajets aller-retour
  roundTripDiscount: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour la date de modification
PriceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Price', PriceSchema);