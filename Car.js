const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  priceUsd: { type: Number, required: true },
  priceUzs: { type: Number, required: true },
  color: { type: String, required: true },
  mileage: { type: Number, required: true },
  engineSize: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  region: { type: String, required: true },
  phone: { type: String, required: true },
  sellerName: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
