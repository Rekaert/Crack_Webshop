const Kategoria = require('../models/kategoria');

/**
 * @module Kategoria
 */
module.exports = {
  list: (req, res) => {
    Kategoria.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  find: (req, res) => {
    Kategoria.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  create: (req, res) => {
    Kategoria.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  update: (req, res) => {
    Kategoria.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  remove: (req, res) => {
    Kategoria.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },
};
