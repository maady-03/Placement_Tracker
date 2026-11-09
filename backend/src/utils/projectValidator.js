const validator = require('validator');

function validateProject(data, { partial = false } = {}) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid project payload');
    }

    if (!partial) {
        if (!data.title || typeof data.title !== 'string' || !data.title.trim()) throw new Error('Project title is required');
        if (!data.description || typeof data.description !== 'string' || !data.description.trim()) throw new Error('Project description is required');
    }

    if (data.title !== undefined) {
        if (typeof data.title !== 'string' || !data.title.trim()) throw new Error('Title cannot be empty');
        if (data.title.length > 100) throw new Error('Title must be under 100 characters');
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string' || !data.description.trim()) throw new Error('Description cannot be empty');
        if (data.description.length > 500) throw new Error('Description must be under 500 characters');
    }

    if (data.techStack !== undefined) {
        if (typeof data.techStack !== 'object' || Array.isArray(data.techStack) || data.techStack === null) {
            throw new Error('Tech stack must be an object with categories');
        }
        const validCategories = ['frontend', 'backend', 'database', 'deployment', 'other'];
        
        for (const key of Object.keys(data.techStack)) {
            if (!validCategories.includes(key)) continue;
            if (!Array.isArray(data.techStack[key])) {
                throw new Error(`Tech stack category '${key}' must be an array of strings`);
            }
            for (const item of data.techStack[key]) {
                if (typeof item !== 'string' || item.length > 40) {
                    throw new Error(`Tech stack items must be strings under 40 characters`);
                }
            }
        }
    }

        const urlFields = ['liveUrl', 'githubUrl', 'imageUrl'];
    for (const field of urlFields) {
        if (data[field] !== undefined && data[field] !== null) {
            if (data[field] !== '' && !validator.isURL(data[field], { require_tld: false })) {
                throw new Error(`Invalid ${field} URL`);
            }
        }
    }

    if (data.isFeatured !== undefined && typeof data.isFeatured !== 'boolean') {
        throw new Error('isFeatured must be a boolean');
    }
}

module.exports = { validateProject };