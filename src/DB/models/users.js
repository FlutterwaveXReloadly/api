import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: String,
    password: String,
    image: String,
    names: String,
    country: String,
    type: Number, // 0 - user, 1 - company, 2 - admin
    isVerified: Boolean,
    phoneNumber: String,
    bankDetails: {
        accountNumber: Number,
        bankName: String,
        bankId: String,
    },
    skills: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('user', schema);