import React from "react";
import { ListGroup } from "react-bootstrap";
import { AnnotationData } from "../types/types";
import AnnotationItem from "./AnnotationItem";
import NewAnnotationItem from "./NewAnnotationItem";

interface AnnotationListProps {
  annotations: AnnotationData[];
  onEditSave: (id: number, newText: string) => void;
  onDeleteClick: (id: number) => void;
  onAddAnnotation: (newText: string) => void;
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  annotations,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
}) => {
  return (
    <ListGroup as="ul">
      {annotations.map((annotation) => (
        <AnnotationItem
          key={annotation.id}
          annotation={annotation}
          onEditSave={onEditSave}
          onDeleteClick={onDeleteClick}
        />
      ))}

      {/* New Annotation Item */}
      <NewAnnotationItem onAddAnnotation={onAddAnnotation} />
    </ListGroup>
  );
};

export default AnnotationList;
