const express = require('express');
const app=express();
app.use(express.json());

require('dotenv').config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const main = require('./src/config/database');

const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');

app.use('/',authRouter);
app.use('/user',userRouter);

main()
.then (async()=>{
    console.log("Connected to database");
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    })
})
.catch((err)=>console.log(err));