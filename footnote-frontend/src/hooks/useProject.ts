import { useState, useEffect } from "react";

import axios, {AxiosError} from "axios";

import { ProjectData } from "../types/types";

import { API_BASE_URL } from "../config";

/**

* Custom hook for managing project CRUD operations and fetching all projects.

*

* @param {number | null} projectID - The ID of the project to fetch. If null, it's for new projects.

* @returns {Object} - An object containing project data, project list, loading, error states, and CRUD functions.

*/

const useProject = (projectID: number | null) => {
  const [project, setProject] = useState<ProjectData | null>(null);

  const [projects, setProjects] = useState<ProjectData[]>([]); // List of all projects

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // Fetch project data on mount or when projectID changes

  useEffect(() => {
    if (projectID !== null) {
      getProject(projectID);
    } else {
      // log error

      console.log(`error fetching project: null project id`);

      setLoading(false);
    }
  }, [projectID]);

  // Fetch all projects on mount

  useEffect(() => {
    getAllProjects();
  }, []);

  /**

* Fetch a project by its ID.

* @param {number} id - The project ID.

*/

  const getProject = async (id: number) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_BASE_URL}/projects/load-project/${id}`,

        {
          withCredentials: true,
        }
      );

      console.log(`data`);

      console.log(data);

      setProject(data); // Set project directly from response
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn(`Project with ID ${id} not found.`);
      } else {
        console.error("Error fetching project data:", err);

        setError("Failed to load project data.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**

* Fetch all projects with basic details.

*/

  const getAllProjects = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API_BASE_URL}/projects/home`, {
        withCredentials: true,
      });

      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);

      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  /**

* Update the title of the current project.

* @param {string} newTitle - The new title for the project.

*/

  const updateProject = async (newTitle: string) => {
    if (!project) {
      setError("No project data available to update.");

      return;
    }

    console.log(project, project.projectID);

    try {
      await axios.put(
        `${API_BASE_URL}/projects/edit-project-name`,

        { pid: project.projectID, projectName: newTitle },

        { withCredentials: true }
      );

      setProject((prev) => (prev ? { ...prev, title: newTitle } : null)); // Update only the title
    } catch (err) {
      if(err instanceof AxiosError) {
        if(err.response && err.response.data) {
          console.log(err.response?.data?.message);
          alert(err.response?.data?.message);
        }
        else {
          // invalid or missing error message
          console.log(err);
        }
        
      }
      else {
        console.log(err);
      }
      //alert("Project title is too long");
      //console.error("Error updating project title:", err);
      //setError("Failed to update project title. Please try again.");
    }
  };

  /**

* Delete the current project by its ID.

*/

  const deleteProject = async () => {
    if (!project) {
      setError("No project data available to delete.");

      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/projects/delete-project/${project.projectID}`,

        { withCredentials: true }
      );

      setProject(null); // Clear state on successful deletion

      alert("Project deleted successfully.");
    } catch (err) {
      console.error("Error deleting project:", err);

      setError("Failed to delete project. Please try again.");
    }
  };

  return {
    project,

    projects, // List of all projects

    setProject,

    loading,

    error,

    getProject,

    getAllProjects,

    updateProject,

    deleteProject,
  };
};

export default useProject;
