const productRouter = require('express').Router();
const ProductController = require('../controller/product.controller');


productRouter.get('/', ProductController.list);
productRouter.get('/:id', ProductController.find);
productRouter.post('/', ProductController.create);
productRouter.put('/:id', ProductController.update);
productRouter.delete('/:id', ProductController.remove);

module.exports = productRouter;