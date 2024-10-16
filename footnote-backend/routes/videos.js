// routes/videos.js
const express = require("express");
const multer = require("multer"); // Middleware for handling file uploads
const { uploadToS3 } = require("../services/s3Service"); // Import the S3 upload function

const router = express.Router();

// Set up multer to store uploaded files in memory (in a buffer)
const upload = multer({ storage: multer.memoryStorage() });

// POST route to upload a video
router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    const file = req.file; // Retrieve the file from the request
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." }); // Handle missing file error
    }

    // Call the S3 upload function from s3Service.js
    const uploadResult = await uploadToS3(file);

    // Respond with success and the uploaded file's URL (provided by S3)
    res.status(200).json({
      message: "Video uploaded successfully!",
      data: uploadResult.Location, // The S3 URL of the uploaded file
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video." }); // Handle upload errors
  }
});

module.exports = router;
