const kategoriaRouter = require('express').Router();
const KategoriaController = require('../controller/kategoriak.controller');

/**
 * @module Kategoria-router
 * routing middleware for categories
 */
/**
 * @method list - get request to '/'
 * @desc Get all category
 */
kategoriaRouter.get('/', KategoriaController.list);
/**
 * @method find - get request to '/'
 * @desc Find a category
 * @param {Number} id - The id of the category
 */
kategoriaRouter.get('/:id', KategoriaController.find);
/**
 * @method create - post request to '/'
 * @desc Create a new category
 */
kategoriaRouter.post('/', KategoriaController.create);
/**
 * @method update - put request to '/'
 * @desc Update a category
 * @param {Number} id - The id of the category
 */
kategoriaRouter.put('/:id', KategoriaController.update);
/**
 * @method remove - delete request to '/'
 * @desc Delete a category
 * @param {Number} id -The id of the category
 */
kategoriaRouter.delete('/:id', KategoriaController.remove);

module.exports = kategoriaRouter;
