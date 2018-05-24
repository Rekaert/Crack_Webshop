const Kategoria = require('../models/kategoria');

/**
 * @module Kategóriák
 */
module.exports = {

  /**
   * Function to list all categories
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Array} - All categories
   */
  list: (req, res) => {
    Kategoria.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  /**
   * Function to find category
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Number} id - The id of the category
   * @returns {Object} - The found category
   */
  find: (req, res) => {
    Kategoria.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  /**
   * Function to create a new category
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The created category
   * @prop {String} name -The name of the new category
   */
  create: (req, res) => {
    req.body.name = req.body.name.toLowerCase();
    Kategoria.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  /**
   * Function to list all categories
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Number} id - The id of the category
   * @returns {Object} - The updated category
   * @prop {String} name -The new name of the category
   */
  update: (req, res) => {
    req.body.name = req.body.name.toLowerCase();
    Kategoria.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  /**
   * Function to list all categories
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Number} id - The id of the category
   * @returns {Object} - The deleted category
   */
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
