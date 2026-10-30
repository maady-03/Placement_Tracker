const fetchWithTimeout = require('../../utils/fetchWithTimeout');

const fetchStats = async (username) => {
    try {
        const cleanUsername = username.trim();

        // 1. Fetch user info (rating), status (submissions), and rating history (contests) simultaneously
        const [infoRes, statusRes, ratingRes] = await Promise.all([
            fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${cleanUsername}`),
            fetchWithTimeout(`https://codeforces.com/api/user.status?handle=${cleanUsername}`),
            fetchWithTimeout(`https://codeforces.com/api/user.rating?handle=${cleanUsername}`)
        ]);
        
        const infoData = await infoRes.json();
        const statusData = await statusRes.json();
        const ratingData = await ratingRes.json();

        // Check if the API call failed (e.g., user not found)
        if (infoData.status === 'FAILED' || statusData.status === 'FAILED') {
            throw new Error(infoData.comment || 'Codeforces user not found');
        }

        const user = infoData.result[0];
        const submissions = statusData.result;
        
        // 2. Calculate distinct solved problems and build the heatmap
        const solvedSet = new Set();
        const activityMap = {};
        
        submissions.forEach(sub => {
            if (sub.verdict === 'OK') {
                // Deduplicate by problem ID
                solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
                
                // Build heatmap activity (YYYY-MM-DD)
                const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
                activityMap[date] = (activityMap[date] || 0) + 1;
            }
        });

        const activity = Object.keys(activityMap).map(date => ({ date, count: activityMap[date] }));

        // 3. Process Contest Rating History
        let ratingHistory = [];
        let contestsAttended = 0;
        
        if (ratingData.status === 'OK' && ratingData.result) {
            contestsAttended = ratingData.result.length;
            // Get the last 50 contests and format them
            ratingHistory = ratingData.result.slice(-50).map(contest => ({
                date: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0],
                rating: contest.newRating,
                contestName: contest.contestName
            }));
        }

        return {
            username: cleanUsername,
            status: 'ok',
            error: null,
            solved: solvedSet.size,
            easy: null, // Codeforces doesn't split by difficulty
            medium: null, 
            hard: null,
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rankTitle: user.rank || 'unrated',
            contestsAttended, 
            ratingHistory, 
            topics: [],
            profileUrl: `https://codeforces.com/profile/${cleanUsername}`,
            activity
        };
    } catch (err) {
        return { username, status: 'error', error: err.message };
    }
};

module.exports = { fetchStats };