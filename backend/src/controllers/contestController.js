const asyncHandler = require('../utils/asyncHandler');
const fetchWithTimeout = require('../utils/fetchWithTimeout');
const cache = require('../utils/cache');

const getUpcomingContests = asyncHandler(async (req, res) => {
    const cacheKey = 'upcoming_contests';
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const contests = { codeforces: [], leetcode: [], codechef: [] };

    try {
        const cfRes = await fetchWithTimeout('https://codeforces.com/api/contest.list');
        const cfData = await cfRes.json();
        contests.codeforces = cfData.result.filter(c => c.phase === 'BEFORE').map(c => ({
            id: `cf-${c.id}`, name: c.name, platform: 'codeforces', startTime: new Date(c.startTimeSeconds * 1000).toISOString(),
            url: `https://codeforces.com/contest/${c.id}`, durationMinutes: Math.round(c.durationSeconds / 60)
        }));
    } catch (e) { console.error('CF Contest Fetch Failed', e.message); }

    try {
        const lcQuery = `query { upcomingContests { title titleSlug startTime duration } }`;
        const lcRes = await fetchWithTimeout('https://leetcode.com/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: lcQuery }) });
        const lcData = await lcRes.json();
        if (lcData.data?.upcomingContests) {
            contests.leetcode = lcData.data.upcomingContests.map(c => ({
                id: `lc-${c.titleSlug}`, name: c.title, platform: 'leetcode', startTime: new Date(c.startTime * 1000).toISOString(),
                url: `https://leetcode.com/contest/${c.titleSlug}`, durationMinutes: Math.round(c.duration / 60)
            }));
        }
    } catch (e) { console.error('LC Contest Fetch Failed', e.message); }

    try {
        const ccRes = await fetchWithTimeout('https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all');
        const ccData = await ccRes.json();
        if (ccData.future_contests) {
            contests.codechef = ccData.future_contests.map(c => ({
                id: `cc-${c.contest_code}`, name: c.contest_name, platform: 'codechef', startTime: new Date(c.contest_start_date_iso).toISOString(),
                url: `https://www.codechef.com/contests`, durationMinutes: Number(c.contest_duration) || null
            }));
        }
    } catch (e) { console.error('CC Contest Fetch Failed', e.message); }

    cache.set(cacheKey, contests, 1800);
    res.json(contests);
});

module.exports = { getUpcomingContests };