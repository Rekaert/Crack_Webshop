/**
 * Loading modules
 */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


/**
 * Setting user schema for MongoDB datebase
 * @param username - The name of the user
 * @param email - The email address of the user
 * @param szmlcím - The address where the bill is sent
 * @param szallcím - The address where the product is transported
 * @param tel - The telephone number of the user
 * @param perm - The permission status of the user or admin
 */
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  szmlcim: {
    type: String,
    required: true,
    unique: true,
  },
  szallcim: {
    type: String,
    required: true,
    unique: true,
  },
  tel: {
    type: String,
    required: true,
    unique: true,
  },
  perm: {
    type: String,
    unique: true,
    default: '0',
  },
}, {
  timestamps: true,
});

/**
 * Passport authentication options
 */
userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameField: 'email',
});

module.exports = mongoose.model('User', userSchema);
