"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const fieRouter_1 = __importDefault(require("./routes/fieRouter"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
//Middlewares
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Cloudinary Config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//DB Connection
(0, db_1.default)();
//Routes
app.use('/api/files', fieRouter_1.default);
app.use('/', (req, res) => res.send("Welcome to Sharify"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Sharify Server Stated at: ', PORT);
});
