import mongoose from 'mongoose';

const tasksModel = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    attachement: String,
    interests: [{
        type: mongoose.Schema.Types.Objectid,
        ref: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: Date
});

export default mongoose.model('tasks', tasksModel);