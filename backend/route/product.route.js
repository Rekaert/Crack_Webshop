const productRouter = require('express').Router();
const ProductController = require('../controller/product.controller');


/**
 * Routing middlewares
 * @method list - Get all products
 * @method find - Find a product
 * @method create - Create a new product
 * @method update - Update a product
 * @method remove - Delete a product
 */
productRouter.get('/', ProductController.list);
productRouter.get('/:id', ProductController.find);
productRouter.post('/', ProductController.create);
productRouter.put('/:id', ProductController.update);
productRouter.delete('/:id', ProductController.remove);

module.exports = productRouter;
