const bcrypt = require('bcrypt');

const User = require('../models/userSchema');
const validate = require('../utils/validator');
const ApiError = require('../utils/ApiError');

const register = async (userData) => {
    try {
        validate(userData);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
        throw new ApiError(409, 'An account with this email already exists.');
    }

    const existingUsername = await User.findOne({ username: userData.username });
    if (existingUsername) {
        throw new ApiError(409, 'That username is already taken.');
    }

    const user = {
        ...userData,
        password: await bcrypt.hash(userData.password, 10)
    };

    try {
        await User.create(user);
    } catch (err) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern || {})[0];
            const message = duplicateField === 'email'
                ? 'An account with this email already exists.'
                : 'That username is already taken.';
            throw new ApiError(409, message);
        }

        if (err.name === 'ValidationError') {
            throw new ApiError(400, err.message);
        }

        throw err;
    }
};

const login = async (loginId, password) => {
    const normalizedLoginId = loginId?.trim();
    if (!normalizedLoginId || !password) {
        throw new ApiError(400, 'Email, username, and password are required.');
    }

    const user = await User.findOne({
        $or: [{ email: normalizedLoginId }, { username: normalizedLoginId }]
    });

    if (!user || !(await user.verifyPassword(password))) {
        throw new ApiError(400, 'Invalid Credentials!');
    }

    return user.generateAuthToken();
};

module.exports = {
    register,
    login
};