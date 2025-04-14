const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe, 
  logout, 
  updatePassword 
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;