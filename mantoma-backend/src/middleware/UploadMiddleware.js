const path = require("path");
const fs = require("fs");

// Middleware to handle image upload
const uploadMiddleware = (req, res, next) => {
  try {
    // Check if file exists
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded. Please select a file.",
      });
    }

    const uploadedFile = req.files.image;

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported file type (${uploadedFile.mimetype}). Only JPEG, PNG, and WebP are allowed.`,
      });
    }

    // Check file size (1KB to 10MB)
    const maxSize = 10 * 1024 * 1024;
    const minSize = 1024;

    if (uploadedFile.size > maxSize) {
      const fileSizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(2);
      return res.status(413).json({
        success: false,
        message: `File too large (${fileSizeMB}MB). Max allowed size is 10MB.`,
      });
    }

    if (uploadedFile.size < minSize) {
      return res.status(400).json({
        success: false,
        message: "File too small. Minimum size is 1KB. Use a valid image.",
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const fileExtension = path.extname(uploadedFile.name);
    const fileName = `leaf_${timestamp}_${randomString}${fileExtension}`;

    // Set destination path
    const uploadsDir = path.join(__dirname, "../uploads");
    const uploadPath = path.join(uploadsDir, fileName);

    // Create uploads directory if not exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Log file info
    console.log("Uploading file:", {
      originalName: uploadedFile.name,
      size: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
      type: uploadedFile.mimetype,
    });

    // Move file to uploads folder
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.error("File move error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to save the uploaded file. Please try again.",
        });
      }

      // Attach file info to request object
      req.uploadedFile = {
        originalName: uploadedFile.name,
        fileName,
        path: uploadPath,
        size: uploadedFile.size,
        mimetype: uploadedFile.mimetype,
        url: `/uploads/${fileName}`,
      };

      console.log(`File uploaded: ${fileName}`);
      next();
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload processing failed.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = uploadMiddleware;
