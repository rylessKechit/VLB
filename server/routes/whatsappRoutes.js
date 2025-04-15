// server/routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();

// @route   GET /api/whatsapp/status
// @desc    Obtenir le statut de la connexion WhatsApp
// @access  Admin
router.get('/status', (req, res) => {
  try {
    const status = whatsappService.getStatus();
    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route   POST /api/whatsapp/restart
// @desc    Redémarrer le client WhatsApp
// @access  Admin
router.post('/restart', async (req, res) => {
  try {
    const result = await whatsappService.restart();
    res.status(200).json({
      success: result.success,
      message: result.success ? 'Client WhatsApp redémarré' : result.error
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route   POST /api/whatsapp/send-test
// @desc    Envoyer un message de test
// @access  Admin
router.post('/send-test', async (req, res) => {
  const { phoneNumber, message } = req.body;
  
  if (!phoneNumber || !message) {
    return res.status(400).json({
      success: false,
      error: 'Le numéro de téléphone et le message sont requis'
    });
  }
  
  try {
    const result = await whatsappService.sendMessage(phoneNumber, message);
    res.status(200).json({
      success: result.success,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;