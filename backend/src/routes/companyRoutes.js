const express = require('express');
const companyRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const companyController = require('../controllers/companyController');

companyRouter.use(userAuth);

companyRouter.post('/', companyController.create);
companyRouter.get('/', companyController.list);
companyRouter.get('/:id', companyController.getOne);
companyRouter.put('/:id', companyController.update);
companyRouter.delete('/:id', companyController.remove);

module.exports = companyRouter;