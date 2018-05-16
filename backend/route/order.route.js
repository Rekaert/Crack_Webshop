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
orderRouter.get('/find/:id', OrderController.find);
orderRouter.post('/create', OrderController.create);
orderRouter.put('/update/:id', OrderController.update);
orderRouter.delete('/delete/:id', OrderController.remove);

module.exports = orderRouter;
