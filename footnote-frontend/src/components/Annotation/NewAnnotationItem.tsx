import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import AnnotationBaseItem from "./AnnotationBaseItem";
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
    <AnnotationBaseItem timestamp="00:00">
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
      <Button variant="link" onClick={handleAddAnnotation} className="p-0">
        <img src={CheckIcon} alt="Save" width={16} height={16} />
      </Button>
    </AnnotationBaseItem>
  );
};

export default NewAnnotationItem;
