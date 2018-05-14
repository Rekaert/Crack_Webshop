const passport = require('passport');
const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

userRouter.get('/profile', UserController.profile);
userRouter.get('/', UserController.all);
userRouter.post('/register', UserController.register);
userRouter.post('/update/:id', UserController.update);
userRouter.post('/delete/:id', UserController.delete);
userRouter.post('/login', passport.authenticate('local'), UserController.login);
userRouter.get('/logout', UserController.logout);

module.exports = userRouter;
