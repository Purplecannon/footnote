const express = require("express");
const multer = require("multer"); // Middleware for handling file uploads
const { uploadToS3 } = require("../../services/s3Service"); // Import the S3 upload function

const router = express.Router();

// Configure multer to store uploaded files in memory (in a buffer)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /upload-video
 *
 * Route for uploading a video file. The file is uploaded to the server, and then stored in
 * DigitalOcean Spaces using the AWS SDK. The route expects a single video file and returns
 * the URL of the uploaded file.
 *
 * @name POST /upload-video
 * @function
 * @param {string} path - Express route path.
 * @param {callback} middleware - Middleware to handle file uploads using multer.
 * @param {callback} callback - Async function that handles the request and response.
 */
router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    const file = req.file; // Retrieve the uploaded file from the request
    if (!file) {
      // If no file is provided in the request, return an error
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Call the S3 upload function to store the file in DigitalOcean Spaces
    const uploadResult = await uploadToS3(file);

    // Respond with success and the URL of the uploaded video
    return res.status(200).json({
      message: "Video uploaded successfully!",
      data: uploadResult.Location, // The S3 URL of the uploaded file
    });
  } catch (error) {
    // Log the error and return a 500 error response if the upload fails
    console.error("Error uploading video:", error);
    return res.status(500).json({ error: "Failed to upload video." });
  }
});

module.exports = router;
//export default router
