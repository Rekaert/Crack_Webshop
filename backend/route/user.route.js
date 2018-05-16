const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

/**
 * Routing middleware
 * @method profile - Get user
 * @method all - List all users
 * @method register - Register a new user
 * @method update - Update a users properties
 * @method delete - Delete a user
 * @method login - Log a user in
 * @method logout - Log a user out
 */
userRouter.get('/profile', UserController.profile);
userRouter.get('/', UserController.all);
userRouter.post('/register', UserController.register);
userRouter.post('/update/:id', UserController.update);
userRouter.post('/delete/:id', UserController.delete);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

module.exports = userRouter;
