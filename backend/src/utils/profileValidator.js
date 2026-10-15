const validator = require('validator');

const URL_FIELDS = ['github', 'linkedin', 'leetcode', 'portfolio'];

function validateProfile(data){
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid profile payload');
    }

    if (data.graduationYear !== undefined && data.graduationYear !== null) {
        const year = Number(data.graduationYear);
        if (!Number.isInteger(year) || year < 2000 || year > 2100) {
            throw new Error('Graduation year must be between 2000 and 2100');
        }
    }

    if (data.cgpa !== undefined && data.cgpa !== null) {
        if (typeof data.cgpa !== 'number' || data.cgpa < 0 || data.cgpa > 10) {
            throw new Error('CGPA must be a number between 0 and 10');
        }
    }

    if (data.backlogs !== undefined && data.backlogs !== null) {
        if (typeof data.backlogs !== 'number' || data.backlogs < 0) {
            throw new Error('Backlogs must be a non-negative number');
        }
    }

    if (data.skills !== undefined && !Array.isArray(data.skills)) {
        throw new Error('Skills must be an array');
    }

    if (data.skills !== undefined && !Array.isArray(data.skills)) {
        throw new Error('Skills must be an array');
    }

    if (data.targetRoles !== undefined && !Array.isArray(data.targetRoles)) {
        throw new Error('Target roles must be an array');
    }

    if (data.links !== undefined) {
        if (typeof data.links !== 'object' || Array.isArray(data.links)) {
            throw new Error('Links must be an object');
        }
        for (const field of URL_FIELDS) {
            const value = data.links[field];
            if (value && !validator.isURL(value)) {
                throw new Error(`Invalid ${field} URL`);
            }
        }
    }

    if (data.about !== undefined && data.about !== null) {
        if (typeof data.about !== 'string' || data.about.length > 500) {
            throw new Error('About must be a string under 500 characters');
        }
    }
}

module.exports = { validateProfile };