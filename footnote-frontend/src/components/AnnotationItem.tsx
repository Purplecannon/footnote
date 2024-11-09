import React, { useState } from "react";
import { ListGroup, Button, FormControl, InputGroup } from "react-bootstrap";
import { AnnotationData } from "../types/types";
import TrashIcon from "../assets/trash3-fill.svg";
import EditIcon from "../assets/pencil-square.svg";

interface AnnotationItemProps {
  annotation: AnnotationData;
  onEditSave: (id: number, newText: string) => void;
  onDeleteClick: (id: number) => void;
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({
  annotation,
  onEditSave,
  onDeleteClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(annotation.text);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editText.trim()) {
      onEditSave(annotation.id, editText);
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(annotation.text);
    setIsEditing(false);
  };

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center"
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
        <div>
          <Button variant="link" onClick={() => {}} className="p-0">
            <strong>{annotation.timestamp}</strong>
          </Button>
          : {annotation.text}
        </div>
      )}

      {!isEditing && (
        <div>
          <Button variant="link" onClick={handleEditStart} className="p-0 mx-2">
            <img src={EditIcon} alt="Edit" width={16} height={16} />
          </Button>
          <Button
            variant="link"
            onClick={() => onDeleteClick(annotation.id)}
            className="p-0"
          >
            <img src={TrashIcon} alt="Delete" width={16} height={16} />
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default AnnotationItem;
