import React from "react";
import { ProjectData } from "../../types/types";
import "./ProjectCard.css";
import placeholderThumbnail from "../../assets/placeholder-thumbnail.png";
import windowPixel from "../../assets/window-png-by-meeee.png";

interface Props {
  project: ProjectData;
  onClick: () => void;
  isCreateButton?: boolean;
}

const ProjectCard: React.FC<Props> = ({ project, onClick, isCreateButton }) => {
  const { title, thumbnailURL } = project;
  const placeholderPic = placeholderThumbnail;

  return (
    <div className="project-card" onClick={onClick}>
      <div className="thumbnail-container">
        <img
          src={thumbnailURL || placeholderPic}
          alt={title}
          className={isCreateButton ? "no-shadow" : ""}
        />
        {!isCreateButton && (
          <img
            src={windowPixel} // The frame image you want to overlay
            alt="Window Frame Overlay"
            className="frame-overlay"
          />
        )}
      </div>
      <p className="project-title">{title || "Untitled"}</p>
    </div>
  );
};

export default ProjectCard;
