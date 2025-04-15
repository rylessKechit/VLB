// server/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const priceRoutes = require('./routes/priceRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pour servir les fichiers QR code générés par WhatsApp
app.use('/public', express.static(path.join(__dirname, 'public')));

// Define Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

module.exports = app;