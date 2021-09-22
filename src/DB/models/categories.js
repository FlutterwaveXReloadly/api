import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: String,
    description: String
});

export default mongoose.model('Category', schema);
