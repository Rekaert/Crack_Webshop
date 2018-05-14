const productRouter = require('express').Router();
const ProductController = require('../controller/product.controller');


productRouter.get('/', ProductController.list);
productRouter.get('/:_id', ProductController.find);
productRouter.post('/', ProductController.create);
productRouter.put('/:_id', ProductController.update);
productRouter.delete('/:_id', ProductController.remove);

module.exports = productRouter;