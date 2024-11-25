import React from "react";
import "./PasswordInput.css";
import password_icon from "../../assets/password.png";

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
      <img src={password_icon} alt="Password Icon" />
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
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;
