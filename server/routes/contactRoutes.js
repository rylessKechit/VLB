const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Send contact message
router.post('/', contactController.sendContactMessage);

module.exports = router;