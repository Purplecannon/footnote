import React from "react";
import { useAnnotations } from "../../hooks/useAnnotations";
import AnnotationList from "./AnnotationList";

const Annotation: React.FC = () => {
  const { annotations, setAnnotations, isLoading, error } = useAnnotations();

  const handleEditSave = (id: number, newText: string) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, text: newText } : annotation
      )
    );
  };

  const handleDeleteClick = (id: number) => {
    setAnnotations((prev) => prev.filter((annotation) => annotation.id !== id));
  };

  const handleAddAnnotation = (newText: string) => {
    const newAnnotation = { id: Date.now(), timestamp: "00:00", text: newText };
    setAnnotations((prev) => [...prev, newAnnotation]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <AnnotationList
        annotations={annotations}
        onEditSave={handleEditSave}
        onDeleteClick={handleDeleteClick}
        onAddAnnotation={handleAddAnnotation}
      />
    </>
  );
};

export default Annotation;
