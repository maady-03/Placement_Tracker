const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./src/routes/auth')
const profileRoutes = require('./src/routes/profileRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const companyRoutes = require('./src/routes/companyRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const dsaRoutes = require('./src/routes/dsaRoutes');
const contestRoutes = require('./src/routes/contestRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/', authRouter);
app.use('/api/profile', profileRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/projects', projectRoutes);

app.use(errorHandler);

module.exports = app;