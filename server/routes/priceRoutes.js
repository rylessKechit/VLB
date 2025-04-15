const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// @route   POST /api/price/estimate
// @desc    Calculate price estimate
router.post('/estimate', priceController.calculatePriceEstimate);

module.exports = router;