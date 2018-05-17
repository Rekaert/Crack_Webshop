const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');

/**
 * @module Order-router
 * routing middleware for orders
 */
/**
 * @method list - get request to '/all'
 * @desc Get all orders
 */
orderRouter.get('/all', OrderController.list);
/**
 * @method find - get request to '/all/find
 * @desc Find an order
 * @param {Number} id - The id of the order
 */
orderRouter.get('/all/find/:id', OrderController.find);
/**
 * @method create - post request to '/all/create'
 * @desc Create a new order
 * @param {Number} id - The id of the order
 */
orderRouter.post('/all/create', OrderController.create);
/**
 * @method update - put request to '/all/update'
 * @desc Update a product
 * @param {Number} id - The id of the order
 */
orderRouter.put('/all/update/:id', OrderController.update);
/**
 * @method delete - delete request to '/all/delete'
 * @desc Delete a product
 * @param {Number} id - The id of the order
 */
orderRouter.delete('/all/delete/:id', OrderController.remove);

/**
 * @method detalis - get request to '/one
 * @desc Find an order
 * @param {Number} id - The id of the order
 */
orderRouter.get('/one/:id', OrderController.detalis);
/**
 * @method createOne - post request to '/one/create'
 * @desc Create a new order
 * @param {Number} id - The id of the order
 */
orderRouter.post('/one/create', OrderController.createOne);
/**
 * @method updateOne - put request to '/one/update'
 * @desc Update a product
 * @param {Number} id - The id of the order
 */
orderRouter.put('/one/update/:id', OrderController.updateOne);
/**
 * @method removeOne - delete request to '/one/delete'
 * @desc Delete a product
 * @param {Number} id - The id of the order
 */
orderRouter.delete('/one/delete/:id', OrderController.removeOne);

module.exports = orderRouter;
