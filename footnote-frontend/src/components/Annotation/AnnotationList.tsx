import React from "react";
import { AnnotationData } from "../../types/types";
import AnnotationItem from "./AnnotationItem";
import NewAnnotationItem from "./NewAnnotationItem";

interface AnnotationListProps {
  annotations: AnnotationData[];
  onEditSave: (id: number, newText: string, projectId: number) => void;
  onDeleteClick: (id: number, projectId: number) => void;
  onAddAnnotation: (newText: string, projectId: number) => void;
  projectId: number;
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  annotations,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
  projectId,
}) => {
  return (
    <ul>
      {annotations.map((annotation) => (
        <AnnotationItem
          key={annotation.id}
          annotation={annotation}
          onEditSave={(id, newText) => onEditSave(id, newText, projectId)}
          onDeleteClick={(id) => onDeleteClick(id, projectId)}
        />
      ))}
      <NewAnnotationItem
        onAddAnnotation={(newText) => onAddAnnotation(newText, projectId)}
      />
    </ul>
  );
};

export default AnnotationList;
