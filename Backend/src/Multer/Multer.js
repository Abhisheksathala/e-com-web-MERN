import multer from "multer";
import path from "path"; // Make sure to import the 'path' module

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
})

export default upload; // Export the upload middleware to use in your routes
