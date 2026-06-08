// uploadOnCloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
    try {

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: resourceType
            }
        );

        fs.unlinkSync(localFilePath);

        return response.secure_url;

    } catch (error) {

        fs.unlinkSync(localFilePath);

        throw error;
    }
};
const destroy = async (publicId) => {
    return cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadOnCloudinary, destroy };
