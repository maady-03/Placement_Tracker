const asyncHandler = require('../utils/asyncHandler');
const companyService = require('../services/companyService');

const create = asyncHandler(async (req, res) => {
    const company = await companyService.createCompany(req.user._id, req.body || {});
    res.status(201).json({ message: 'Company added successfully.', company });
});

const list = asyncHandler(async (req, res) => {
    const companies = await companyService.listCompanies(req.user._id, {
        search: req.query.search,
    });
    res.json({ companies });
});

const getOne = asyncHandler(async (req, res) => {
    const company = await companyService.getCompany(req.user._id, req.params.id);
    res.json({ company });
});

const update = asyncHandler(async (req, res) => {
    const company = await companyService.updateCompany(
        req.user._id,
        req.params.id,
        req.body || {}
    );
    res.json({ message: 'Company updated successfully.', company });
});

const remove = asyncHandler(async (req, res) => {
    await companyService.deleteCompany(req.user._id, req.params.id);
    res.json({ message: 'Company deleted successfully.' });
});

module.exports = { create, list, getOne, update, remove };