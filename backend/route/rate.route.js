const rateRouter = require('express').Router();
const RateController = require('../controller/rate.controller');

/**
 * @module Kategoria-router
 * routing middleware for categories
 */
/**
 * @method list - get request to '/'
 * @desc Get all rating
 */
rateRouter.get('/', RateController.list);
/**
 * @method find - get request to '/'
 * @desc Find a rating
 * @param {Number} id - The id of the rating
 */
rateRouter.get('/:id', RateController.find);
/**
 * @method create - post request to '/'
 * @desc Create a new rating
 */
rateRouter.post('/', RateController.create);
/**
 * @method update - put request to '/'
 * @desc Update a rating
 * @param {Number} id - The id of the rating
 */
rateRouter.put('/:id', RateController.update);
/**
 * @method remove - delete request to '/'
 * @desc Delete a rating
 * @param {Number} id -The id of the rating
 */
rateRouter.delete('/:id', RateController.remove);

module.exports = rateRouter;
