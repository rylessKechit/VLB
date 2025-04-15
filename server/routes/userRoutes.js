const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Register user
router.post('/register', userController.register);

// @route   POST /api/users/login
// @desc    Login user
router.post('/login', userController.login);

// @route   GET /api/users/profile
// @desc    Get user profile
router.get('/profile', userController.getProfile);

// @route   PUT /api/users/profile
// @desc    Update profile
router.put('/profile', userController.updateProfile);

module.exports = router;