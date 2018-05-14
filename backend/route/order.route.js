const orderRouter = require('express').Router();
const OrderController = require('../controller/order.controller');

orderRouter.get('/all', OrderController.list);
orderRouter.get('/find/:id', OrderController.find);
orderRouter.post('/create', OrderController.create);
orderRouter.put('/update/:id', OrderController.update);
orderRouter.delete('/delete/:id', OrderController.remove);

module.exports = orderRouter;
