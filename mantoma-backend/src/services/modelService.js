// TensorFlow.js model service
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");
const diseaseConfig = require("../config/diseaseConfig");

class ModelService {
  constructor() {
    this.model = null;
    this.isLoaded = false;
    this.modelPath = diseaseConfig.model.path;
    this.inputShape = diseaseConfig.model.inputShape;
  }

  // Load model from file
  async loadModel() {
    try {
      console.log("Loading TensorFlow.js model from Hugging Face...");

      const modelUrl =
        "https://huggingface.co/reizkafathia/mantoma-tfjs/resolve/main/model.json";

      this.model = await tf.loadGraphModel(modelUrl);
      this.isLoaded = true;

      console.log("Model loaded");
      console.log(`Input shape: [${this.inputShape.join(", ")}]`);
      console.log(`Classes: ${diseaseConfig.classes.length}`);

      return true;
    } catch (error) {
      console.error("Failed to load model:", error);
      this.isLoaded = false;
      throw new Error(`Failed to load model: ${error.message}`);
    }
  }

  // Check if model is loaded
  isModelLoaded() {
    return this.isLoaded && this.model !== null;
  }

  // Get basic model info
  getModelInfo() {
    if (!this.isModelLoaded()) {
      return {
        loaded: false,
        message: "Model not loaded",
      };
    }

    return {
      loaded: true,
      inputShape: this.inputShape,
      outputShape: "N/A (Graph model)",
      totalParams: "N/A (Graph model)",
      classes: diseaseConfig.classes.length,
    };
  }

  // Prepare image for model
  preprocessImage(imageBuffer) {
    try {
      console.log("Decoding image...");
      const imageTensor = tf.node.decodeImage(imageBuffer, 3); // decode as RGB
      console.log("Decoded shape:", imageTensor.shape);

      if (imageTensor.shape.length !== 3 || imageTensor.shape[2] !== 3) {
        imageTensor.dispose();
        throw new Error(
          `Expected RGB image with shape [H, W, 3], got shape: ${imageTensor.shape}`
        );
      }

      console.log("Converting RGB to BGR...");
      const b = imageTensor.slice([0, 0, 2], [-1, -1, 1]);
      const g = imageTensor.slice([0, 0, 1], [-1, -1, 1]);
      const r = imageTensor.slice([0, 0, 0], [-1, -1, 1]);
      const bgrImage = tf.concat([b, g, r], 2); // shape [H, W, 3]

      console.log("Resizing image...");
      const resized = tf.image.resizeBilinear(bgrImage, [
        this.inputShape[0],
        this.inputShape[1],
      ]);

      console.log("Normalizing...");
      const normalized = resized.div(255.0);

      console.log("Adding batch dimension...");
      const batched = normalized.expandDims(0); // shape [1, height, width, 3]

      // Dispose intermediate tensors
      imageTensor.dispose();
      b.dispose();
      g.dispose();
      r.dispose();
      bgrImage.dispose();
      resized.dispose();
      normalized.dispose();

      console.log("Preprocessing complete. Final shape:", batched.shape);
      return batched;
    } catch (error) {
      console.error("Image preprocess error:", error);
      throw new Error(`Preprocess failed: ${error.message}`);
    }
  }

  // Run prediction on image
  async predict(imageBuffer) {
    if (!this.isModelLoaded()) {
      throw new Error("Model not loaded. Call loadModel() first.");
    }

    let processedImage = null;
    let prediction = null;

    try {
      console.log("Preprocessing image...");
      processedImage = this.preprocessImage(imageBuffer);

      console.log("Running model prediction...");
      prediction = await this.model.executeAsync(processedImage);

      const predictionData = await prediction.data();
      const predictions = Array.from(predictionData);

      console.log("Prediction done:", predictions);
      return predictions;
    } catch (error) {
      console.error("Prediction error:", error);
      throw new Error(`Prediction failed: ${error.message}`);
    } finally {
      if (processedImage) processedImage.dispose();
      if (prediction) prediction.dispose();
    }
  }

  // Dispose model to free memory
  async unloadModel() {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isLoaded = false;
      console.log("Model unloaded");
    }
  }

  // Get memory usage details
  getMemoryInfo() {
    return {
      numTensors: tf.memory().numTensors,
      numBytes: tf.memory().numBytes,
      numBytesInGPU: tf.memory().numBytesInGPU || 0,
    };
  }
}

// Export singleton
const modelService = new ModelService();
module.exports = modelService;
