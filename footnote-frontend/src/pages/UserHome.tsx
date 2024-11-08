import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import ProjectCard from "../components/ProjectCard";
import useProject from "../hooks/useProject";
import { ProjectData } from "../types/types";
import mockProjects from "../data/mockProjects";

const UserHome: React.FC = () => {
  const { projects, loading, error } = useProject();
  const navigate = useNavigate();

  const newProject: ProjectData = {
    id: 0,
    title: "Create a New Project",
    thumbnailURL:
      "https://cdn.discordapp.com/attachments/1264335829665448039/1300599343371391018/file-hu0jIFPQTu4pGA4RKhIGQqCY.png?ex=67216d07&is=67201b87&hm=b3503a7e15a556693dce560d57da88ea67e125791855aa812570a7bc96bca2c4&",
    videoURL: "",
  };

  const handleCreateNewProject = () => {
    navigate("/create-new");
  };

  const shouldShowMockProjects = !loading && (error || projects.length === 0);

  return (
    <section id="homepage" className="block homepage-block">
      <Container>
        <div className="title-holder">
          <h1 className="text-center mb-4">Project Home</h1>
        </div>
        {error && (
          <p className="text-center text-danger">
            Unable to fetch projects. Showing mock projects instead.
          </p>
        )}
        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center"
          style={{ width: "100%", flexWrap: "nowrap" }}
        >
          <div>
            <ProjectCard
              project={newProject}
              buttonText="Create New Project"
              onClick={handleCreateNewProject}
            />
          </div>
          {shouldShowMockProjects
            ? mockProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  />
                </div>
              ))
            : projects.map((project) => (
                <div key={project.id}>
                  <ProjectCard
                    project={project}
                    buttonText="View Project"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  />
                </div>
              ))}
        </Stack>
      </Container>
    </section>
  );
};

export default UserHome;
