import { useState, useEffect } from "react";
import axios from "axios";
import { AnnotationData } from "../types/types";
import { API_BASE_URL } from "../config";
import { mockAnnotations } from "../data/mockAnnotations";

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState<boolean>(true);

  // Fetch annotations
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await axios.get<AnnotationData[]>(
          `${API_BASE_URL}/annotations/all`
        );
        if (response.data.length > 0) {
          setAnnotations(response.data);
          setIsUsingMockData(false); // We're using real data
        } else {
          setAnnotations(mockAnnotations);
        }
      } catch (err) {
        console.error("Error adding annotation:", err);
        setError("Failed to load annotations.");
        setAnnotations(mockAnnotations); // Fallback to mock data on error
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnotations();
  }, []);

  // Add annotation
  const addAnnotation = async (text: string) => {
    if (isUsingMockData) {
      // If using mock data, generate a temporary ID and add it locally without async calls
      const newAnnotation = { id: Date.now(), timestamp: "00:00", text };
      setAnnotations((prev) => [...prev, newAnnotation]);
    } else {
      try {
        // Only proceed with an API call if we’re using real data
        const response = await axios.post(`${API_BASE_URL}/annotations`, {
          text,
        });
        if (response.data && response.data.id) {
          const annotationWithId = {
            id: response.data.id,
            timestamp: "00:00",
            text,
          };
          setAnnotations((prev) => [...prev, annotationWithId]);
        } else {
          throw new Error("No ID received from backend");
        }
      } catch (err) {
        console.error("Error adding annotation:", err);
        setError("Failed to add annotation.");
      }
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
      await axios.put(`${API_BASE_URL}/annotations`, { id, text: newText });
    } catch (err) {
      console.error("Error adding annotation:", err);
      setError("Failed to edit annotation.");
    }
  };

  // Delete annotation
  const deleteAnnotation = async (id: number) => {
    setAnnotations((prev) => prev.filter((annotation) => annotation.id !== id));

    try {
      await axios.delete(`${API_BASE_URL}/annotations`, { data: { id } });
    } catch (err) {
      console.error("Error adding annotation:", err);
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
