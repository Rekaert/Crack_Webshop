const productRouter = require('express').Router();
const ProductController = require('../controller/product.controller');

/**
 * @module Product-router
 * routing middleware for products
 */
/**
 * @method list - get request to '/'
 * @desc Get all products
 */
productRouter.get('/', ProductController.list);
/**
 * @method find - get request to '/'
 * @desc Find a product
 * @param {Number} id - The id of the product
 */
productRouter.get('/:id', ProductController.find);
/**
 * @method find - get request to '/'
 * @desc Find a product by url
 * @param {Number} url - The url of the product
 */
productRouter.get('/url/:url', ProductController.findByUrl);
/**
 * @method create - post request to '/'
 * @desc Create a new product
 */
productRouter.post('/', ProductController.create);
/**
 * @method update - put request to '/'
 * @desc Update a product
 * @param {Number} id - The id of the product
 */
productRouter.put('/:id', ProductController.update);
/**
 * @method remove - delete request to '/'
 * @desc Delete a product
 * @param {Number} id -The id of the product
 */
productRouter.delete('/:id', ProductController.remove);

module.exports = productRouter;
