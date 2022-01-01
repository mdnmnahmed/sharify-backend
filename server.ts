import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db';

const app = express();

//Middlewares
app.use(cors());
dotenv.config();

connectDB();

const PORT = process.env.port;
app.listen(PORT, () => {
    console.log('Sharify Server Stated');
})