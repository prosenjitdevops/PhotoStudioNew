const express = require('express');
const multer = require('multer');
const path = require('path');
const Artwork = require('../models/Artwork'); // Use Mongoose model

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const artworks = await Artwork.find();
  res.json(artworks);
});

router.post('/upload', upload.single('artFile'), async (req, res) => {
  const { title, medium, theme, price } = req.body;
  const art = new Artwork({ title, medium, theme, price, url: `/uploads/${req.file.filename}` });
  await art.save();
  res.json({ success: true, art });
});

module.exports = router;
