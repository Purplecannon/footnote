/**
 * ProjectCard.tsx
 * Displays a project card with a thumbnail, title, and an optional create button.
 * On click, it triggers a provided callback function.
 */

import React from "react";
import { ProjectData } from "../../types/types"; // Type definition for project data
import "./ProjectCard.css"; // CSS module for styling
import placeholderThumbnail from "../../assets/placeholder-thumbnail.png"; // Default thumbnail
import windowPixel from "../../assets/window-png-by-meeee.png"; // Frame overlay image

// Props type definition for ProjectCard
interface Props {
  project: ProjectData; // Project data containing title and thumbnail URL
  onClick: () => void; // Click event handler
  isCreateButton?: boolean; // Optional flag indicating if this is a create button
}

// ProjectCard Component
const ProjectCard: React.FC<Props> = ({ project, onClick, isCreateButton }) => {
  const { title, thumbnailURL } = project;
  const placeholderPic = placeholderThumbnail; // Fallback thumbnail image

  return (
    <div className="project-card" onClick={onClick}>
      <div className="thumbnail-container">
        {/* Project thumbnail or placeholder */}
        <img
          src={thumbnailURL || placeholderPic}
          alt={title}
          className={isCreateButton ? "no-shadow" : ""}
        />

        {/* Overlay frame if not a create button */}
        {!isCreateButton && (
          <img
            src={windowPixel}
            alt="Window Frame Overlay"
            className="frame-overlay"
          />
        )}
      </div>

      {/* Project title or fallback text */}
      <p className="project-title">{title || "Untitled"}</p>
    </div>
  );
};

export default ProjectCard;
