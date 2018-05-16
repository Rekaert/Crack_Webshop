const mongoose = require('mongoose');


/**
 * Setting order schema for MongoDB datebase
 * @param userId - Identicator for user
 * @param productId - Identicator for product
 * @param quantity - How much products are ordered
 * @param cost - The cost of the ordered products
 */
const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
