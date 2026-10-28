// We create a function that accepts the URL, options, time limit (8 seconds), and number of retries (1)
const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000, retries = 1) => {
    // AbortController is a native Node.js feature to cancel a fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, {
            ...options,
            signal: controller.signal, // Attach the controller
            headers: {
                // VERY IMPORTANT: Some platforms (like LeetCode) block requests without a User-Agent
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PlacementTracker/1.0',
                ...options.headers,
            }
        });
        
        clearTimeout(timeoutId); // Stop the timer if request succeeds
        return res;
    } catch (err) {
        clearTimeout(timeoutId);
        // If it fails, and we still have retries left, try again
        if (retries > 0 && err.name !== 'AbortError') {
            return fetchWithTimeout(url, options, timeoutMs, retries - 1);
        }
        throw err; // If it fails twice, throw the error
    }
};

module.exports = fetchWithTimeout;