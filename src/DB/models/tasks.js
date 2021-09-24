import mongoose from 'mongoose';

const tasksModel = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    amount: Number,
    attachement: [String],
    interests: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        status: String
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
    txRef: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    progress: {
        type: String,
        default: "unstarted"
    },
    completion: {
        type: String,
        default: "incomplete"
    }
});

export default mongoose.model('tasks', tasksModel);