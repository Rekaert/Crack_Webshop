/**
 * Load modules
 */
const User = require('../models/user');

module.exports = {
  /**
   * Function to get user
   */
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * Function to get all users
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
   */
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      post.changePassword(req.body.oldpassword, req.body.newpassword, () => {
        post.save();
      });
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  /**
   * Function to delete a user
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
   */
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),


  /**
   * Function to log a user out
   */
  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};
