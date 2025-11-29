const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  year: { type: Number },
  genres: { type: String },
  rating: { type: Number, min: 0, max: 10 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
