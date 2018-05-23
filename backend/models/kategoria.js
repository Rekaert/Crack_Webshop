const mongoose = require('mongoose');

const kategoriaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rank: {
    type: Number,
    default: 1,
  },

  imgLink: {
    type: String,
  },
});
module.exports = mongoose.model('Kategoria', kategoriaSchema);
