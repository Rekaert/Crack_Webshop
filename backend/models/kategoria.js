const mongoose = require('mongoose');

const kategoriaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imgLink: {
    type: String,
  },
});
module.exports = mongoose.model('Kategoria', kategoriaSchema);
