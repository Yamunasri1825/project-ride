const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ride', rideSchema);