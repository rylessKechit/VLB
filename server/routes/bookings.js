const express = require('express');
const router = express.Router();
const { 
  calculatePrice,
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// Routes publiques
router.post('/calculate-price', calculatePrice);
router.post('/', createBooking);

// Routes protégées
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);
router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;