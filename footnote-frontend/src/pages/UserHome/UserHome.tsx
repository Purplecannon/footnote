/**
 * UserHome.tsx
 *
 * This file defines the `UserHome` React component, which serves as the user's main homepage
 * for managing projects. It displays a list of projects retrieved from the backend and includes
 * a button for creating a new project.
 *
 * Features:
 * - Fetches user projects from the backend using the `useProject` hook.
 * - Handles loading, error states, and displays the projects dynamically.
 * - Uses a reusable `ProjectCard` component for project display.
 * - Integrates navigation for creating and viewing individual projects.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import useProject from "../../hooks/useProject";
import { ProjectData } from "../../types/types";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import NewProjectIMG from "../../assets/plus_icon.jpg";
import "./UserHome.css";

const UserHome: React.FC = () => {
  const { projects, error, loading } = useProject(null);
  const navigate = useNavigate();

  const newProject: ProjectData = {
    projectID: 0,
    title: "Create a New Project",
    thumbnailURL: NewProjectIMG,
    videoURL: "",
  };

  /**
   * Handles the creation of a new project.
   * Requests the backend to create a project, fetches its data, and navigates to its page.
   */
  const handleCreateNewProject = async () => {
    try {
      // Request the backend to create a new project and get its ID
      const response = await axios.get(
        `${API_BASE_URL}/projects/create-project`,
        { withCredentials: true }
      );

      const newProjectID = response.data.pid;
      console.log("New Project ID:", newProjectID);
      // Navigate to the new project page
      navigate(`/project/${newProjectID}`);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <section id="homepage" className="block homepage-block">
      <div className="page-border-wrapper">
        {" "}
        {/* Container with border */}
        <div className="page-content">
          {" "}
          {/* Inner content container */}
          <div className="header">
            <div className="text">Home</div>
            <div className="underline" />
            <div className="underline-gap" style={{ marginTop: "40px" }}>
              {" "}
              {/* New gap element */}
            </div>
          </div>
          {error && (
            <p className="text-center text-danger">
              Unable to fetch projects. Showing mock projects instead.
            </p>
          )}
          <div className="hstack gap-3">
            {" "}
            {/* Container for project cards */}
            <div className="spacer"></div> {/* Spacer for left padding */}
            <div>
              <ProjectCard
                project={newProject}
                onClick={handleCreateNewProject}
              />
            </div>
            {projects.length > 0 && (
              <>
                {projects.map((project) => (
                  <div key={project.projectID}>
                    <ProjectCard
                      project={project}
                      onClick={() => navigate(`/project/${project.projectID}`)}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserHome;
