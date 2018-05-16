const productRouter = require('express').Router();
const ProductController = require('../controller/product.controller');

/**
 * @module Product-router
 */
/**
 * Routing middleware for products
 * @method list - get request to '/'
 * @desc Get all products
 */
productRouter.get('/', ProductController.list);
/**
 * Routing middleware for products
 * @method find - get request to '/'
 * @desc Find a product
 * @param {Number} id - The id of the product
 */
productRouter.get('/:id', ProductController.find);
/**
 * Routing middleware for products
 * @method create - post request to '/'
 * @desc Create a new product
 */
productRouter.post('/', ProductController.create);
/**
 * Routing middleware for products
 * @method update - put request to '/'
 * @desc Update a product
 * @param {Number} id - The id of the product
 */
productRouter.put('/:id', ProductController.update);
/**
 * Routing middleware for products
 * @method remove - delete request to '/'
 * @desc Delete a product
 * @param {Number} id -The id of the product
 */
productRouter.delete('/:id', ProductController.remove);

module.exports = productRouter;
