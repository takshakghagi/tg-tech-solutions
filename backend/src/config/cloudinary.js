const cloudinary = require('cloudinary').v2;
const logger     = require('../utils/logger');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath, folder = 'tg-tech') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
      quality:       'auto'
    });
    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    logger.error(`Cloudinary upload failed: ${error.message}`);
    throw new Error('File upload failed');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    logger.error(`Cloudinary delete failed: ${error.message}`);
    return false;
  }
};

module.exports = { cloudinary, uploadToCloudinary, deleteFromCloudinary };