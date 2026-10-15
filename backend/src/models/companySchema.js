const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    website:  { type: String, trim: true },
    location: { type: String, trim: true },
    industry: { type: String, trim: true },
    notes:    { type: String, maxlength: 500 },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
}, { timestamps: true });

// same user can't add "Google" twice
companySchema.index({ name: 1, createdBy: 1 }, { unique: true });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;