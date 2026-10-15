const asyncHandler = require('../utils/asyncHandler');
const profileService = require('../services/profileService');

const getMe = asyncHandler(async (req, res) => {
    const user = await profileService.getProfile(req.user._id);
    res.json(user);
});

const updateMe = asyncHandler(async (req, res) => {
    const user = await profileService.updateProfile(req.user._id, req.body || {});
    res.json({
        message: 'Profile updated successfully.',
        user,
    });
});

module.exports = { getMe, updateMe };