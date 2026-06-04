const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

// Uploads folder auto-create
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${allowedTypes.join(', ')} files allowed`), false);
  }
};

const uploadImage = multer({
  storage,
  limits:     { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
});

const uploadPDF = multer({
  storage,
  limits:     { fileSize: 50 * 1024 * 1024 },
  fileFilter: fileFilter(['application/pdf'])
});

const uploadAny = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: fileFilter([
    'application/pdf',
    'image/jpeg', 'image/png', 'image/webp',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip'
  ])
});

module.exports = { uploadImage, uploadPDF, uploadAny };