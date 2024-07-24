import multer from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
export const uploadImage = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,
            { resource_type: "auto" });
        fs.unlinkSync(localFilePath);
        return response.url

    } catch (error) {
        return null
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/temp") }, filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
export const upload = multer({
    storage,
})