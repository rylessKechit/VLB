const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Chargement des variables d'environnement
dotenv.config();

// Importation des routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Configuration de la connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB établie avec succès');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

// Connexion à la base de données
connectDB();

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Si nous sommes en production, servir les fichiers statiques du frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../front/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/build', 'index.html'));
  });
}

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';
  
  res.status(statusCode).json({
    success: false,
    error: message
  });
});

// Définition du port et démarrage du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});