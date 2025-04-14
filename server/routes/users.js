const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Importer les contrôleurs (à développer ultérieurement)
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes accessibles uniquement aux administrateurs
router.route('/')
  .get(authorize('admin'), getUsers);

router.route('/:id')
  .get(authorize('admin'), getUser)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;