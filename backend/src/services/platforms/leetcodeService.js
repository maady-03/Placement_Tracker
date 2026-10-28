const fetchWithTimeout = require('../../utils/fetchWithTimeout');

const fetchStats = async (username) => {
    // 1. The GraphQL Query - We tell LeetCode exactly what data we want
    const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats { acSubmissionNum { difficulty count } }
        submissionCalendar
        tagProblemCounts {
          advanced { tagName problemsSolved }
          intermediate { tagName problemsSolved }
          fundamental { tagName problemsSolved }
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
      }
    }`;

    try {
        // 2. Send the POST request to LeetCode
        const res = await fetchWithTimeout('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { username } })
        });
        
        const data = await res.json();
        if (!data.data || !data.data.matchedUser) throw new Error('LeetCode user not found');

        const user = data.data.matchedUser;
        const stats = user.submitStats.acSubmissionNum;
        
        // 3. Extract the Easy/Medium/Hard stats for the Pie Chart
        const easy = stats.find(s => s.difficulty === 'Easy')?.count || 0;
        const medium = stats.find(s => s.difficulty === 'Medium')?.count || 0;
        const hard = stats.find(s => s.difficulty === 'Hard')?.count || 0;
        const total = stats.find(s => s.difficulty === 'All')?.count || 0;

        // 4. Extract Contest Rating
        const contest = data.data.userContestRanking || { attendedContestsCount: 0, rating: 0 };

        // 5. Extract Heatmap Activity
        const calendar = JSON.parse(user.submissionCalendar || '{}');
        const activity = Object.keys(calendar).map(ts => ({
            date: new Date(ts * 1000).toISOString().split('T')[0],
            count: calendar[ts]
        }));

        // 6. Extract Topic Analysis (For the Radar Graph)
        const topics = [
            ...(user.tagProblemCounts?.advanced || []),
            ...(user.tagProblemCounts?.intermediate || []),
            ...(user.tagProblemCounts?.fundamental || [])
        ].map(t => ({ name: t.tagName, solved: t.problemsSolved }))
         .sort((a, b) => b.solved - a.solved) // Sort by most solved
         .slice(0, 10); // Keep top 10

        return {
            username, 
            status: 'ok', 
            error: null,
            solved: total, 
            easy, 
            medium, 
            hard,
            rating: Math.round(contest.rating || 0),
            maxRating: Math.round(contest.rating || 0), // GraphQL doesn't give max easily without history
            rankTitle: 'LeetCode', 
            contestsAttended: contest.attendedContestsCount,
            ratingHistory: [], 
            topics, // Our Topic Data!
            profileUrl: `https://leetcode.com/${username}`,
            activity // Our Heatmap Data!
        };
    } catch (err) {
        return { username, status: 'error', error: err.message };
    }
};

// 7. Bonus: Fetch the LeetCode Daily Challenge
const fetchDailyChallenge = async () => {
    const query = `query { activeDailyCodingChallengeQuestion { question { title difficulty titleSlug } } }`;
    const res = await fetchWithTimeout('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });
    const data = await res.json();
    const q = data.data.activeDailyCodingChallengeQuestion.question;
    return { 
        title: q.title, 
        difficulty: q.difficulty, 
        link: `https://leetcode.com/problems/${q.titleSlug}/` 
    };
};

module.exports = { fetchStats, fetchDailyChallenge };