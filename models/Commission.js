const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  artworkType: String,
  budget: String,
  description: String,
  referenceImage: String // store filename if uploaded
});

module.exports = mongoose.model('Commission', commissionSchema);