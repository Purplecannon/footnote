import React from "react";
import "./PasswordInput.css";
import eyeOpen from "../../assets/eye-open.png";
import eyeClose from "../../assets/eye-close.png";

interface PasswordInputProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean; // Visibility state
  toggleVisibility: () => void; // Toggle function
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  placeholder = "Enter password",
  onChange,
  showPassword,
  toggleVisibility,
}) => {
  return (
    <div className="password-input-container">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
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
        {/* {showPassword ? "🙈" : "👁️"} */}
      </button>
    </div>
  );
};

export default PasswordInput;
