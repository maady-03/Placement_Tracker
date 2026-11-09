const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        index: true 
    },
    title: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 100 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 500 
    },
    
    techStack: {
        frontend: { type: [String], default: [] },
        backend: { type: [String], default: [] },
        database: { type: [String], default: [] },
        deployment: { type: [String], default: [] },
        other: { type: [String], default: [] }
    },
    
    liveUrl: { type: String, trim: true, default: "" },
    githubUrl: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;