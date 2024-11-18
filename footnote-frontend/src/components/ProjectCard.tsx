import React from "react";

import { ProjectData } from "../types/types";
import "./ProjectCard.css";
import Card from "react-bootstrap/Card";
import dancer from "../assets/dancers.png";
import Button from "react-bootstrap/Button";

interface Props {
  project: ProjectData;

  buttonText: string;

  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, buttonText, onClick }) => {
  const { title, thumbnailURL } = project;

  const placeholderPic = dancer;

  return (
    <div className="holder">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={thumbnailURL || placeholderPic} />

        <Card.Body>
          <Card.Title>{title || "Untitled"}</Card.Title>

          <Button variant="primary" onClick={onClick}>
            {buttonText}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectCard;
