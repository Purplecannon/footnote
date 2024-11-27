/**
 * AnnotationItem Component
 *
 * This component represents an individual annotation item. It allows users
 * to view, edit, or delete the annotation content.
 *
 * Props:
 * - `annotation` (AnnotationData): The data for the annotation, including
 *   its ID, text, timestamp, and associated project ID.
 * - `onEditSave` (function): Callback to handle saving an edited annotation.
 *   Receives `id`, `newText`, and `projectId` as arguments.
 * - `onDeleteClick` (function): Callback to handle deleting an annotation.
 *   Receives `id` and `projectId` as arguments.
 *
 * Behavior:
 * - When editing is active:
 *   - The text field is shown, and the user can save with Enter or cancel with Escape.
 * - When not editing:
 *   - Displays the annotation text with edit and delete buttons.
 *
 * Usage:
 * ```tsx
 * <AnnotationItem
 *   annotation={{
 *     id: 1,
 *     timestamp: "01:30",
 *     text: "This is an annotation",
 *     projectID: 123
 *   }}
 *   onEditSave={(id, newText, projectId) => console.log(id, newText, projectId)}
 *   onDeleteClick={(id, projectId) => console.log(id, projectId)}
 * />
 * ```
 */

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
  onAddAnnotation,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(annotation.text);

  const handleEditSave = () => {
    if (editText.trim()) {
      onEditSave(annotation.id, editText, annotation.projectID);
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
    setEditText(annotation.text);
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
              if (e.key === "Enter") handleEditSave();
              if (e.key === "Escape") handleEditCancel();
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
