const fetchWithTimeout = require('../../utils/fetchWithTimeout');

const fetchStats = async (username) => {
    try {
        // Ensure no trailing spaces in the URL
        const cleanUsername = username.trim();
        const res = await fetchWithTimeout(`https://www.codechef.com/users/${cleanUsername}`);
        const html = await res.text();

        if (html.includes('user not found') || res.status === 404) {
            throw new Error('CodeChef user not found');
        }

        // More robust Regex patterns
        // Looks for class="rating">1642</div> or similar
        const ratingMatch = html.match(/class="rating">([\d]+)<\/div>/);
        
        // Looks for "Fully Solved (123)" or "Fully Solved ( 123 )"
        const solvedMatch = html.match(/Fully Solved\s*\(\s*(\d+)\s*\)/i) || html.match(/Total Problems Solved:\s*<span>(\d+)<\/span>/i);

        // Some profiles show stars like class="rating">3★</div>
        const starMatch = html.match(/class="rating">(\d)★<\/div>/);

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