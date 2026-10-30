const asyncHandler = require('../utils/asyncHandler');
const applicationService = require('../services/applicationService');
const { PREDEFINED_ROLES } = require('../utils/constants'); // <--- ADDED

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
    const result = await applicationService.listApplications(req.user._id, {
        status:    req.query.status,
        type:      req.query.type,
        companyId: req.query.companyId,
        search:    req.query.search,
        page:      req.query.page,
        limit:     req.query.limit,
    });
    res.json(result);
});

// ADDED THIS FUNCTION
const getRoles = asyncHandler(async (req, res) => {
    res.json({ roles: PREDEFINED_ROLES });
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

module.exports = { 
    create, 
    list, 
    getRoles, // <--- EXPORTED
    getOne, 
    update, 
    changeStatus, 
    remove 
};