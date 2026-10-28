const asyncHandler = require('../utils/asyncHandler');
const dsaStatsService = require('../services/dsaStatsService');
const DsaProfile = require('../models/dsaProfileSchema');
const leetcodeService = require('../services/platforms/leetcodeService');
const fetchWithTimeout = require('../utils/fetchWithTimeout');
const cache = require('../utils/cache');

const updatePlatforms = asyncHandler(async (req, res) => {
    // Destructure the body
    const { leetcode, codeforces, codechef, gfg } = req.body;
    
    let profile = await DsaProfile.findOne({ user: req.user._id });
    if (!profile) profile = new DsaProfile({ user: req.user._id });

    // TRIM the inputs to remove accidental spaces!
    if (leetcode !== undefined) profile.handles.leetcode = leetcode ? leetcode.trim() : null;
    if (codeforces !== undefined) profile.handles.codeforces = codeforces ? codeforces.trim() : null;
    if (codechef !== undefined) profile.handles.codechef = codechef ? codechef.trim() : null;
    if (gfg !== undefined) profile.handles.gfg = gfg ? gfg.trim() : null;

    await profile.save();
    await dsaStatsService.syncUser(req.user._id);
    
    res.json({ message: 'Platforms updated and synced.', handles: profile.handles });
});

const getPlatforms = asyncHandler(async (req, res) => {
    let profile = await DsaProfile.findOne({ user: req.user._id });
    res.json({ handles: profile?.handles || {} });
});

const getStats = asyncHandler(async (req, res) => {
    const stats = await dsaStatsService.getStats(req.user._id);
    res.json(stats);
});

const forceSync = asyncHandler(async (req, res) => {
    const stats = await dsaStatsService.syncUser(req.user._id);
    res.json({ message: 'Sync successful', stats });
});

const getDailyChallenge = asyncHandler(async (req, res) => {
    const challenge = await leetcodeService.fetchDailyChallenge();
    res.json(challenge);
});

const getRecentSubmissions = asyncHandler(async (req, res) => {
    const submissions = await dsaStatsService.getRecentSubmissions(req.user._id);
    res.json({ submissions });
});

const getUpcomingContests = asyncHandler(async (req, res) => {
    const cacheKey = 'upcoming_contests';
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const contests = { codeforces: [], leetcode: [], codechef: [] };

    try {
        const cfRes = await fetchWithTimeout('https://codeforces.com/api/contest.list');
        const cfData = await cfRes.json();
        contests.codeforces = cfData.result
            .filter(c => c.phase === 'BEFORE')
            .map(c => ({
                id: `cf-${c.id}`,
                name: c.name,
                platform: 'codeforces',
                startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
                url: `https://codeforces.com/contest/${c.id}`
            }));
    } catch (e) { console.error('CF Contest Fetch Failed', e.message); }

    try {
        const lcQuery = `query { upcomingContests { title titleSlug startTime duration } }`;
        const lcRes = await fetchWithTimeout('https://leetcode.com/graphql', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: lcQuery })
        });
        const lcData = await lcRes.json();
        if (lcData.data?.upcomingContests) {
            contests.leetcode = lcData.data.upcomingContests.map(c => ({
                id: `lc-${c.titleSlug}`,
                name: c.title,
                platform: 'leetcode',
                startTime: new Date(c.startTime * 1000).toISOString(),
                url: `https://leetcode.com/contest/${c.titleSlug}`
            }));
        }
    } catch (e) { console.error('LC Contest Fetch Failed', e.message); }

    try {
        const ccRes = await fetchWithTimeout('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all');
        const ccData = await ccRes.json();
        if (ccData.future_contests) {
            contests.codechef = ccData.future_contests.map(c => ({
                id: `cc-${c.contest_code}`,
                name: c.contest_name,
                platform: 'codechef',
                startTime: new Date(c.contest_start_date_iso).toISOString(),
                url: `https://www.codechef.com/contests`
            }));
        }
    } catch (e) { console.error('CC Contest Fetch Failed', e.message); }

    cache.set(cacheKey, contests, 1800);
    res.json(contests);
});

module.exports = { 
    updatePlatforms, 
    getPlatforms,
    getStats, 
    forceSync, 
    getDailyChallenge, 
    getUpcomingContests,
    getRecentSubmissions
};