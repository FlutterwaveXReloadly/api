import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    }
});

export default mongoose.model('transaction', schema);