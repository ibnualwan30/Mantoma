// Main backend server with TensorFlow.js
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config();

const detectionRoutes = require("./src/routes/detection");
const modelService = require("./src/services/modelService");

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for frontend URLs - FIXED IP ADDRESS
app.use(
  cors({
    origin: ["http://192.168.18.74:5174", "http://localhost:5174"],
    credentials: true,
  })
);

// Request timeout 2 minutes - INCREASED TIMEOUT
app.use((req, res, next) => {
  req.setTimeout(120000, () => {
    // 2 minutes instead of 30 seconds
    console.log("Request timeout");
    if (!res.headersSent) {
      res.status(408).json({
        success: false,
        message: "Request timeout. Please use smaller file or try again.",
      });
    }
  });
  next();
});

// Parse JSON and URL-encoded bodies
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

// File upload settings
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

// Log requests with response time
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.path} - Request received`);

  const originalJson = res.json;
  res.json = function (body) {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
    return originalJson.call(this, body);
  };
  next();
});

// API routes
app.use("/api/detection", detectionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Mantoma Backend Server running",
    timestamp: new Date().toISOString(),
    modelLoaded: modelService.isModelLoaded(),
    memoryInfo: modelService.getMemoryInfo(),
    serverAddress: `http://0.0.0.0:${PORT}`,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : {},
  });
});

// Load ML model on startup
async function initializeModel() {
  try {
    console.log("Loading ML model...");
    await modelService.loadModel();
    console.log("ML model ready");
  } catch (error) {
    console.error("Failed to load ML model:", error.message);
    console.log("Server started without ML model");
  }
}

// Graceful shutdown handler
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  try {
    await modelService.unloadModel();
    console.log("Model unloaded");
  } catch (error) {
    console.error("Shutdown error:", error);
  }
  process.exit(0);
});

// Start server - LISTEN ON ALL INTERFACES
async function startServer() {
  try {
    await initializeModel();

    // Listen on all interfaces (0.0.0.0) so it can be accessed from other devices
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`External access: http://192.168.18.74:${PORT}/api/health`);
      console.log(`Frontend can connect to: http://192.168.18.74:${PORT}`);
      console.log(
        `ML model status: ${
          modelService.isModelLoaded() ? "Loaded" : "Not loaded"
        }`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
