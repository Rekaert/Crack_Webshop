const mongoose = require('mongoose');

const kategoriaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model('Kategoria', kategoriaSchema);
