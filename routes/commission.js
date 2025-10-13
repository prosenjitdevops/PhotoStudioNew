const express = require('express');
const multer = require('multer');
const path = require('path');
const Commission = require('../models/Commission');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', upload.single('referenceImage'), async (req, res) => {
  try {
    const { name, email, artworkType, budget, description } = req.body;
    const referenceImage = req.file ? req.file.filename : null;
    const commission = new Commission({
      name,
      email,
      artworkType,
      budget,
      description,
      referenceImage
    });
    await commission.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;