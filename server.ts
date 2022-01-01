import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

//Middlewares
app.use(cors());
dotenv.config();

const PORT = process.env.port;
app.listen(PORT, () => {
    console.log('Sharify Server Stated');
})