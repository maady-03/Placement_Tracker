const express = require('express');
const dsaRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const dsaController = require('../controllers/dsaController');

dsaRouter.use(userAuth);

dsaRouter.put('/platforms', dsaController.updatePlatforms);
dsaRouter.get('/platforms', dsaController.getPlatforms);
dsaRouter.get('/stats', dsaController.getStats);
dsaRouter.post('/sync', dsaController.forceSync);
dsaRouter.get('/daily-challenge', dsaController.getDailyChallenge);
dsaRouter.get('/contests/upcoming', dsaController.getUpcomingContests);
dsaRouter.get('/recent-submissions', dsaController.getRecentSubmissions);

module.exports = dsaRouter;