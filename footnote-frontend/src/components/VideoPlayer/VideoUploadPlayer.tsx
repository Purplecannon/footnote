import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import "./VideoUploadPlayer.css";

const VideoUploadPlayer: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      setError("Please select a valid video file.");
      return;
    }

    // Set the file and create an object URL for the video
    setVideoFile(file);
    setVideoSrc(URL.createObjectURL(file)); // For local playback
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/mp4": [] }, // Limit accepted file types to MP4
    maxFiles: 1,
  });

  return (
    <div className="video-upload-container">
      <h2 className="video-upload-header">Upload and Play Your Video</h2>

      {/* Dropzone Area for Video Upload */}
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the video here...</p>
        ) : (
          <p>Drag 'n' drop a video file here, or click to select one</p>
        )}
      </div>

      {/* Show Error if Any */}
      {error && <p className="error-message">{error}</p>}

      {/* Show the React Player for Playback */}
      {videoSrc ? (
        <ReactPlayer
          url={videoSrc}
          controls
          width="100%"
          height="100%"
          className="video-player"
        />
      ) : (
        <div className="video-placeholder">No video selected</div>
      )}
    </div>
  );
};

export default VideoUploadPlayer;
