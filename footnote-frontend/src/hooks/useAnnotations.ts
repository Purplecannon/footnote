import { useState, useEffect } from "react";
import axios from "axios";
import { AnnotationData } from "../types/types";
import { API_BASE_URL } from "../config";

export const useAnnotations = (projectID: number) => {
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch annotations specific to the project
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await axios.get<AnnotationData[]>(
          `${API_BASE_URL}/annotations/all?projectID=${projectID}`,
          { withCredentials: true }
        );

        setAnnotations(response.data);
      } catch (err) {
        console.error("Error loading annotations:", err);
        setError("Failed to load annotations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnotations();
  }, [projectID]);


  function timestampString(timestamp:number) {
    let res = "";
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);

    if (minutes <= 9) {
      // single digit
      res += "0";
    }
    res += minutes;
    res += ":";

    if (seconds <= 9) {
      // single digit
      res += "0";
    }
    res += seconds;

    return res;
  }

  // Add annotation
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

        console.log("checking timestamp", timestampStr);
        setAnnotations((prev) => [...prev, annotationWithId]);
      } else {
        throw new Error("No ID received from backend");
      }
    } catch (err) {
      console.error("Error adding annotation:", err);
      setError("Failed to add annotation.");
    }
  };

  // Edit annotation
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

  // Delete annotation
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

  return {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  };
};
