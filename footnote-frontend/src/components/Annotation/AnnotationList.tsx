import React from "react";
import { AnnotationData } from "../../types/types";
import AnnotationItem from "./AnnotationItem";
import NewAnnotationItem from "./NewAnnotationItem";

interface AnnotationListProps {
  annotations: AnnotationData[];
  onEditSave: (id: number, newText: string, projectID: number) => void;
  onDeleteClick: (id: number, projectID: number) => void;
  onAddAnnotation: (newText: string, newTimestamp:number, projectID: number) => void;
  projectID: number;
  timestamp: number;
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  annotations,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
  projectID,
  timestamp,
}) => {
  return (
    <ul>
      {annotations.map((annotation) => (
        <AnnotationItem
          key={annotation.id}
          annotation={annotation}
          onEditSave={(id, newText) => onEditSave(id, newText, projectID)}
          onDeleteClick={(id) => onDeleteClick(id, projectID)}
        />
      ))}
      <NewAnnotationItem
        onAddAnnotation={(newText) => onAddAnnotation(newText, timestamp, projectID)}
      />
    </ul>
  );
};

export default AnnotationList;
