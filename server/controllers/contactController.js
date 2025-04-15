const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const config = require('../config/environment');

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
exports.sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate input
  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Create contact entry in database
  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: config.emailSecure,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  // Email content
  const mailOptions = {
    from: `"Taxi VLB Website" <${config.emailUser}>`,
    to: config.contactEmail,
    subject: 'Nouveau message de contact - Taxi VLB',
    html: `
        <h1>Nouveau message de contact</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `,
    };

    try {
    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
        success: true,
        data: contact,
        message: 'Votre message a été envoyé avec succès.',
    });
    } catch (error) {
    console.error('Email sending error:', error);
    
    // Even if email fails, we've stored the message in the database
    res.status(201).json({
        success: true,
        data: contact,
        message: 'Votre message a été enregistré mais l\'email n\'a pas pu être envoyé. Nous vous contacterons bientôt.',
    });
    }
});