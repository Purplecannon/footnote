import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Project {
  pid: string; // Project ID
  thumbnailUrl: string; // URL for the project's thumbnail image
  title: string; // Name of the project
  videoUrl: string; // URL for the project's video
}

/**
 * Projects component that fetches and displays a list of projects.
 * Each project links to a project details page containing its video and the video's annotations.
 * A "Create New" button allows the user to upload a new video (i.e., create a new project).
 */
const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect hook to fetch projects from the backend when the component is mounted.
   * It sets the project data and handles loading or errors based on the response.
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects"); // Destructure response
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err); // Log error to console
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures the effect runs only once (on mount)

  /**
   * Function to handle the opening of a video upload modal or redirection to a video upload page.
   * Placeholder for future logic for the upload functionality.
   */
  const handleVideoUpload = () => {
    console.log("Video upload functionality will go here.");
    // Future logic for handling video uploads
    // Because I haven't thought it through tyet
  };

  // Return loading state or error if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="projects-grid">
      {/* "Create New" button to upload a new video */}
      <div className="project-tile create-new">
        <button type="button" onClick={handleVideoUpload}>
          <span className="plus-sign">+</span>
          <span>Create New</span>
        </button>
      </div>

      {/* Map over the fetched projects and display each one with a thumbnail and link to its details */}
      {projects.map(({ pid, thumbnailUrl, title }) => (
        <div className="project-tile" key={pid}>
          <Link to={`/projects/${pid}`}>
            <img src={thumbnailUrl} alt={title} />
            <div className="project-title">{title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Projects;
