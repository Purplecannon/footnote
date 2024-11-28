/**
 * Author: Mia
 *
 * Provides functionality to generate a thumbnail image
 * from a video buffer. The thumbnail is created using the fluent-ffmpeg library,
 * and temporary files are managed to handle the intermediate processing steps.
 */

const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

// Directory for storing temporary files (video and thumbnail)
const thumbnailDir = path.join(__dirname, "thumbnails-temp");

// Ensure the temporary thumbnail directory exists; create it if not present
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

/**
 * Generates a thumbnail image from a video buffer.
 *
 * @param {Buffer} videoBuffer - The video file data provided as a buffer.
 * @param {string} videoName - The original name of the video, used for naming temporary files.
 * @param {function} callback - A callback function to handle the generated thumbnail or errors.
 *                              Callback signature: (error, thumbnailBuffer) => void
 */
function generateThumbnail(videoBuffer, videoName, callback) {
  const timestamp = Date.now();

  // Define the path for the temporary thumbnail image
  const thumbnailPath = path.join(
    thumbnailDir,
    `thumbnail-${timestamp}-${videoName}.jpg`
  );

  // Define the path for the temporary video file to process
  const tempVideoPath = path.join(
    thumbnailDir,
    `video-${timestamp}-${videoName}.mp4`
  );

  // Save the video buffer to a temporary file
  fs.writeFileSync(tempVideoPath, videoBuffer);

  // Use ffmpeg to generate a thumbnail from the video
  ffmpeg()
    .input(tempVideoPath) // Input the temporary video file
    .inputOptions(["-ss 1"]) // Skip first second of the video for thumbnail generation
    .output(thumbnailPath) // Save the generated thumbnail to the specified path
    .outputOptions([
      "-vframes 1", // Capture only one frame
      "-filter_complex",
      "scale=w=320:h=240", // Scale the image to 320x240 resolution
    ])
    .on("end", function () {
      console.log(
        "Temporary thumbnail created successfully at:",
        thumbnailPath
      );

      // Read the generated thumbnail into a buffer
      const thumbnailBuffer = fs.readFileSync(thumbnailPath);

      // Clean up temporary files (video and thumbnail)
      fs.unlinkSync(tempVideoPath);
      fs.unlinkSync(thumbnailPath);

      // Return the thumbnail buffer through the callback with no error
      callback(null, thumbnailBuffer);
    })
    .on("error", function (err) {
      console.error("Error creating thumbnail:", err);

      // Clean up the temporary video file in case of an error
      if (fs.existsSync(tempVideoPath)) {
        fs.unlinkSync(tempVideoPath);
      }

      callback(err); // Return the error through the callback
    })
    .run(); // Execute the ffmpeg command
}

// Exports
module.exports = generateThumbnail;
