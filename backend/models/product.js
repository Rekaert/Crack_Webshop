const mongoose = require('mongoose');


/**
 * Setting product schema for MongoDB datebase
 * @param name - The name of the product
 * @param url - Userfriendly search term
 * @param image - The path for the image for the product - not required
 * @param cost - The cost of one product
 */
const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
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
}, {
  timestamps: true,
});
module.exports = mongoose.model('Product', productsSchema);
