const express = require("express");
const multer = require("multer");
const { uploadToS3 } = require("../services/s3Service");
const router = express.Router();

const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send({ error: "No file provided" });
    }

    // Upload the file to S3 (DigitalOcean Spaces)
    const result = await uploadToS3(file);

    // Return the URL of the uploaded video to the client
    res.status(200).json({
      videoId: result.Location, // Return the public URL of the uploaded video
      data: result.data,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
