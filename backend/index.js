require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./src/config/database');

connectDatabase()
    .then(() => {
        console.log('Connected to database');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exitCode = 1;
    });