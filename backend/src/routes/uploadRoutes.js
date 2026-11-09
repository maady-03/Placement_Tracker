const express = require('express');
const uploadRouter = express.Router();
const userAuth = require('../middleware/userAuth');
const upload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');

uploadRouter.post('/', userAuth, upload.single('image'), uploadImage);

module.exports = uploadRouter;