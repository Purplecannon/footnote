/**
 * Provides functionality to generate a thumbnail image from a video buffer using
 * the fluent-ffmpeg library. It handles temporary video files and thumbnail images
 * during the processing steps.
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
 * This function processes the video buffer by saving it as a temporary video file,
 * and using ffmpeg to generate a thumbnail image. The thumbnail is returned via
 * a callback function, and temporary files are cleaned up after processing.
 *
 * @param {Buffer} videoBuffer - The video data as a buffer that will be processed to generate the thumbnail.
 * @param {string} videoName - The name of the video, used for naming temporary files.
 * @param {function} callback - A callback function that handles the generated thumbnail or errors.
 *                               The callback should have the following signature:
 *                               `(error, thumbnailBuffer) => void`
 *                               - `error` is an error object if an error occurs during thumbnail generation,
 *                                 or `null` if successful.
 *                               - `thumbnailBuffer` is the buffer containing the generated thumbnail image.
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
      "crop='min(iw,ih)':'min(iw,ih)':'(iw-min(iw,ih))/2':'(ih-min(iw,ih))/2',scale=550:550", // Crop to square and scale
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
