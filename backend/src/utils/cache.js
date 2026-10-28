const cacheStore = new Map();

const set = (key, value, ttlSeconds) => {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    cacheStore.set(key, { value, expiresAt });
};

const get = (key) => {
    const item = cacheStore.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
        cacheStore.delete(key);
        return null;
    }
    return item.value;
};

module.exports = { set, get };