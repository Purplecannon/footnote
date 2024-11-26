/**
 * AnnotationItem Component
 *
 * This component represents an individual annotation item, including its
 * timestamp, text, and actions (edit, delete, add new). Combines the functionality
 * of `AnnotationBaseItem` for a streamlined implementation.
 *
 * Props:
 * - `timestamp` (string): The timestamp displayed on the annotation item.
 * - `text` (string): The annotation text (editable if in edit mode).
 * - `isNew` (boolean, optional): If true, renders as a new annotation input.
 * - `onTimestampClick` (function, optional): Callback for when the timestamp is clicked.
 * - `onEditSave` (function, optional): Callback for saving an edited annotation.
 * - `onDeleteClick` (function, optional): Callback for deleting the annotation.
 * - `onAddAnnotation` (function, optional): Callback for adding a new annotation.
 */

import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import CheckIcon from "../../assets/check-square-fill.svg";
import EditIcon from "../../assets/pencil-square.svg";
import TrashIcon from "../../assets/trash3-fill.svg";

interface AnnotationItemProps {
  timestamp: string;
  text?: string;
  isNew?: boolean;
  onTimestampClick?: () => void;
  onEditSave?: (id: number, newText: string) => void;
  onDeleteClick?: (id: number) => void;
  onAddAnnotation?: (newText: string) => void;
  id?: number; // Required for editing or deleting
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({
  timestamp,
  text = "",
  isNew = false,
  onTimestampClick,
  onEditSave,
  onDeleteClick,
  onAddAnnotation,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [annotationText, setAnnotationText] = useState(text);

  const handleEditSave = () => {
    if (annotationText.trim() && onEditSave && id !== undefined) {
      onEditSave(id, annotationText);
      setIsEditing(false);
    }
  };

  const handleAddAnnotation = () => {
    if (annotationText.trim() && onAddAnnotation) {
      onAddAnnotation(annotationText);
      setAnnotationText("");
    }
  };

  const handleEditCancel = () => {
    setAnnotationText(text);
    setIsEditing(false);
  };

  return (
    <li className="d-flex justify-content-between align-items-center">
      <Button variant="link" onClick={onTimestampClick} className="p-0">
        <strong>{timestamp}</strong>
      </Button>
      {isEditing ? (
        <InputGroup>
          <FormControl
            value={annotationText}
            onChange={(e) => setAnnotationText(e.target.value)}
            placeholder={isNew ? "new annotation" : "Edit annotation"}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                isNew ? handleAddAnnotation() : handleEditSave();
              if (e.key === "Escape" && !isNew) handleEditCancel();
            }}
            onBlur={() => !isNew && handleEditSave()}
            autoFocus
          />
        </InputGroup>
      ) : (
        <span>{text}</span>
      )}
      {!isEditing && !isNew && (
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
            onClick={() =>
              onDeleteClick && id !== undefined && onDeleteClick(id)
            }
            className="p-0"
          >
            <img src={TrashIcon} alt="Delete" width={16} height={16} />
          </Button>
        </div>
      )}
      {isNew && (
        <Button variant="link" onClick={handleAddAnnotation} className="p-0">
          <img src={CheckIcon} alt="Save" width={16} height={16} />
        </Button>
      )}
    </li>
  );
};

export default AnnotationItem;
