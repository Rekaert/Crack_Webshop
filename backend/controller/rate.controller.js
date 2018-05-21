const Rate = require('../models/rate');

/**
 * @module Rate
 */
module.exports = {

  /**
   * Function to list all ratings
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Array} - The list of all the ratings
   */
  list: (req, res) => {
    Rate.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },


  /**
   * Function to find a rating
   * @param {Number} id - The id property of the rating
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The found rating
   */
  find: (req, res) => {
    Rate.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },


  /**
   * Function to create a rating
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The created rating
   */
  create: (req, res) => {
    Rate.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },


  /**
   * Function to update a rating
   * @param {Number} id - The id property of the rating
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The updated rating
   */
  update: (req, res) => {
    Rate.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },


  /**
   * Function to delete a rating
   * @param {Number} id - The id property of the rating
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The deleted rating
   */
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
