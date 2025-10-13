const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: String,
  medium: String,
  theme: String,
  price: Number,
  url: String // file/url path to image
});

module.exports = mongoose.model('Artwork', artworkSchema);
