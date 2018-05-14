const User = require('../models/user');

module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },
  all: (req, res) => {
    User.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
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
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
  login: (req, res) => res.json({
    success: 'Sikeres belépés',
  }),

  logout: (req, res) => {
    req.logout();
    res.json({
      success: 'Sikeres kilépés',
    });
  },
};
