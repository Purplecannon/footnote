import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`); // Navigate to playback page
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(progress);
        },
      });

      const uploadedVideo: Video = {
        id: response.data.videoId,
        title: file.name,
        thumbnail: response.data.thumbnail,
        videoUrl: response.data.videoUrl,
      };

      setVideos([...videos, uploadedVideo]);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="video-list-container">
      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-thumbnail"
            onClick={() => handleVideoClick(video.id)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </div>
        ))}
        <div className="upload-new">
          <label htmlFor="file-upload">
            <div className="upload-box">+ Create New</div>
            <input
              type="file"
              id="file-upload"
              accept="video/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
          {isUploading && (
            <progress value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
