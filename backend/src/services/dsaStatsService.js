const DsaProfile = require('../models/dsaProfileSchema');
const leetcodeService = require('./platforms/leetcodeService');
const codeforcesService = require('./platforms/codeforcesService');
const codechefService = require('./platforms/codechefService');
const gfgService = require('./platforms/gfgService');
const fetchWithTimeout = require('../utils/fetchWithTimeout');

const syncUser = async (userId) => {
    let profile = await DsaProfile.findOne({ user: userId });
    if (!profile) profile = new DsaProfile({ user: userId });

    const { handles } = profile;
    const promises = [];

    if (handles.leetcode) promises.push(leetcodeService.fetchStats(handles.leetcode).then(r => ({ platform: 'leetcode', data: r })));
    if (handles.codeforces) promises.push(codeforcesService.fetchStats(handles.codeforces).then(r => ({ platform: 'codeforces', data: r })));
    if (handles.codechef) promises.push(codechefService.fetchStats(handles.codechef).then(r => ({ platform: 'codechef', data: r })));
    if (handles.gfg) promises.push(gfgService.fetchStats(handles.gfg).then(r => ({ platform: 'gfg', data: r })));

    const results = await Promise.allSettled(promises);
    const mergedActivityMap = {};

    results.forEach(res => {
        if (res.status === 'fulfilled') {
            const { platform, data } = res.value;
            profile.platforms[platform] = data;
            if (data.activity) {
                data.activity.forEach(act => {
                    mergedActivityMap[act.date] = (mergedActivityMap[act.date] || 0) + act.count;
                });
            }
        }
    });

    profile.activity = Object.keys(mergedActivityMap)
        .map(date => ({ date, count: mergedActivityMap[date] }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 365);

    profile.lastSyncedAt = Date.now();
    await profile.save();
    return profile;
};

const getStats = async (userId) => {
    let profile = await DsaProfile.findOne({ user: userId });
    
    if (!profile || !profile.lastSyncedAt || (Date.now() - profile.lastSyncedAt > 6 * 60 * 60 * 1000)) {
        profile = await syncUser(userId);
    }

    // --- CORRECTED STREAK LOGIC ---
    let currentStreak = 0, maxStreak = 0, tempStreak = 0;
    let lastDate = null;
    const activity = profile.activity || [];
    
    // Sort ascending (oldest to newest) for streak calculation
    const sortedActivity = [...activity].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    for (let i = 0; i < sortedActivity.length; i++) {
        if (sortedActivity[i].count === 0) continue; // Skip empty days

        const currentDate = new Date(sortedActivity[i].date);

        if (lastDate) {
            // Calculate difference in days
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                tempStreak++; // Consecutive day
            } else {
                tempStreak = 1; // Streak broken, reset to 1
            }
        } else {
            tempStreak = 1; // First day
        }

        if (tempStreak > maxStreak) maxStreak = tempStreak;
        lastDate = currentDate;
    }

    // Check if the current streak is still active (last submission was today or yesterday)
    if (sortedActivity.length > 0) {
        const lastActiveDate = new Date(sortedActivity[sortedActivity.length - 1].date);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const diffTime = Math.abs(today - lastActiveDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            currentStreak = tempStreak;
        }
    }
    // ------------------------------

    const totals = { solved: 0, easy: 0, medium: 0, hard: 0, contests: 0 };
    const p = profile.platforms;
    
    ['leetcode', 'codeforces', 'codechef', 'gfg'].forEach(k => {
        if (p[k] && p[k].status === 'ok') {
            totals.solved += p[k].solved || 0;
            totals.easy += p[k].easy || 0;
            totals.medium += p[k].medium || 0;
            totals.hard += p[k].hard || 0;
            totals.contests += p[k].contestsAttended || 0;
        }
    });

    return {
        handles: profile.handles,
        totals: { ...totals, currentStreak, maxStreak, activeDays: activity.length },
        platforms: profile.platforms,
        activity: profile.activity,
        lastSyncedAt: profile.lastSyncedAt
    };
};

const getRecentSubmissions = async (userId) => {
    const profile = await DsaProfile.findOne({ user: userId });
    if (!profile) return [];

    let recent = [];
    
    if (profile.handles.codeforces) {
        try {
            const cfRes = await fetchWithTimeout(`https://codeforces.com/api/user.status?handle=${profile.handles.codeforces}&from=1&count=5`);
            const cfData = await cfRes.json();
            if (cfData.status === 'OK') {
                cfData.result.forEach(sub => {
                    if (sub.verdict === 'OK') {
                        recent.push({
                            platform: 'codeforces',
                            problem: sub.problem.name,
                            time: new Date(sub.creationTimeSeconds * 1000).toISOString(),
                            url: `https://codeforces.com/contest/${sub.problem.contestId}/problem/${sub.problem.index}`
                        });
                    }
                });
            }
        } catch (e) { console.error('CF recent error', e); }
    }

    if (profile.handles.leetcode) {
        try {
            const query = `query recentAcSubmissions($username: String!) { recentAcSubmissionList(username: $username, limit: 5) { title titleSlug timestamp } }`;
            const lcRes = await fetchWithTimeout('https://leetcode.com/graphql', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables: { username: profile.handles.leetcode } })
            });
            const lcData = await lcRes.json();
            if (lcData.data?.recentAcSubmissionList) {
                lcData.data.recentAcSubmissionList.forEach(sub => {
                    recent.push({
                        platform: 'leetcode',
                        problem: sub.title,
                        time: new Date(sub.timestamp * 1000).toISOString(),
                        url: `https://leetcode.com/problems/${sub.titleSlug}/`
                    });
                });
            }
        } catch (e) { console.error('LC recent error', e); }
    }

    return recent.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
};

module.exports = { syncUser, getStats, getRecentSubmissions };