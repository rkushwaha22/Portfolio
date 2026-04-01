const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const CLOUD_NAME = process.env.CLOUD_NAME
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET


cloudinary.config({
  cloud_name: CLOUD_NAME,         // cloud name
  api_key: API_KEY,                //'aapka_api_key',
  api_secret: API_SECRET          //'aapka_api_secret'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_uploads', // Cloudinary mein folder ka naam
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

module.exports = { cloudinary, storage };
