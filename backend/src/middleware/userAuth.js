const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const userAuth = (async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("No token Provided");
        }

        const payload = jwt.verify(token,process.env.JWT_SECRET);
        if(!payload){
            throw new Error("Invalid Token");
        }

        const {_id} = payload;
        if(!_id){
            throw new Error("ID is missing");
        }

        const user=  await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        console.log("Checking token",token);

        req.user=user;

        next();
    }
    catch(err){
        res.status(401).json({error: err.message});
    }
})

module.exports= userAuth;