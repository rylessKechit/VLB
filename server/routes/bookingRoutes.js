const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', bookingController.createBooking);

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
router.get('/:id', bookingController.getBookingById);

// @route   GET /api/bookings
// @desc    Get all bookings (admin)
router.get('/', bookingController.getAllBookings);

// @route   PUT /api/bookings/:id
// @desc    Update booking status
router.put('/:id', bookingController.updateBookingStatus);

// @route   DELETE /api/bookings/:id
// @desc    Cancel booking
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;