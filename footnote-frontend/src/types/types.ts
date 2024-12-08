/**
 * types.ts
 * Defines TypeScript interfaces for project and annotation data models.
 * Used throughout the application for type safety and data validation.
 */

/**
 * Interface representing project data.
 */
export interface ProjectData {
  projectID: number; // Unique project identifier
  title: string; // Project title
  videoURL?: string; // Optional URL for the associated video
  thumbnailURL?: string; // Optional thumbnail image URL
}

/**
 * Interface representing annotation data.
 */
export interface AnnotationData {
  projectID: number; // ID of the associated project
  id: number; // Unique annotation identifier
  timestampStr: string; // Formatted timestamp as a string (MM:SS)
  timestampNum: number; // Raw timestamp in seconds
  text: string; // Annotation content text
}
