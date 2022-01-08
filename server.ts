import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db';
import fileRouter from './routes/fieRouter'
import { v2 as cloudinary } from 'cloudinary'

const app = express();

//Middlewares
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//DB Connection
connectDB();

//Routes
app.use('/api/files', fileRouter);
app.use('/', (req, res) => res.send("Welcome to Sharify"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Sharify Server Stated at: ', PORT);
})