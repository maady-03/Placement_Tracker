const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {Schema} =mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    lastName:{
        type:String,
        minlength:3,
        maxlength:30,
        required:true
    },
    middleName:{
        type:String,
        minlength:3,
        maxlength:30,
        required:false
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        immutable:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    role:{
        type:String,
        enum:['student','admin','placement_officer'],
        required:true,
        default:'student'
    },
}, {
    timestamps: true
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    });
};

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;