"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const FileModel_1 = __importDefault(require("../models/FileModel"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
router.post('/upload', upload.single('fileData'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(500).json({ message: "File is Missing" });
        }
        let uploadedFile;
        try {
            uploadedFile = yield cloudinary_1.v2.uploader.upload(req.file.path, {
                folder: "sharify",
                resourceType: "auto"
            });
        }
        catch (error) {
            return res.status(400).json({ message: "Failed to upload File", error });
        }
        const { originalname } = req.file;
        const { secure_url, bytes, format } = uploadedFile;
        const file = yield FileModel_1.default.create({
            fileName: originalname,
            size: bytes,
            url: secure_url,
            format
        });
        const fileUploadedData = {
            id: file._id,
            downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
            file
        };
        res.status(200).json({ message: "File Uploaded Successfully", fileUploadedData });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error: error });
    }
}));
router.get('/:fileId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const fileData = yield FileModel_1.default.findById(fileId);
        if (!fileData)
            return res.status(404).json({ message: "File not found" });
        return res.status(200).json({ message: "Download the File", file: fileData });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error: ", error });
    }
}));
exports.default = router;
