const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

/**
 * @module User-router
 */
/**
 * Routing middleware for Users
 * @method profile - get request to '/profile'
 * @desc - Get the logged in user
 */
userRouter.get('/profile', UserController.profile);
/**
 * Routing middleware for Users
 * @method all - get request to '/'
 * @desc - Get all users
 */
userRouter.get('/', UserController.all);
/**
 * Routing middleware for Users
 * @method logout - get request to '/logout'
 */
userRouter.get('/logout', UserController.logout);
/**
 * Routing middleware for Users
 * @method register - post request to '/register'
 * @desc Register a new user
 */
userRouter.post('/register', UserController.register);
/**
 * Routing middleware for Users
 * @method update - post request to '/update'
 * @desc Update a user
 * @param {Number} id - The id of the user
 */
userRouter.post('/update/:id', UserController.update);
/**
 * Routing middleware for Users
 * @method delete - delete request to '/delete'
 * @desc Delete a user
 * @param {Number} id - The id of the user
 */
userRouter.post('/delete/:id', UserController.delete);
/**
 * Routing middleware for Users
 * @method login - post request to '/login'
 * @desc Authenticate and log in user
 */
userRouter.post('/login', passport.authenticate('local'), UserController.login);

module.exports = userRouter;
