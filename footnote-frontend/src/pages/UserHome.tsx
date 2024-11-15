import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import useProject from "../hooks/useProject";
import { ProjectData } from "../types/types";
import axios from "axios";
import { API_BASE_URL } from "../config";
import plus_icon from "../assets/plus_icon.jpg"


const UserHome: React.FC = () => {
  const { projects, error } = useProject();
  const navigate = useNavigate();

  const newProject: ProjectData = {
    id: 0,
    title: "Create Project",
    thumbnailURL:
      plus_icon,
    videoURL: "",
  };

  const handleCreateNewProject = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/projects/create-project`,
        { withCredentials: true }
      );
      const newPid = response.data.pid;
      console.log(newPid);
      navigate(`/project/${newPid}`);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  return (
    <section id="homepage" className="block homepage-block">
      <div className="page-border-wrapper"> {/* Container with border */}
        <div className="page-content"> {/* Inner content container */}
          <div className="header">
            <div className="text">Home</div>
            <div className="underline" />
            <div className="underline-gap" style={{ marginTop: "40px" }}> {/* New gap element */}</div>
          </div>

          {error && (
            <p className="text-center text-danger">
              Unable to fetch projects. Showing mock projects instead.
            </p>
          )}

          <div className="hstack gap-3"> {/* Container for project cards */}
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
                  <div key={project.id}>
                    <ProjectCard
                      project={project}
                      onClick={() => navigate(`/project/${project.id}`)}
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
