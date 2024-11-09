import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Annotation from "../components/Annotation";

const AnnotationPage: React.FC = () => {
  return (
    <Container fluid>
      {/* Header Placeholder */}
      <Row className="bg-primary text-white p-3 mb-3">
        <Col>
          <h1 className="text-center">Header Placeholder</h1>
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
            <div className="placeholder-video bg-dark text-white p-5">
              <h2>Video Player</h2>
              <p>Placeholder for video player component</p>
            </div>
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
