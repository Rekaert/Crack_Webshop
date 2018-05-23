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
  quantity: {
    type: String,
    default: 0,
  },
  cost: {
    type: String,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
