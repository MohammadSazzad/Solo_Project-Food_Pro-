import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (LocalFilePath) => {
    try {
        if (!LocalFilePath) return null;
        const result = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type: "auto",
        });
        console.log("File uploaded successfully", result.url);
        
        fs.unlinkSync(LocalFilePath);
        
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(LocalFilePath); // Clean up local file
        throw error;
    }
};

export default uploadOnCloudinary;
