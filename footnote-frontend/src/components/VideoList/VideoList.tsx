import React, { useState } from "react";
import axios from "axios";

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: "Video 1", thumbnail: "thumbnail1.jpg" },
    { id: 2, title: "Video 2", thumbnail: "thumbnail2.jpg" },
    // Fetch your videos from the server in a real implementation
  ]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Prepare form data for the file upload
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0); // Reset progress

    try {
      // Make the request to the backend for uploading
      const response = await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted); // Update progress
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // On success, update the video list
      const uploadedVideo = {
        id: response.data.videoId, // Assuming the response returns the video ID
        title: file.name,
        thumbnail: response.data.thumbnail, // Assuming the backend generates and returns a thumbnail URL
      };

      setVideos([...videos, uploadedVideo]);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id}>
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </div>
        ))}
      </div>

      {/* Upload Button at the Tail of the List */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="video-upload" className="upload-button">
          {isUploading ? "Uploading..." : "Upload Video"}
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the input and use label as button
          />
        </label>

        {/* Show Progress Bar if Uploading */}
        {isUploading && (
          <div>
            <progress value={uploadProgress} max="100" />
            <p>{uploadProgress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
