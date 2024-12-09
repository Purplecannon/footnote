/**
 * PasswordInput.tsx
 * A controlled input component for password entry with visibility toggle.
 * Displays the entered password as text or hides it based on user interaction.
 */

import React from "react";
import "./PasswordInput.css"; // CSS module for styling
import eyeOpen from "../../assets/eye-open.png"; // Icon for showing password
import eyeClose from "../../assets/eye-close.png"; // Icon for hiding password

// Props type definition for the PasswordInput component
interface PasswordInputProps {
  id: string; // Unique identifier for the input field
  value: string; // Current value of the input field
  placeholder?: string; // Placeholder text for the input (optional)
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
  showPassword: boolean; // State for password visibility
  toggleVisibility: () => void; // Function to toggle visibility state
}

// PasswordInput Component
const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  placeholder = "Enter password", // Default placeholder
  onChange,
  showPassword,
  toggleVisibility,
}) => {
  return (
    <div className="password-input-container">
      {/* Password input field */}
      <input
        id={id}
        type={showPassword ? "text" : "password"} // Toggles input type
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {/* Visibility toggle button */}
      <button
        type="button"
        onClick={toggleVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <img
          src={showPassword ? eyeClose : eyeOpen}
          alt={showPassword ? "Hide password" : "Show password"}
          className="visibility-icon"
        />
        {/* Optional Emoji Alternative: {showPassword ? "🙈" : "👁️"} */}
      </button>
    </div>
  );
};

export default PasswordInput;
