import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

interface Annotation {
  timestamp: number;
  text: string;
}

const VideoPlayback: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [annotationText, setAnnotationText] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const playerRef = useRef<ReactPlayer | null>(null);

  // Update current time when video plays
  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  // Get total video duration
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // Handle annotation addition
  const handleAddAnnotation = () => {
    if (annotationText.trim()) {
      setAnnotations([
        ...annotations,
        { timestamp: currentTime, text: annotationText },
      ]);
      setAnnotationText(""); // Clear input after adding
    }
  };

  // Slider change handler
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, "seconds"); // Seek to the selected time
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left: Video and Slider */}
      <div style={{ flex: 2 }}>
        <ReactPlayer
          ref={playerRef}
          url="https://video URL.mp4"
          controls
          width="100%"
          height="300px"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          step="0.01"
        />
        <div>
          <input
            type="text"
            value={annotationText}
            placeholder="Enter annotation"
            onChange={(e) => setAnnotationText(e.target.value)}
          />
          <button onClick={handleAddAnnotation}>Add Annotation</button>
        </div>
      </div>

      {/* Right: Annotations List */}
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <h3>Annotations</h3>
        <ul>
          {annotations.map((annotation, index) => (
            <li key={index}>
              <strong>{annotation.timestamp.toFixed(2)}s:</strong>{" "}
              {annotation.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPlayback;
