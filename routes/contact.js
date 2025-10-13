const express = require('express');
const router = express.Router();

// Import Contact Mongoose model
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.json({ success: true, message: 'Thank you! We will get back to you shortly.' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
});

module.exports = router;
