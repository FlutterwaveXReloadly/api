import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

export default mongoose.model('wallet', Schema);
