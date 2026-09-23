const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const ApiError = require('../utils/ApiError');

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new ApiError(401, 'No token Provided');
        }

        const payload = jwt.verify(token,process.env.JWT_SECRET);
        if(!payload){
            throw new ApiError(401, 'Invalid Token');
        }

        const {_id} = payload;
        if(!_id){
            throw new ApiError(401, 'ID is missing');
        }

        const user=  await User.findById(_id);
        if(!user){
            throw new ApiError(401, 'User not found');
        }

        req.user=user;

        next();
    }
    catch(err){
        next(err instanceof ApiError ? err : new ApiError(401, err.message));
    }
};

module.exports= userAuth;