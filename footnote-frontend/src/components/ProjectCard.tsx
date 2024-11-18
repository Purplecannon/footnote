import React from "react";
import { ProjectData } from "../types/types";
import "./ProjectCard.css";
import dancers from "../assets/dancers.png";

interface Props {
  project: ProjectData;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const { title, thumbnailURL } = project;
  const placeholderPic = dancers;

  return (
    <div className="project-card" onClick={onClick}>
      <img src={thumbnailURL || placeholderPic} alt={title} />
      <p className="project-title">{title || "Untitled"}</p>
    </div>
  );
};

export default ProjectCard;
