const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/', authRouter);
app.use('/user', userRouter);

app.use(errorHandler);

module.exports = app;