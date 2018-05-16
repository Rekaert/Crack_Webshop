/**
 * Load modules
 */
const Order = require('../models/order');

module.exports = {

  /**
   * Function to get all orders
   */
  list: (req, res) => {
    // így lehet keresni
    Order.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },


  /**
   * Functioon to find an order
   */
  find: (req, res) => {
    Order.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },


  /**
   * Function to create a new order
   */
  create: (req, res) => {
    Order.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },


  /**
   * Function to update an order
   */
  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },


  /**
   * Functiopn to delete on order
   */
  remove: (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },
};
