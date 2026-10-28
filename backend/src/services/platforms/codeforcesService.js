const fetchWithTimeout = require('../../utils/fetchWithTimeout');

const fetchStats = async (username) => {
    try {
        const cleanUsername = username.trim();
        const res = await fetchWithTimeout(`https://www.codechef.com/users/${cleanUsername}`);
        const html = await res.text();

        // Check if the user exists by looking for the rating element
        if (!html.includes('class="rating-number"')) {
            throw new Error('CodeChef user not found');
        }

        // 1. Extract Rating (from the current HTML structure)
        const ratingMatch = html.match(/class="rating-number">(\d+)<\/div>/);
        
        // 2. Extract Stars (looks for text like "2★")
        const starMatch = html.match(/(\d)★/);

        // 3. Extract Solved Count (looks for "Total Problems Solved" text)
        const solvedMatch = html.match(/Total Problems Solved[^>]*>(\d+)</) || html.match(/Fully Solved \((\d+)\)/);

        return {
            username: cleanUsername, 
            status: 'ok', 
            error: null,
            solved: solvedMatch ? parseInt(solvedMatch[1]) : 0,
            easy: null, medium: null, hard: null,
            rating: ratingMatch ? parseInt(ratingMatch[1]) : 0,
            maxRating: ratingMatch ? parseInt(ratingMatch[1]) : 0,
            rankTitle: starMatch ? `${starMatch[1]} Star` : 'CodeChef', 
            contestsAttended: 0, 
            ratingHistory: [], topics: [],
            profileUrl: `https://www.codechef.com/users/${cleanUsername}`,
            activity: []
        };
    } catch (err) {
        return { username, status: 'error', error: err.message };
    }
};

module.exports = { fetchStats };