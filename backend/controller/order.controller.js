const Order = require('../models/order');

module.exports = {
  list: (req, res) => {
    // így lehet keresni
    Order.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  find: (req, res) => {
    Order.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  create: (req, res) => {
    Order.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  remove: (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
};
