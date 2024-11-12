import { useState, useEffect } from "react";
import axios from "axios";
import { AnnotationData } from "../types/types";
import { API_BASE_URL } from "../config";
import { mockAnnotations } from "../data/mockAnnotations";

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await axios.get<AnnotationData[]>(
          `${API_BASE_URL}/annotations/all`
        );
        setAnnotations(
          response.data.length > 0 ? response.data : mockAnnotations
        );
      } catch (err) {
        setError("Failed to load annotations.");
        setAnnotations(mockAnnotations); // Fallback to mock data on error
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnotations();
  }, []);

  return { annotations, setAnnotations, isLoading, error }; // Include setAnnotations in the return value
};
