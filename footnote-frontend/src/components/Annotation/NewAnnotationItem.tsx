import React, { useState } from "react";
import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import CheckIcon from "../../assets/check-square-fill.svg";

interface NewAnnotationItemProps {
  onAddAnnotation: (text: string) => void;
}

const NewAnnotationItem: React.FC<NewAnnotationItemProps> = ({
  onAddAnnotation,
}) => {
  const [newAnnotation, setNewAnnotation] = useState<string>("");

  const handleAddAnnotation = () => {
    if (newAnnotation.trim()) {
      onAddAnnotation(newAnnotation);
      setNewAnnotation("");
    }
  };

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center"
    >
      {/* Timestamp Button Placeholder */}
      <Button variant="link" className="p-0">
        <strong>00:00</strong>
      </Button>

      {/* Input for New Annotation */}
      <InputGroup>
        <FormControl
          value={newAnnotation}
          onChange={(e) => setNewAnnotation(e.target.value)}
          placeholder="new annotation"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddAnnotation();
          }}
        />
      </InputGroup>

      {/* Save Button */}
      <Button variant="link" onClick={handleAddAnnotation} className="p-0">
        <img src={CheckIcon} alt="Save" width={16} height={16} />
      </Button>
    </ListGroup.Item>
  );
};

export default NewAnnotationItem;
