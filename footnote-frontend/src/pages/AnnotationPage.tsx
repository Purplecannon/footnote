import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Annotation from "../components/Annotation";
import ReactPlayer from "react-player";
import video from "../assets/dog.mp4"
import { useRef, useState} from 'react';

interface VideoInformation {
  title: string;
  timestamp: string;
}
const AnnotationPage: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null);

  const [title, setTitle] = useState<string>("Header Placeholder");
  const [timestamp, setTimestamp] = useState<number>(0); 

  // Function to handle the pause event and log the timestamp
  const handlePause = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setTimestamp(currentTime); // Update the timestamp state as a raw number
      console.log('Video paused at:', timestamp);
    }
  };

  // Function to handle title change
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // Update the title in the state
  };

  return (
    <Container fluid>
      {/* Header Placeholder */}
      <Row className="bg-primary text-white p-3 mb-3">
        <Col>
        <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control text-center"
            style={{ fontSize: "2rem", backgroundColor: "transparent", border: "none", color: "white" }}
          />        
          </Col>
      </Row>

      {/* Main Content */}
      <Row className="vh-100">
        {/* Left Half - Placeholder for Video Player */}
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center border-end"
        >
          <div className="text-center">
            {/* <div className="placeholder-video bg-dark text-white p-5">
              <h2>Video Player</h2>
              <p>Placeholder for video player component</p>
            </div> */}
            <ReactPlayer controls={true} ref={playerRef} onPause={handlePause}url={video} />
          </div>
        </Col>

        {/* Right Half - Annotation Component */}
        <Col md={6} className="d-flex">
          <div className="w-100">
            <Annotation />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnotationPage;
