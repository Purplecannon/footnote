import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations";
import AnnotationList from "./AnnotationList";

const Annotation: React.FC = () => {
  const {
    annotations,
    isLoading,
    error,
    addAnnotation,
    editAnnotation,
    deleteAnnotation,
  } = useAnnotations();

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
      />
    </>
  );
};

export default Annotation;
