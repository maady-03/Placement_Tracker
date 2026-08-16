const express = require('express');
const userRouter = express.Router();
const userAuth = require('../middleware/userauth');

userRouter.get('/profile', userAuth, async (req, res) => {
    const user = req.user.toObject();
    delete user.password;

    res.json(user);
});

module.exports = userRouter;