import axios from "axios";
import { AnnotationData } from "../types/types";
import { API_BASE_URL } from "../config";

// Edit annotation by ID
export const editAnnotation = async (
  id: number,
  newText: string
): Promise<AnnotationData> => {
  const response = await axios.put(`${API_BASE_URL}/annotations/edit/${id}`, {
    text: newText,
  });
  return response.data;
};

// Delete annotation by ID
export const deleteAnnotation = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/annotations/${id}`);
};
