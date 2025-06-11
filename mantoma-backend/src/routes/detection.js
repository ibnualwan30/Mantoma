const express = require("express");
const router = express.Router();
const detectionController = require("../controllers/detectionController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Upload image and analyze
router.post("/analyze", uploadMiddleware, detectionController.analyzeImage);

// Get model status
router.get("/model-status", detectionController.getModelStatus);

// Get disease info by class name
router.get("/disease/:className", detectionController.getDiseaseInfo);

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Detection service is running",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
