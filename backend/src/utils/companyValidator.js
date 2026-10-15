const validator = require('validator');

function validateCompany(data, { partial = false } = {}) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid company payload');
    }

    if (!partial) {
        if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
            throw new Error('Company name is required');
        }
    }

    if (data.name !== undefined) {
        if (typeof data.name !== 'string' || !data.name.trim()) {
            throw new Error('Company name cannot be empty');
        }
        if (data.name.length > 100) {
            throw new Error('Company name must be under 100 characters');
        }
    }

    if (data.website !== undefined && data.website !== null && data.website !== '') {
        if (!validator.isURL(data.website)) {
            throw new Error('Invalid website URL');
        }
    }

    if (data.location !== undefined && typeof data.location !== 'string') {
        throw new Error('Location must be a string');
    }

    if (data.industry !== undefined && typeof data.industry !== 'string') {
        throw new Error('Industry must be a string');
    }

    if (data.notes !== undefined && data.notes !== null) {
        if (typeof data.notes !== 'string' || data.notes.length > 500) {
            throw new Error('Notes must be a string under 500 characters');
        }
    }
}

module.exports = { validateCompany };