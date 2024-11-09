import axios from "axios";
import { AnnotationData } from "../types/types";

// Edit annotation by ID
export const editAnnotation = async (
  id: number,
  newText: string
): Promise<AnnotationData> => {
  const response = await axios.put(`/annotations/${id}`, { text: newText });
  return response.data;
};

// Delete annotation by ID
export const deleteAnnotation = async (id: number): Promise<void> => {
  await axios.delete(`/annotations/${id}`);
};
