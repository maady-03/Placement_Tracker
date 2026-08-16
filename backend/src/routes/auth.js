const express =require('express');
const authRouter = express.Router();
const User = require('../models/userSchema');
const validate= require('../utils/validator');
const bcrypt= require('bcrypt');
const userAuth = require('../middleware/userauth');


authRouter.get('/test',userAuth,async(req,res)=>{
    // try{
    //     const user = await User.find({});
    //     console.log(req.cookies);
    //     res.send(user);
    // }
    // catch(err){
    //     res.status(400).json({
    //         error: err.message
    //     });
    // }
    res.json(req.user);
})

authRouter.post('/register', async(req,res)=>{
    try{
        validate(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password=hashedPassword;
        await User.create(req.body);
        res.status(201).json({
            message: "User registered Successfully"
        });
    }
    catch(err){
        res.status(400).json({
            error:err.message
        });
    }
})

authRouter.post('/login',async(req,res)=>{
    try{
        const people = await User.findOne({email:req.body.email,});
        if(!people){
            throw new Error("Invalid Credentials!");
        }

        const isPasswordValid = await people.verifyPassword(req.body.password);
        if(!isPasswordValid){
            throw new Error("Invalid Credentials!");
        }

        const token = people.generateAuthToken();

        res.cookie('token',token);
        res.send("Login Successfully");

    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
})

authRouter.post('/logout',userAuth,async(req,res)=>{
    res.clearCookie('token');
    res.send("Logged out successfully");
})

module.exports = authRouter;