const asyncHandler = require('../utils/asyncHandler');
const applicationService = require('../services/applicationService');

const create = asyncHandler(async (req, res) => {
    const application = await applicationService.createApplication(
        req.user._id,
        req.body || {}
    );
    res.status(201).json({
        message: 'Application created successfully.',
        application,
    });
});

const list = asyncHandler(async (req, res) => {
    const applications = await applicationService.listApplications(
        req.user._id,
        {
            status:    req.query.status,
            type:      req.query.type,
            companyId: req.query.companyId,
            search:    req.query.search,
        }
    );
    res.json({ applications });
});

const getOne = asyncHandler(async (req, res) => {
    const application = await applicationService.getApplication(
        req.user._id,
        req.params.id
    );
    res.json({ application });
});

const update = asyncHandler(async (req, res) => {
    const application = await applicationService.updateApplication(
        req.user._id,
        req.params.id,
        req.body || {}
    );
    res.json({
        message: 'Application updated successfully.',
        application,
    });
});

const changeStatus = asyncHandler(async (req, res) => {
    const application = await applicationService.changeStatus(
        req.user._id,
        req.params.id,
        {
            status: req.body?.status,
            note:   req.body?.note,
        }
    );
    res.json({
        message: 'Status updated successfully.',
        application,
    });
});

const remove = asyncHandler(async (req, res) => {
    await applicationService.deleteApplication(req.user._id, req.params.id);
    res.json({ message: 'Application deleted successfully.' });
});

module.exports = { create, list, getOne, update, changeStatus, remove };