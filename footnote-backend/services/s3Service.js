const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config(); // Load .env variables

// Configure the AWS SDK v3 for DigitalOcean Spaces
const s3Client = new S3Client({
  region: "us-east-1", // (required by AWS SDK, but ignored by DigitalOcean Spaces)
  endpoint: process.env.DO_SPACES_ENDPOINT, // DigitalOcean Spaces endpoint
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// Space (bucket) name from .env
const BUCKET_NAME = process.env.DO_SPACES_BUCKET;

// Function to upload a file to DigitalOcean Spaces
async function uploadToS3(file) {
  // Create S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME, // Bucket name from .env
    Key: `videos/${Date.now()}-${file.originalname}`, // Unique file name with timestamp
    Body: file.buffer, // File content
    ContentType: file.mimetype, // MIME type of the file
    ACL: "public-read", // Access control (public-read makes the file publicly accessible)
  };

  try {
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command); // Send the PutObjectCommand to S3
    return {
      Location: `${process.env.DO_SPACES_ENDPOINT}/${BUCKET_NAME}/${params.Key}`, // Return the file URL
      data,
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw error;
  }
}

module.exports = { uploadToS3 };
