const express = require('express');
const contestRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const contestController = require('../controllers/contestController');

contestRouter.use(userAuth);
contestRouter.get('/upcoming', contestController.getUpcomingContests);

module.exports = contestRouter;