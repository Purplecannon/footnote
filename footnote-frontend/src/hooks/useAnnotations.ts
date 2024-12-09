/**
 * useAnnotations.ts
 * Custom React Hook for managing annotations linked to a specific project.
 * Provides functionalities for fetching, adding, editing, and deleting annotations.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { AnnotationData } from "../types/types"; // Type definition for annotations
import { API_BASE_URL } from "../config"; // API base URL

/**
 * useAnnotations Hook
 * Manages annotations for a given project ID.
 * @param projectID - ID of the project whose annotations are managed.
 */
export const useAnnotations = (projectID: number) => {
  // State for annotations, loading status, and errors
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches annotations for the specified project ID.
   * Runs once when the project ID changes.
   */
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await axios.get<AnnotationData[]>(
          `${API_BASE_URL}/annotations/all?projectID=${projectID}`,
          { withCredentials: true }
        );
        setAnnotations(response.data); // Updates annotations list
      } catch (err) {
        console.error("Error loading annotations:", err);
        setError("Failed to load annotations.");
      } finally {
        setIsLoading(false); // Ends loading state
      }
    };

    loadAnnotations();
  }, [projectID]);

  /**
   * Converts a timestamp in seconds to a formatted "MM:SS" string.
   * @param timestamp - The timestamp in seconds.
   * @returns Formatted string "MM:SS".
   */
  function timestampString(timestamp: number) {
    let res = "";
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);

    res += minutes <= 9 ? "0" : "";
    res += minutes + ":";
    res += seconds <= 9 ? "0" : "";
    res += seconds;

    return res;
  }

  /**
   * Adds a new annotation to the current project.
   * @param text - Annotation text content.
   * @param timestampNum - Timestamp of the annotation in seconds.
   */
  const addAnnotation = async (text: string, timestampNum: number) => {
    const timestampStr: string = timestampString(timestampNum);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/annotations/add`,
        {
          text,
          projectID,
          timestampStr,
          timestampNum,
        },
        { withCredentials: true }
      );

      if (response.data && response.data.id) {
        const annotationWithId = {
          id: response.data.id,
          timestampStr,
          timestampNum,
          text,
          projectID,
        };

        setAnnotations((prev) => [...prev, annotationWithId]);
      } else {
        throw new Error("No ID received from backend");
      }
    } catch (err) {
      console.error("Error adding annotation:", err);
      setError("Failed to add annotation.");
    }
  };

  /**
   * Edits the text of an existing annotation.
   * @param id - ID of the annotation to edit.
   * @param newText - Updated text content.
   */
  const editAnnotation = async (id: number, newText: string) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, text: newText } : annotation
      )
    );

    try {
      await axios.put(
        `${API_BASE_URL}/annotations/edit`,
        {
          id,
          text: newText,
          projectID,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error editing annotation:", err);
      setError("Failed to edit annotation.");
    }
  };

  /**
   * Deletes an annotation from the project.
   * @param id - ID of the annotation to delete.
   */
  const deleteAnnotation = async (id: number) => {
    setAnnotations((prev) => prev.filter((annotation) => annotation.id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/annotations/delete`, {
        data: { id, projectID },
        withCredentials: true,
      });
    } catch (err) {
      console.error("Error deleting annotation:", err);
      setError("Failed to delete annotation.");
    }
  };

  // Returns hook values and functions for external use
  return {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  };
};
