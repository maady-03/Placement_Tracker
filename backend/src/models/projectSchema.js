const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    techStack: {
        type: [String],
        default: [],
    },
    liveUrl: {
        type: String,
        trim: true,
    },
    githubUrl: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    // If true, this project will be displayed as the large "Major Project"
    isFeatured: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;