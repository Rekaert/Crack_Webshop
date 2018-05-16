const mongoose = require('mongoose');


/**
 * Setting order schema for MongoDB datebase
 * @param userId - Identicator for user
 * @param productId - Identicator for product
 * @param quantity - How much products are ordered
 * @param price - The price of the ordered products
 */
const order2Schema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order2', order2Schema);