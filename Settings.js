const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'AVTOELON.UZ' },
  supportPhone: { type: String, default: '+998 71 200-00-00' },
  usdRate: { type: Number, default: 12800 }
});

module.exports = mongoose.model('Settings', settingsSchema);
