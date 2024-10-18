import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./VideoUploadPlayer.css";

/**
 * VideoUploadPlayer Component
 *
 * This component allows users to upload a video and play it using the Video.js library.
 * The video is uploaded to the server, and the server responds with the URL of the uploaded video.
 *
 * @returns {JSX.Element} The video upload and playback interface.
 */
const VideoUploadPlayer = () => {
  // State to store the video source URL from the server
  const [videoSrc, setVideoSrc] = useState(null);
  const [uploading, setUploading] = useState(false); // State to track upload progress
  const [error, setError] = useState(null); // State to track errors
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
      });
      playerRef.current.src({ src: videoSrc, type: "video/mp4" });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, [videoSrc]);

  /**
   * handleFileUpload
   *
   * Handles the file input change event and uploads the file to the server.
   * @param {Object} event - The file input change event.
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true); // Set uploading state to true
    setError(null); // Reset error state

    const formData = new FormData();
    formData.append("video", file);

    try {
      // Send the video file to the backend for upload
      const response = await fetch("/api/videos/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update the video source with the URL from the backend
        setVideoSrc(data.data); // The S3 URL of the uploaded video
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      setError(`Error uploading video: ${err.message}`);
    } finally {
      setUploading(false); // Set uploading state to false
    }
  };

  return (
    <div className="video-upload-container">
      <h2 className="video-upload-header">Upload and Play Your Video</h2>
      {/* File input for uploading the video */}
      <input type="file" accept="video/mp4" onChange={handleFileUpload} />

      {/* Display upload progress or error */}
      {uploading && <p>Uploading video...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Show video player or placeholder */}
      {videoSrc ? (
        <video ref={videoRef} className="video-js vjs-default-skin" controls />
      ) : (
        <div className="video-placeholder">No video selected</div>
      )}
    </div>
  );
};

export default VideoUploadPlayer;
