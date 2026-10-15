const { Application } = require('../models/applicationSchema');
const Company = require('../models/companySchema');
const ApiError = require('../utils/ApiError');
const {
    validateApplication,
    validateStatusChange,
} = require('../utils/applicationValidator');

const ALLOWED_FIELDS = [
    'role', 'type', 'status',
    'appliedDate', 'deadline', 'source',
    'jobLink', 'resumeVersion', 'notes',
];

const ensureCompanyOwned = async (userId, companyId) => {
    const company = await Company.findOne({ _id: companyId, createdBy: userId });
    if (!company) {
        throw new ApiError(404, 'Company not found');
    }
    return company;
};

const createApplication = async (userId, data) => {
    try {
        validateApplication(data);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const company = await ensureCompanyOwned(userId, data.companyId);

    const initialStatus = data.status || 'applied';
    const payload = {
        user: userId,
        company: company._id,
        role: data.role,
        status: initialStatus,
        timeline: [{
            status: initialStatus,
            date: new Date(),
            note: 'Application created',
        }],
    };

    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) payload[key] = data[key];
    }

    try {
        return await Application.create(payload);
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new ApiError(400, err.message);
        }
        throw err;
    }
};

const listApplications = async (userId, { status, type, companyId, search } = {}) => {
    const query = { user: userId };
    if (status)    query.status = status;
    if (type)      query.type = type;
    if (companyId) query.company = companyId;
    if (search)    query.role = { $regex: search, $options: 'i' };

    return Application.find(query)
        .populate('company', 'name website location industry')
        .sort({ createdAt: -1 });
};

const getApplication = async (userId, applicationId) => {
    const app = await Application
        .findOne({ _id: applicationId, user: userId })
        .populate('company', 'name website location industry');

    if (!app) throw new ApiError(404, 'Application not found');
    return app;
};

const updateApplication = async (userId, applicationId, data) => {
    try {
        validateApplication(data, { partial: true });
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    if (data.companyId !== undefined) {
        await ensureCompanyOwned(userId, data.companyId);
    }

    const updates = {};
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) updates[key] = data[key];
    }
    if (data.companyId !== undefined) updates.company = data.companyId;

    const app = await Application.findOneAndUpdate(
        { _id: applicationId, user: userId },
        { $set: updates },
        { new: true, runValidators: true }
    ).populate('company', 'name website location industry');

    if (!app) throw new ApiError(404, 'Application not found');
    return app;
};

const changeStatus = async (userId, applicationId, { status, note }) => {
    try {
        validateStatusChange({ status, note });
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const app = await Application.findOne({ _id: applicationId, user: userId });
    if (!app) throw new ApiError(404, 'Application not found');

    app.status = status;
    app.timeline.push({
        status,
        date: new Date(),
        note: note || '',
    });

    await app.save();
    return app.populate('company', 'name website location industry');
};

const deleteApplication = async (userId, applicationId) => {
    const app = await Application.findOneAndDelete({
        _id: applicationId,
        user: userId,
    });
    if (!app) throw new ApiError(404, 'Application not found');
    return app;
};

module.exports = {
    createApplication,
    listApplications,
    getApplication,
    updateApplication,
    changeStatus,
    deleteApplication,
};