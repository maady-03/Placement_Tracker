const express = require('express');
const projectRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const projectController = require('../controllers/projectController');

// Protect all project routes
projectRouter.use(userAuth);

projectRouter.post('/', projectController.create);
projectRouter.get('/', projectController.list);
projectRouter.put('/:id', projectController.update);
projectRouter.delete('/:id', projectController.remove);

module.exports = projectRouter;