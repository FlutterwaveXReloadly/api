import mongoose from 'mongoose';
import { env } from './env';

export default async () => {
    await mongoose.connect(env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB connected!');
    }).catch((err) => {
        console.log(err);
    })
}