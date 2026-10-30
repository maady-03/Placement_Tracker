const Company = require('../models/companySchema');
const ApiError = require('../utils/ApiError');
const { validateCompany } = require('../utils/companyValidator');
const { Application } = require('../models/applicationSchema');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// REMOVED 'location' from this array
const ALLOWED_FIELDS = ['name', 'logo', 'website', 'industry', 'notes']; 

const generateLogoUrl = (website) => {
    if (!website) return null;
    try {
        const urlStr = website.startsWith('http') ? website : `https://${website}`;
        const domain = new URL(urlStr).hostname.replace('www.', '');
        return `https://img.logo.dev/${domain}?token=${process.env.LOGO_DEV_TOKEN}&fallback=monogram`;
    } catch (err) {
        return null;
    }
};

const createCompany = async (userId, data) => {
    try {
        validateCompany(data);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    const payload = { createdBy: userId };
    for (const key of ALLOWED_FIELDS) {
        if (data[key] !== undefined) payload[key] = data[key];
    }

    if (payload.website && !payload.logo) {
        payload.logo = generateLogoUrl(payload.website);
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
        query.name = { $regex: escapeRegex(search), $options: 'i' };
    }

    const [companies, counts] = await Promise.all([
        Company.find(query).sort({ createdAt: -1 }).lean(),
        Application.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$company', count: { $sum: 1 } } },
        ]),
    ]);

    const countByCompany = new Map(counts.map((c) => [String(c._id), c.count]));

    return companies.map((company) => ({
        ...company,
        applicationCount: countByCompany.get(String(company._id)) ?? 0,
    }));
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

    if (updates.website && !updates.logo) {
        updates.logo = generateLogoUrl(updates.website);
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
    const hasApplications = await Application.exists({
        user: userId,
        company: companyId,
    });
    if (hasApplications) {
        throw new ApiError(
            409,
            'This company has applications. Delete them first.'
        );
    }

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