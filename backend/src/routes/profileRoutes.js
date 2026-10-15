const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const profileController = require('../controllers/profileController');

profileRouter.get('/me', userAuth, profileController.getMe);
profileRouter.put('/me', userAuth, profileController.updateMe);

module.exports = profileRouter;