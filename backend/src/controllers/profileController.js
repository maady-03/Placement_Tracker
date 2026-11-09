const asyncHandler = require('../utils/asyncHandler');
const profileService = require('../services/profileService');
const { Application } = require('../models/applicationSchema');
const DsaProfile = require('../models/dsaProfileSchema');
const Project = require('../models/projectSchema'); // <-- NEW

const getMe = asyncHandler(async (req, res) => {
    const user = await profileService.getProfile(req.user._id);
    res.json(user);
});

const updateMe = asyncHandler(async (req, res) => {
    const user = await profileService.updateProfile(req.user._id, req.body || {});
    res.json({ message: 'Profile updated successfully.', user });
});

const getPreview = asyncHandler(async (req, res) => {
    const user = await profileService.getProfile(req.user._id);
    
    const dsa = await DsaProfile.findOne({ user: req.user._id });
    const totalSolved = (dsa?.platforms?.leetcode?.solved || 0) + (dsa?.platforms?.codeforces?.solved || 0);
    const leetcodeRating = dsa?.platforms?.leetcode?.rating || 0;

    const applications = await Application.find({ user: req.user._id });
    const placementJourney = {
        totalApplications: applications.length,
        reachedOA: applications.filter(a => ['oa', 'interview', 'offer'].includes(a.status)).length,
        reachedInterview: applications.filter(a => ['interview', 'offer'].includes(a.status)).length,
        offers: applications.filter(a => a.status === 'offer').length,
    };

    // NEW: Fetch top 3 projects for the preview
    const projects = await Project.find({ user: req.user._id })
        .sort({ isFeatured: -1, createdAt: -1 })
        .limit(3)
        .lean();

    // Normalize old techStacks
    const safeProjects = projects.map(p => {
        if (Array.isArray(p.techStack)) {
            p.techStack = { frontend: [], backend: [], database: [], deployment: [], other: p.techStack };
        }
        return p;
    });

    res.json({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            profile: user.profile
        },
        dsaSummary: { totalSolved, leetcodeRating },
        placementJourney,
        projects: safeProjects // <-- NEW
    });
});

module.exports = { getMe, updateMe, getPreview };