const mongoose = require('mongoose');

const { Schema } = mongoose;

const APPLICATION_STATUS = [
    'wishlist',
    'applied',
    'oa',
    'interview',
    'offer',
    'rejected',
    'withdrawn',
];

const APPLICATION_TYPE = ['internship', 'full-time'];

const applicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    type: {
        type: String,
        enum: APPLICATION_TYPE,
        default: 'internship',
    },
    status: {
        type: String,
        enum: APPLICATION_STATUS,
        default: 'wishlist',
        index: true,
    },
    location: { type: String, trim: true },
    // ADDED default: Date.now HERE
    appliedDate:   { type: Date, default: Date.now }, 
    deadline:      { type: Date },
    source:        { type: String, trim: true },
    jobLink:       { type: String, trim: true },
    resumeVersion: { type: String, trim: true },
    notes:         { type: String, maxlength: 1000 },
    timeline: [{
        status: { type: String, enum: APPLICATION_STATUS },
        date:   { type: Date, default: Date.now },
        note:   { type: String, maxlength: 500 },
    }],
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application, APPLICATION_STATUS, APPLICATION_TYPE };