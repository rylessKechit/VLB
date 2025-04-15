require('dotenv').config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',

  // Email configuration
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE === 'true',
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  contactEmail: process.env.CONTACT_EMAIL,
  driverEmail: process.env.DRIVER_EMAIL,
  
  // WhatsApp configuration
  whatsappNotificationsEnabled: process.env.WHATSAPP_NOTIFICATIONS_ENABLED === 'true',
  driverPhoneNumber: process.env.DRIVER_PHONE_NUMBER || '33600000000',
};