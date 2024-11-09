export interface ProjectData {
  id: number;
  title: string;
  videoURL?: string;
  thumbnailURL?: string;
}

export interface AnnotationData {
  id: number;
  timestamp: string;
  text: string;
}