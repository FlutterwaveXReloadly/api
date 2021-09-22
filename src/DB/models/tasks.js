import mongoose from 'mongoose';

const tasksModel = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    attachement: [String],
    interests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    txRef: String
});

export default mongoose.model('tasks', tasksModel);