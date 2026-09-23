const express =require('express');
const authRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const authController = require('../controllers/authController');

authRouter.get('/test', userAuth, authController.test);
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', userAuth, authController.logout);

module.exports = authRouter;