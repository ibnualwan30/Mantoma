const path = require("path");
const fs = require("fs");
const modelService = require("../services/modelService");
const diseaseConfig = require("../config/diseaseConfig");

// Predict disease from image using ML model
const predictDisease = async (imagePath) => {
  try {
    console.log("Predicting:", imagePath);
    const imageBuffer = fs.readFileSync(imagePath);
    const predictions = await modelService.predict(imageBuffer);
    return processPredictions(predictions);
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error(`Failed to predict disease: ${error.message}`);
  }
};

// Convert predictions into structured result
const processPredictions = (predictions) => {
  const { classes, diseaseDatabase, model } = diseaseConfig;

  const classifiedPredictions = predictions.map((confidence, index) => ({
    class: classes[index],
    confidence,
    percentage: (confidence * 100).toFixed(1),
  }));

  const sortedPredictions = classifiedPredictions.sort(
    (a, b) => b.confidence - a.confidence
  );
  const topPrediction = sortedPredictions[0];
  const maxConfidence = topPrediction.confidence;

  console.log("Top 3 predictions:");
  sortedPredictions.slice(0, 3).forEach((pred, idx) => {
    console.log(`${idx + 1}. ${pred.class}: ${pred.percentage}%`);
  });

  const diseaseInfo = diseaseDatabase[topPrediction.class] || {
    disease: "Unknown Disease",
    status: "unknown",
    description: "No information available.",
    treatment: ["Consult an expert"],
  };

  const result = {
    disease: diseaseInfo.disease,
    confidence: parseFloat((maxConfidence * 100).toFixed(1)),
    status: diseaseInfo.status,
    description: diseaseInfo.description,
    treatment: diseaseInfo.treatment,
    scientificName: diseaseInfo.scientificName || null,
    symptoms: diseaseInfo.symptoms || [],
    prevention: diseaseInfo.prevention || [],
    maintenance: diseaseInfo.maintenance || [],
    careInstructions: diseaseInfo.careInstructions || [],
    predictions: sortedPredictions.slice(0, 3),
    isHighConfidence: maxConfidence >= model.confidenceThreshold,
    detectedClass: topPrediction.class,
    allPredictions: sortedPredictions,
  };

  if (maxConfidence < model.confidenceThreshold) {
    result.warning =
      "Low confidence. Try better lighting or consult an expert.";
  }

  if (diseaseInfo.fungicides) result.fungicides = diseaseInfo.fungicides;
  if (diseaseInfo.biologicalControl)
    result.biologicalControl = diseaseInfo.biologicalControl;
  if (diseaseInfo.resistantVarieties)
    result.resistantVarieties = diseaseInfo.resistantVarieties;
  if (diseaseInfo.vector) result.vector = diseaseInfo.vector;
  if (diseaseInfo.transmission) result.transmission = diseaseInfo.transmission;
  if (diseaseInfo.emergency) result.emergency = diseaseInfo.emergency;

  return result;
};

// Handle image analysis request
const analyzeImage = async (req, res) => {
  try {
    console.log("Image analysis started");

    if (!req.uploadedFile) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }

    if (!modelService.isModelLoaded()) {
      console.log("Model not loaded, loading...");
      try {
        await modelService.loadModel();
      } catch (loadError) {
        console.error("Model load error:", loadError);
        return res.status(503).json({
          success: false,
          message: "ML system unavailable. Try again later.",
          error:
            process.env.NODE_ENV === "development"
              ? loadError.message
              : undefined,
        });
      }
    }

    console.log("Processing file:", {
      filename: req.uploadedFile.fileName,
      size: `${(req.uploadedFile.size / 1024).toFixed(2)} KB`,
      type: req.uploadedFile.mimetype,
    });

    const prediction = await predictDisease(req.uploadedFile.path);

    if (!prediction) throw new Error("Model returned no result");
    if (!prediction.disease || typeof prediction.confidence !== "number") {
      throw new Error("Invalid prediction format");
    }

    try {
      if (fs.existsSync(req.uploadedFile.path)) {
        fs.unlinkSync(req.uploadedFile.path);
        console.log("File deleted after processing");
      }
    } catch (cleanupError) {
      console.warn("File cleanup failed:", cleanupError.message);
    }

    console.log(
      `Analysis complete: ${prediction.disease} (${prediction.confidence}%)`
    );

    res.json({
      success: true,
      message: "Image analysis complete",
      data: {
        result: prediction,
        timestamp: new Date().toISOString(),
        processedFile: {
          originalName: req.uploadedFile.originalName,
          size: req.uploadedFile.size,
        },
        modelInfo: {
          isLoaded: modelService.isModelLoaded(),
          version: "TensorFlow.js",
          classes: diseaseConfig.classes.length,
          confidenceThreshold: diseaseConfig.model.confidenceThreshold,
        },
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);

    if (req.uploadedFile?.path && fs.existsSync(req.uploadedFile.path)) {
      try {
        fs.unlinkSync(req.uploadedFile.path);
        console.log("File deleted after error");
      } catch (cleanupError) {
        console.warn("File cleanup failed after error:", cleanupError.message);
      }
    }

    let statusCode = 500;
    let userMessage = "Image analysis failed";

    if (error.message.includes("Model returned no result")) {
      statusCode = 503;
      userMessage = "Detection system is not working. Try again later.";
    } else if (error.message.includes("timeout")) {
      statusCode = 408;
      userMessage = "Processing took too long. Use a smaller image.";
    } else if (error.message.includes("Invalid prediction format")) {
      statusCode = 502;
      userMessage = "Internal system error. Our team is working on it.";
    } else if (error.message.includes("Failed to load ML model")) {
      statusCode = 503;
      userMessage = "ML model cannot be loaded.";
    }

    res.status(statusCode).json({
      success: false,
      message: userMessage,
      error:
        process.env.NODE_ENV === "development"
          ? {
              details: error.message,
              stack: error.stack,
            }
          : undefined,
    });
  }
};

// Get model status
const getModelStatus = async (req, res) => {
  try {
    const modelInfo = modelService.getModelInfo();
    const memoryInfo = modelService.getMemoryInfo();

    res.json({
      success: true,
      data: {
        isLoaded: modelService.isModelLoaded(),
        modelInfo,
        memoryInfo,
        supportedClasses: diseaseConfig.classes,
        totalClasses: diseaseConfig.classes.length,
        confidenceThreshold: diseaseConfig.model.confidenceThreshold,
        modelPath: diseaseConfig.model.path,
        inputShape: diseaseConfig.model.inputShape,
        diseaseDatabase: Object.keys(diseaseConfig.diseaseDatabase),
        healthyClasses: diseaseConfig.utils.getDiseasesByStatus("healthy"),
        diseasedClasses: diseaseConfig.utils.getDiseasesByStatus("diseased"),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get model status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get disease info by class name
const getDiseaseInfo = async (req, res) => {
  try {
    const { className } = req.params;

    if (!className) {
      return res
        .status(400)
        .json({ success: false, message: "Class name required" });
    }

    const diseaseInfo = diseaseConfig.utils.getDiseaseInfo(className);

    if (!diseaseInfo) {
      return res.status(404).json({
        success: false,
        message: `Disease not found for class: ${className}`,
      });
    }

    res.json({
      success: true,
      data: {
        className,
        diseaseInfo,
        isHealthy: diseaseConfig.utils.isHealthy(className),
        classIndex: diseaseConfig.utils.getClassIndex(className),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get disease information",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  analyzeImage,
  getModelStatus,
  getDiseaseInfo,
};
