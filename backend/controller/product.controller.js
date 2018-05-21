const Product = require('../models/product');
const fs = require('fs');
const request = require('request');

const filePath = './public/img/';

/**
 * @function deleteFile - Function to delete the saved image of a product 
 */
function deleteFile(fileName) {
  fs.unlinkSync(filePath + fileName);
}

/**
 * @module Product
 */
module.exports = {


  /**
   * Function to list all products
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Array} - The list of all the products
   */
  list: (req, res) => {
    Product.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  /**
   * Function to find a product by url
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The found product
   */
  findByUrl: (req, res) => {
    Product.find({
      url: req.params.url,
    }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  /**
   * Function to find a product by id
   * @param {Number} id - The id property of the product
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Array} - The found product
   */
  find: (req, res) => {
    Product.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },


  /**
   * Function to create a product
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The created product
   */
  create: (req, res) => {
    const cim = req.body.image;
    const url = req.body.url;
    req.body.image = `${url}.jpg`;
    request(cim).pipe(fs.createWriteStream(`public/img/${url}.jpg`));
    Product.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },


  /**
   * Function to update a product
   * @param {Number} id - The id property of the product
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The product before the update
   */
  update: (req, res) => {
    if (req.body.oldImage) {
      const cim = req.body.image;
      const urlcim = req.body.url;
      req.body.image = `${urlcim}.jpg`;
      request(cim).pipe(fs.createWriteStream(`public/img/${urlcim}.jpg`));
      deleteFile(req.body.oldImage);
    }
    Product.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },


  /**
   * Function to delete a product
   * @param {Number} id - The id property of the order
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @returns {Object} - The deleted product
   */
  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
        deleteFile(post.image);
      }
    });
  },
};
