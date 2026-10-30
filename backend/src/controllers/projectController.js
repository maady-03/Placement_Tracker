const asyncHandler = require('../utils/asyncHandler');
const projectService = require('../services/projectService');

const create = asyncHandler(async (req, res) => {
    const project = await projectService.createProject(req.user._id, req.body || {});
    res.status(201).json({
        message: 'Project added successfully.',
        project,
    });
});

const list = asyncHandler(async (req, res) => {
    const projects = await projectService.getUserProjects(req.user._id);
    res.json({ projects });
});

const update = asyncHandler(async (req, res) => {
    const project = await projectService.updateProject(
        req.user._id,
        req.params.id,
        req.body || {}
    );
    res.json({
        message: 'Project updated successfully.',
        project,
    });
});

const remove = asyncHandler(async (req, res) => {
    await projectService.deleteProject(req.user._id, req.params.id);
    res.json({ message: 'Project deleted successfully.' });
});

module.exports = { create, list, update, remove };