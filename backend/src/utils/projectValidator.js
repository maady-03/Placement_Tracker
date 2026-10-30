const validator = require('validator');

function validateProject(data, { partial = false } = {}) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid project payload');
    }

    // On create (partial = false), Title and Description are mandatory
    if (!partial) {
        if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
            throw new Error('Project title is required');
        }
        if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
            throw new Error('Project description is required');
        }
    }

    // Validate title if provided
    if (data.title !== undefined) {
        if (typeof data.title !== 'string' || !data.title.trim()) {
            throw new Error('Title cannot be empty');
        }
        if (data.title.length > 100) {
            throw new Error('Title must be under 100 characters');
        }
    }

    // Validate description if provided
    if (data.description !== undefined) {
        if (typeof data.description !== 'string' || !data.description.trim()) {
            throw new Error('Description cannot be empty');
        }
        if (data.description.length > 500) {
            throw new Error('Description must be under 500 characters');
        }
    }

    // Validate techStack (must be an array of strings)
    if (data.techStack !== undefined && !Array.isArray(data.techStack)) {
        throw new Error('Tech stack must be an array of strings');
    }

    // Validate URLs
    const urlFields = ['liveUrl', 'githubUrl', 'imageUrl'];
    for (const field of urlFields) {
        if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
            if (!validator.isURL(data[field])) {
                throw new Error(`Invalid ${field} URL`);
            }
        }
    }

    // Validate isFeatured
    if (data.isFeatured !== undefined && typeof data.isFeatured !== 'boolean') {
        throw new Error('isFeatured must be a boolean');
    }
}

module.exports = { validateProject };