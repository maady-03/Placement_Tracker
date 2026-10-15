const User = require('../models/userSchema');
const ApiError = require('../utils/ApiError');
const { validateProfile } = require('../utils/profileValidator');

const ALLOWED_FIELDS = [
    'college', 'branch', 'graduationYear', 'cgpa',
    'backlogs', 'skills', 'targetRoles', 'links', 'about',
];

const getProfile = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return user;
};

const updateProfile = async (userId, data) => {
    try {
        validateProfile(data);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const currentProfile = user.toObject().profile || {};
    const mergedProfile = { ...currentProfile };

    for (const key of ALLOWED_FIELDS) {
        if (data[key] === undefined) continue;

        if (key === 'links') {
            mergedProfile.links = {
                ...(currentProfile.links || {}),
                ...data.links,
            };
        } else {
            mergedProfile[key] = data[key];
        }
    }

    user.profile = mergedProfile;
    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;
    return safeUser;
};

module.exports = { getProfile, updateProfile };