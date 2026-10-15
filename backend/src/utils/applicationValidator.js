const validator = require('validator');
const { APPLICATION_STATUS, APPLICATION_TYPE } = require('../models/applicationSchema');

function validateApplication(data, { partial = false } = {}) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Invalid application payload');
    }

    if (!partial) {
        if (!data.companyId || typeof data.companyId !== 'string') {
            throw new Error('companyId is required');
        }
        if (!data.role || typeof data.role !== 'string' || !data.role.trim()) {
            throw new Error('Role is required');
        }
    }

    if (data.role !== undefined) {
        if (typeof data.role !== 'string' || !data.role.trim()) {
            throw new Error('Role cannot be empty');
        }
        if (data.role.length > 100) {
            throw new Error('Role must be under 100 characters');
        }
    }

    if (data.type !== undefined && !APPLICATION_TYPE.includes(data.type)) {
        throw new Error(`Type must be one of: ${APPLICATION_TYPE.join(', ')}`);
    }

    if (data.status !== undefined && !APPLICATION_STATUS.includes(data.status)) {
        throw new Error(`Status must be one of: ${APPLICATION_STATUS.join(', ')}`);
    }

    if (data.jobLink !== undefined && data.jobLink !== null && data.jobLink !== '') {
        if (!validator.isURL(data.jobLink)) {
            throw new Error('Invalid job link URL');
        }
    }

    if (data.notes !== undefined && data.notes !== null) {
        if (typeof data.notes !== 'string' || data.notes.length > 1000) {
            throw new Error('Notes must be a string under 1000 characters');
        }
    }

    for (const dateField of ['appliedDate', 'deadline']) {
        if (data[dateField] !== undefined && data[dateField] !== null) {
            const d = new Date(data[dateField]);
            if (isNaN(d.getTime())) {
                throw new Error(`${dateField} must be a valid date`);
            }
        }
    }
}

function validateStatusChange(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid payload');
    }
    if (!data.status || !APPLICATION_STATUS.includes(data.status)) {
        throw new Error(`Status must be one of: ${APPLICATION_STATUS.join(', ')}`);
    }
    if (data.note !== undefined && data.note !== null) {
        if (typeof data.note !== 'string' || data.note.length > 500) {
            throw new Error('Note must be a string under 500 characters');
        }
    }
}

module.exports = { validateApplication, validateStatusChange };