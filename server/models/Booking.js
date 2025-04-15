const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  pickupAddress: {
    text: {
      type: String,
      required: [true, 'Please provide pickup address'],
    },
    placeId: {
      type: String,
      required: [true, 'Place ID is required'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  dropoffAddress: {
    text: {
      type: String,
      required: [true, 'Please provide dropoff address'],
    },
    placeId: {
      type: String,
      required: [true, 'Place ID is required'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  pickupDateTime: {
    type: Date,
    required: [true, 'Please provide pickup date and time'],
  },
  passengers: {
    type: Number,
    required: [true, 'Please provide number of passengers'],
    min: 1,
    max: 7,
  },
  luggage: {
    type: Number,
    required: true,
    default: 0,
  },
  roundTrip: {
    type: Boolean,
    default: false,
  },
  returnDateTime: {
    type: Date,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'EUR',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    specialRequests: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);