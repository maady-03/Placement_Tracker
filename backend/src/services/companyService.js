const Company = require('../models/companySchema');
const ApiError = require('../utils/ApiError');
const { validateCompany } = require('../utils/companyValidator');

const ALLOWED_FIELDS = ['name', 'website', 'location', 'industry', 'notes'];

const  createCompany = async (userId, data) => {
    try {
        validateCompany(data);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const payload = { createdBy: userId };
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) payload[key] = data[key];
    }

    try {
        return await Company.create(payload);
    } catch (err) {
        if (err.code === 11000) {
            throw new ApiError(409, 'You already added this company');
        }
        if (err.name === 'ValidationError') {
            throw new ApiError(400, err.message);
        }
        throw err;
    }
};

const listCompanies = async (userId, { search } = {}) => {
    const query = { createdBy: userId };

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    return Company.find(query).sort({ createdAt: -1 });
};

const getCompany = async (userId, companyId) => {
    const company = await Company.findOne({ _id: companyId, createdBy: userId });
    if (!company) {
        throw new ApiError(404, 'Company not found');
    }
    return company;
};

const updateCompany = async (userId, companyId, data) => {
    try {
        validateCompany(data, { partial: true });
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const updates = {};
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) updates[key] = data[key];
    }

    try {
        const company = await Company.findOneAndUpdate(
            { _id: companyId, createdBy: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!company) {
            throw new ApiError(404, 'Company not found');
        }
        return company;
    } catch (err) {
        if (err instanceof ApiError) throw err;
        if (err.code === 11000) {
            throw new ApiError(409, 'You already added this company');
        }
        if (err.name === 'ValidationError') {
            throw new ApiError(400, err.message);
        }
        throw err;
    }
};

const deleteCompany = async (userId, companyId) => {
    const company = await Company.findOneAndDelete({
        _id: companyId,
        createdBy: userId,
    });

    if (!company) {
        throw new ApiError(404, 'Company not found');
    }
    return company;
};

module.exports = {
    createCompany,
    listCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
};