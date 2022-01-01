import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            // @ts-ignore
            useNewUrlParser: true
        });
        console.log('Connected with DB');
    } catch (error) {
        console.log('DB Connection', error);
        process.exit();
    }
}

export default connectDB;