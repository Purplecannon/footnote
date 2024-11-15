import React, { useState } from "react";

import { Button, FormControl, InputGroup } from "react-bootstrap";

import AnnotationBaseItem from "./AnnotationBaseItem";

import { AnnotationData } from "../../types/types";

import TrashIcon from "../../assets/trash3-fill.svg";

import EditIcon from "../../assets/pencil-square.svg";

interface AnnotationItemProps {
  annotation: AnnotationData;

  onEditSave: (id: number, newText: string, projectId: number) => void;

  onDeleteClick: (id: number, projectId: number) => void;
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({
  annotation,

  onEditSave,

  onDeleteClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(annotation.text);

  const handleEditSave = () => {
    if (editText.trim()) {
      onEditSave(annotation.id, editText, annotation.projectID);

      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditText(annotation.text);

    setIsEditing(false);
  };

  return (
    <AnnotationBaseItem
      timestamp={annotation.timestamp}
      onTimestampClick={() => {}}
    >
      {isEditing ? (
        <InputGroup>
          <FormControl
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSave();

              if (e.key === "Escape") handleEditCancel();
            }}
            placeholder="Edit annotation"
            autoFocus
          />
        </InputGroup>
      ) : (
        <span>{annotation.text}</span>
      )}

      {!isEditing && (
        <div>
          <Button
            variant="link"
            onClick={() => setIsEditing(true)}
            className="p-0 mx-2"
          >
            <img src={EditIcon} alt="Edit" width={16} height={16} />
          </Button>

          <Button
            variant="link"
            onClick={() => onDeleteClick(annotation.id, annotation.projectID)}
            className="p-0"
          >
            <img src={TrashIcon} alt="Delete" width={16} height={16} />
          </Button>
        </div>
      )}
    </AnnotationBaseItem>
  );
};

export default AnnotationItem;
