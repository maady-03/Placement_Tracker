const Project = require('../models/projectSchema');
const ApiError = require('../utils/ApiError');
const { validateProject } = require('../utils/projectValidator');

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

    // Unset other featured projects on create
    if (data.isFeatured) {
        await Project.updateMany({ user: userId }, { isFeatured: false });
    }

    const payload = { user: userId };
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) payload[key] = data[key];
    }

    return await Project.create(payload);
};

const getUserProjects = async (userId) => {
    const projects = await Project.find({ user: userId })
        .sort({ isFeatured: -1, createdAt: -1 })
        .lean();

    // Normalize old flat techStack arrays to the new object format
    return projects.map(p => {
        if (Array.isArray(p.techStack)) {
            p.techStack = { frontend: [], backend: [], database: [], deployment: [], other: p.techStack };
        } else if (!p.techStack) {
            p.techStack = { frontend: [], backend: [], database: [], deployment: [], other: [] };
        }
        return p;
    });
};

const updateProject = async (userId, projectId, data) => {
    try {
        validateProject(data, { partial: true });
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    // Unset other featured projects on update
    if (data.isFeatured === true) {
        await Project.updateMany(
            { user: userId, _id: { $ne: projectId } }, 
            { isFeatured: false }
        );
    }

    const updates = {};
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) updates[key] = data[key];
    }

    const project = await Project.findOneAndUpdate(
        { _id: projectId, user: userId },
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