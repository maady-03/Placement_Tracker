const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
    await authService.register(req.body || {});
    res.status(201).json({ message: 'User registered successfully.' });
});

const login = asyncHandler(async (req, res) => {
    const token = await authService.login(req.body?.email, req.body?.password);

    res.cookie('token', token);
    res.status(200).json({ message: 'Login Successfully' });
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.send('Logged out successfully');
});

module.exports = {
    register,
    login,
    logout
};