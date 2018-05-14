const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model('Product', productsSchema);
