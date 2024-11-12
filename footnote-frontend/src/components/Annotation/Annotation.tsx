import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations";
import AnnotationList from "./AnnotationList";

interface AnnotationProps {
  projectId: number; // Assuming projectId is passed as a prop
}

const Annotation: React.FC<AnnotationProps> = ({ projectId }) => {
  const {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  } = useAnnotations(projectId); // Pass projectId to useAnnotations

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <AnnotationList
        annotations={annotations}
        onEditSave={editAnnotation}
        onDeleteClick={deleteAnnotation}
        onAddAnnotation={addAnnotation}
        projectId={0}
      />
    </>
  );
};

export default Annotation;
