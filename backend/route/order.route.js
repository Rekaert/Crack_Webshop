const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');

/**
 * Routing middlewares
 * @callback list - Get all orders
 * @callback find - Find an order
 * @callback create - Create a new order
 * @callback update - Update an order
 * @callback remove - Delete an order
 */
orderRouter.get('/all', OrderController.list);
orderRouter.get('/all/find/:id', OrderController.find);
orderRouter.post('/all/create', OrderController.create);
orderRouter.put('/all/update/:id', OrderController.update);
orderRouter.delete('/all/delete/:id', OrderController.remove);

/**
 * Routing middlewares
 * @callback list - Get all orders
 * @callback find - Find an order
 * @callback create - Create a new order
 * @callback update - Update an order
 * @callback remove - Delete an order
 */
orderRouter.get('/one/:id', OrderController.detalis);
orderRouter.post('/one/create', OrderController.createOne);
orderRouter.put('/one/update/:id', OrderController.updateOne);
orderRouter.delete('/one/delete/:id', OrderController.removeOne);

module.exports = orderRouter;