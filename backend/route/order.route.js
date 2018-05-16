const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');

/**
 * Routing middlewares
 * @method list - Get all orders
 * @method find - Find an order
 * @method create - Create a new order
 * @method update - Update an order
 * @method remove - Delet an order
 */
orderRouter.get('/all', OrderController.list);
orderRouter.get('/find/:id', OrderController.find);
orderRouter.post('/create', OrderController.create);
orderRouter.put('/update/:id', OrderController.update);
orderRouter.delete('/delete/:id', OrderController.remove);

module.exports = orderRouter;
