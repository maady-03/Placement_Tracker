const express = require('express');
const applicationRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const applicationController = require('../controllers/applicationController');

applicationRouter.use(userAuth);

applicationRouter.post('/', applicationController.create);
applicationRouter.get('/', applicationController.list);
applicationRouter.get('/:id', applicationController.getOne);
applicationRouter.put('/:id', applicationController.update);
applicationRouter.patch('/:id/status', applicationController.changeStatus);
applicationRouter.delete('/:id', applicationController.remove);

module.exports = applicationRouter;