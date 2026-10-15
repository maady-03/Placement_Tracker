const mongoose = require('mongoose');
const { Application } = require('../models/applicationSchema');

const getStats = async (userId) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 1. counts grouped by status
    const grouped = await Application.aggregate([
        { $match: { user: userObjectId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const byStatus = {
        wishlist: 0,
        applied: 0,
        oa: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
        withdrawn: 0,
    };
    let total = 0;
    for (const row of grouped) {
        byStatus[row._id] = row.count;
        total += row.count;
    }

    // 2. upcoming deadlines in next 14 days
    const now = new Date();
    const in14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const upcoming = await Application.find({
        user: userObjectId,
        deadline: { $gte: now, $lte: in14Days },
        status: { $nin: ['offer', 'rejected', 'withdrawn'] },
    })
        .populate('company', 'name')
        .sort({ deadline: 1 })
        .limit(10);

    return {
        totalApplications: total,
        byStatus,
        upcoming: {
            count: upcoming.length,
            applications: upcoming,
        },
    };
};

module.exports = { getStats };