const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rateCost: {
    type: String,
  },
  rateQuality: {
    type: String,
  },
  rateSatis: {
    type: String,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model('Rate', rateSchema);
