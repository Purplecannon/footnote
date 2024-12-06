/**
 * AnnotationBaseItem Component
 *
 * A reusable base component for displaying an annotation item with a timestamp
 * and additional content. Includes a clickable timestamp button to trigger
 * an optional action.
 *
 * Props:
 * - `timestamp` (string): The timestamp displayed on the button.
 * - `children` (ReactNode): Additional content displayed in the annotation item.
 * - `onTimestampClick` (function, optional): Callback executed when the timestamp
 *   button is clicked.
 *
 * Usage:
 * ```tsx
 * <AnnotationBaseItem
 *   timestamp="00:45"
 *   onTimestampClick={() => console.log("Timestamp clicked")}
 * >
 *   <span>Additional content</span>
 * </AnnotationBaseItem>
 * ```
 */

import React, { ReactNode } from "react";
import { ListGroup, Button } from "react-bootstrap";


interface AnnotationBaseItemProps {
  timestamp: string; // Timestamp to display
  timestampNum: number;
  children: ReactNode; // Additional content
  onTimestampClick: (timestampNum: number) => void; // Callback for the timestamp button
}

const AnnotationBaseItem: React.FC<AnnotationBaseItemProps> = ({
  timestamp,
  timestampNum,
  children,
  onTimestampClick,
}) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-center"
    >
      <Button variant="link" onClick={() => onTimestampClick(timestampNum)} className="p-0">
        <strong>{timestamp}</strong>
      </Button>
      {children}
    </ListGroup.Item>
  );
};

export default AnnotationBaseItem;
