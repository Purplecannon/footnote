import React, { ReactNode } from "react";
import { ListGroup, Button } from "react-bootstrap";

interface AnnotationBaseItemProps {
  timestamp: string;
  children: ReactNode;
  onTimestampClick?: () => void;
}

const AnnotationBaseItem: React.FC<AnnotationBaseItemProps> = ({
  timestamp,
  children,
  onTimestampClick,
}) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center"
    >
      <Button variant="link" onClick={onTimestampClick} className="p-0">
        <strong>{timestamp}</strong>
      </Button>
      {children}
    </ListGroup.Item>
  );
};

export default AnnotationBaseItem;
