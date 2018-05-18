const Rate = require('../models/rate');

/**
 * @module Rate
 */
module.exports = {
  list: (req, res) => {
    Rate.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  find: (req, res) => {
    Rate.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  create: (req, res) => {
    Rate.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  update: (req, res) => {
    Rate.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  remove: (req, res) => {
    Rate.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },
};
