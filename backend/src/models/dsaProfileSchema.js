const mongoose = require('mongoose');
const { Schema } = mongoose;

// 1. This is the blueprint for a SINGLE platform (e.g., just LeetCode)
const platformSnapshotSchema = new Schema({
    username: { type: String }, // e.g., "manas"
    status: { type: String, enum: ['ok', 'error', 'not_linked'], default: 'not_linked' }, // Did the API call succeed?
    error: { type: String, default: null }, // If it failed, why?
    
    // Stats for Pie Charts
    solved: { type: Number, default: 0 },
    easy: { type: Number, default: null },
    medium: { type: Number, default: null },
    hard: { type: Number, default: null },
    
    // Stats for Rating Graph
    rating: { type: Number, default: null },
    maxRating: { type: Number, default: null },
    rankTitle: { type: String, default: null },
    contestsAttended: { type: Number, default: 0 },
    ratingHistory: [{ date: String, rating: Number, contestName: String }],
    
    // Stats for Data Analysis Graph (Topics)
    topics: [{ name: String, solved: Number }], 
    
    profileUrl: { type: String }, // Link to their profile
    syncedAt: { type: Date } // When did we last fetch this?
}, { _id: false }); // We don't need a separate _id for sub-documents

// 2. This is the main blueprint for the User's DSA Profile
const dsaProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    
    // The exact usernames the user typed in
    handles: {
        leetcode: { type: String, default: null },
        codeforces: { type: String, default: null },
        codechef: { type: String, default: null },
        gfg: { type: String, default: null },
    },
    
    // The actual data we fetched (uses the blueprint from step 1)
    platforms: {
        leetcode: { type: platformSnapshotSchema, default: () => ({}) },
        codeforces: { type: platformSnapshotSchema, default: () => ({}) },
        codechef: { type: platformSnapshotSchema, default: () => ({}) },
        gfg: { type: platformSnapshotSchema, default: () => ({}) },
    },
    
    // The Heatmap data: An array of dates and how many problems were solved that day
    activity: [{ date: String, count: Number }], 
    
    lastSyncedAt: { type: Date, default: null }, // When did we last sync ALL platforms?
}, { timestamps: true });

module.exports = mongoose.model('DsaProfile', dsaProfileSchema);