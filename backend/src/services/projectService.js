const Project = require('../models/projectSchema');
const ApiError = require('../utils/ApiError');
const { validateProject } = require('../utils/projectValidator');

// Only allow these fields to be saved/updated
const ALLOWED_FIELDS = [
    'title', 'description', 'techStack', 
    'liveUrl', 'githubUrl', 'imageUrl', 'isFeatured'
];

const createProject = async (userId, data) => {
    try {
        validateProject(data);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const payload = { user: userId };
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) payload[key] = data[key];
    }

    return await Project.create(payload);
};

const getUserProjects = async (userId) => {
    // Sort by isFeatured (true first), then by newest created
    return Project.find({ user: userId }).sort({ isFeatured: -1, createdAt: -1 });
};

const updateProject = async (userId, projectId, data) => {
    try {
        validateProject(data, { partial: true });
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const updates = {};
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) updates[key] = data[key];
    }

    const project = await Project.findOneAndUpdate(
        { _id: projectId, user: userId }, // Scoped to the user for security
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!project) {
        throw new ApiError(404, 'Project not found');
    }
    return project;
};

const deleteProject = async (userId, projectId) => {
    const project = await Project.findOneAndDelete({ 
        _id: projectId, 
        user: userId 
    });
    
    if (!project) {
        throw new ApiError(404, 'Project not found');
    }
    return project;
};

module.exports = {
    createProject,
    getUserProjects,
    updateProject,
    deleteProject
};