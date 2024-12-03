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
import "./UserHome.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import home from "../../assets/home.png";
import plusHologram from "../../assets/plus-hologram.png";

const UserHome: React.FC = () => {
  const { projects, error, loading } = useProject(null);
  const navigate = useNavigate();

  const newProject: ProjectData = {
    projectID: 0,
    title: " ",
    thumbnailURL: plusHologram,
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
        <div className="page-content">
          <div className="header">
            <div className="home">
              <img src={home} alt="HOME" />
            </div>
          </div>
          {error && (
            <p className="text-center text-danger">Unable to fetch projects.</p>
          )}

          <div className="home-container">
            <div className="d-flex flex-wrap justify-content-start g-4">
              {/* New project card */}
              <div>
                <ProjectCard
                  project={newProject}
                  onClick={handleCreateNewProject}
                  isCreateButton={true}
                />
              </div>
              {/* Existing project cards */}
              {projects.map((project) => (
                <div key={project.projectID}>
                  <ProjectCard
                    project={project}
                    onClick={() => navigate(`/project/${project.projectID}`)}
                    isCreateButton={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <LogoutButton></LogoutButton>
      </div>
    </section>
  );
};

export default UserHome;
