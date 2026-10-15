const express = require('express');
const dashboardRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const dashboardController = require('../controllers/dashboardController');

dashboardRouter.use(userAuth);

dashboardRouter.get('/stats', dashboardController.getStats);

module.exports = dashboardRouter;