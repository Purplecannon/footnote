/**
 * useProject.ts
 * Custom hook for managing project CRUD operations and fetching projects.
 * Provides functions for creating, reading, updating, and deleting projects.
 */

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { ProjectData } from "../types/types"; // Project type definition
import { API_BASE_URL } from "../config"; // API base URL configuration

/**
 * useProject Hook
 * Manages project CRUD operations and project list retrieval.
 * @param projectID - The ID of the project to fetch. If null, it's for new projects.
 * @returns Object containing project data, project list, loading state, error state, and CRUD functions.
 */
const useProject = (projectID: number | null) => {
  const [project, setProject] = useState<ProjectData | null>(null); // Active project
  const [projects, setProjects] = useState<ProjectData[]>([]); // List of all projects
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [error, setError] = useState<string | null>(null); // Error message state

  /**
   * Fetches the current project when projectID changes.
   */
  useEffect(() => {
    if (projectID !== null) {
      getProject(projectID);
    } else {
      console.error("Error fetching project: null project ID.");
      setLoading(false); // Stop loading when projectID is invalid
    }
  }, [projectID]);

  /**
   * Fetches all projects when the component mounts.
   */
  useEffect(() => {
    getAllProjects();
  }, []);

  /**
   * Fetches project details by its ID.
   * @param id - The project ID.
   */
  const getProject = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get<ProjectData>(
        `${API_BASE_URL}/projects/load-project/${id}`,
        { withCredentials: true }
      );
      setProject(data); // Set project details
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
   * Fetches all projects with basic details.
   */
  const getAllProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<ProjectData[]>(
        `${API_BASE_URL}/projects/home`,
        { withCredentials: true }
      );
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates the project title.
   * @param newTitle - New title for the project.
   */
  const updateProject = async (newTitle: string) => {
    if (!project) {
      setError("No project data available to update.");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/projects/edit-project-name`,
        {
          pid: project.projectID,
          projectName: newTitle,
        },
        { withCredentials: true }
      );
      setProject((prev) => (prev ? { ...prev, title: newTitle } : null));
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        console.error(err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error("Error updating project title:", err);
      }
    }
  };

  /**
   * Deletes the current project.
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
      setProject(null); // Reset project state
      alert("Project deleted successfully.");
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
    }
  };

  return {
    project,
    projects,
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
