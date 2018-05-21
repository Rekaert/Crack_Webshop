const User = require('../models/user');

/**
 * @module User
 */
module.exports = {
  /**
   * Function to get user
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} The logged in user
   */
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * Function to get all users
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Array} - The list of users
   */
  all: (req, res) => {
    User.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  /**
   * Function to register a new user
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @prop username - The name of the user
   * @prop email - The email address of the user
   * @prop szmlcím - The address where the bill is sentű
   * @prop szallcím - The address where the product is transported
   * @prop tel - The telephone number of the user
   * @prop perm - The permission status of the user or admin
   * @returns {Object} - Success message, Registered user
   */
  register: (req, res) => {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        szmlcim: req.body.szmlcim,
        szallcim: req.body.szallcim,
        tel: req.body.tel,
        perm: req.body.perm,
      }), req.body.password)
      .then(() => res.json({
        success: 'Sikeres regisztráció',
        user: req.body,
      }))
      .catch(err => res.send(err));
  },

  /**
   * Function to update a users properties
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param id - The id of the user
   * @returns {Object} - The user before the update
   * new:true - mongoose document - http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate -
   * "new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)"
   */
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (err, doc) => {
      if (doc && req.body.newpassword) {
        doc.changePassword(req.body.oldpassword, req.body.newpassword, () => {
          doc.save();
        });
      }
      if (err) {
        res.send(err);
      }

      res.json(doc);
    });
  },

  /**
   * Function to delete a user
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param id - The id of the user
   * @returns {Object} - The deleted user
   */
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  /**
   * Function to log a user in
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - Success message
   */
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
    user: req.body,
  }),


  /**
   * Function to log a user out
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - Success message
   */
  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};
