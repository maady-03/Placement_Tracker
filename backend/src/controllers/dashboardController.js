const asyncHandler = require('../utils/asyncHandler');
const dashboardService = require('../services/dashboardService');

const getStats = asyncHandler(async (req, res) => {
    const stats = await dashboardService.getStats(req.user._id);
    res.json(stats);
});

module.exports = { getStats };