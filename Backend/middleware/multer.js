const multer = require('multer');
const path = require('path');

// Set up storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp and extension
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });
module.exports = upload;