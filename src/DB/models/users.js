import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    email: String,
    password: String,
    image: String,
});

export default mongoose.model('user', schema);