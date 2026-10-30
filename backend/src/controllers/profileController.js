const asyncHandler = require('../utils/asyncHandler');
const profileService = require('../services/profileService');
const { Application } = require('../models/applicationSchema');
const DsaProfile = require('../models/dsaProfileSchema'); 

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

// ADDED: The Aggregation Endpoint for the Hinge-style preview
const getPreview = asyncHandler(async (req, res) => {
    // 1. Fetch User Profile
    const user = await profileService.getProfile(req.user._id);
    
    // 2. Fetch DSA Stats
    const dsa = await DsaProfile.findOne({ user: req.user._id });
    const totalSolved = (dsa?.platforms?.leetcode?.solved || 0) + (dsa?.platforms?.codeforces?.solved || 0);
    const leetcodeRating = dsa?.platforms?.leetcode?.rating || 0;

    // 3. Fetch Application Stats (Anonymized Journey)
    const applications = await Application.find({ user: req.user._id });
    
    const placementJourney = {
        totalApplications: applications.length,
        reachedOA: applications.filter(a => ['oa', 'interview', 'offer'].includes(a.status)).length,
        reachedInterview: applications.filter(a => ['interview', 'offer'].includes(a.status)).length,
        offers: applications.filter(a => a.status === 'offer').length,
    };

    // 4. Return combined payload
    res.json({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            profile: user.profile
        },
        dsaSummary: {
            totalSolved,
            leetcodeRating
        },
        placementJourney
    });
});

module.exports = { getMe, updateMe, getPreview }; // Exported getPreview