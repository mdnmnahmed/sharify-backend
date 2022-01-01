import express from 'express';
import multer from 'multer';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import FileModel from '../models/FileModel';

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });


router.post('/upload', upload.single('fileData'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({ message: "File is Missing" })
        }

        let uploadedFile: UploadApiResponse;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "sharify",
                resourceType: "auto"
            });
        } catch (error) {
            return res.status(400).json({ message: "Failed to upload File", error })
        }

        const { originalname } = req.file;
        const { secure_url, bytes, format } = uploadedFile;

        const file = await FileModel.create({
            fileName: originalname,
            size: bytes,
            url: secure_url,
            format
        });

        const fileUploadedData = {
            id: file._id,
            downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
            file
        }

        res.status(200).json({ message: "File Uploaded Successfully", fileUploadedData });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error });
    }
})


export default router;