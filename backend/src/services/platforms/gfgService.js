const fetchWithTimeout = require('../../utils/fetchWithTimeout');

const fetchStats = async (username) => {
    try {
        const cleanUsername = username.trim();
        const res = await fetchWithTimeout(`https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${cleanUsername}&article_count=false&redirect=true`);
        const data = await res.json();

        if (data.status !== 'success' || !data.data || data.data.length === 0) {
            throw new Error('GFG user not found');
        }

        const user = data.data[0];
        return {
            username: cleanUsername, 
            status: 'ok', error: null,
            solved: user.coding_score ? user.coding_score.total_problems_solved : 0,
            easy: null, medium: null, hard: null,
            rating: null, maxRating: null,
            rankTitle: 'GFG Member', contestsAttended: 0, 
            ratingHistory: [], topics: [],
            profileUrl: `https://auth.geeksforgeeks.org/user/${cleanUsername}/practice/`,
            activity: []
        };
    } catch (err) {
        return { username, status: 'error', error: err.message };
    }
};

module.exports = { fetchStats };