import mongoose, { Document } from 'mongoose';

interface IFile extends Document {
    fileName: string,
    url: string,
    format: string,
    size: string,
    sender?: string,
    receiver?: string,
}

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    sender: {
        type: String,
    },
    receiver: {
        type: String,
    },
}, { timestamps: true });


export default mongoose.model<IFile>('File', FileSchema);