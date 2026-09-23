const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;