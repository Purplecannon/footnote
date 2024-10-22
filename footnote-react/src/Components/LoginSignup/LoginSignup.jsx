import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";

/**
 * LoginSignup Component
 *
 * This component provides a form for logging in or signing up. It displays inputs for
 * username and password, and conditionally renders a "confirm password" input field for
 * sign-up mode. The component also toggles between "Login" and "Sign Up" modes.
 *
 * @returns {JSX.Element} The rendered Login/Signup form.
 */
export const LoginSignup = () => {
  // State: Tracks the current mode (either "Login" or "Sign Up")
  const [action, setAction] = useState("Login");

  /**
   * Handles toggling between "Login" and "Sign Up" modes.
   * Changes the action state to either "Login" or "Sign Up".
   *
   * @param {string} newAction - The action to set (either "Login" or "Sign Up").
   */
  const toggleAction = (newAction) => {
    setAction(newAction);
  };

  return (
    <div className="container">
      {/* Header section with current action text and underline */}
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline" />
      </div>

      {/* Input fields for username and password */}
      <div className="inputs">
        {/* Username input */}
        <div className="input">
          <img src={user_icon} alt="User Icon" />
          <input type="text" placeholder="username" />
        </div>

        {/* Password input */}
        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input type="password" placeholder="password" />
        </div>

        {/* Conditional "confirm password" input for Sign Up mode */}
        {action === "Login" ? null : (
          <div className="input">
            <img src={password_icon} alt="Confirm Password Icon" />
            <input type="password" placeholder="confirm password" />
          </div>
        )}
      </div>

      {/* Conditional "Forgot your password?" link, only in Login mode */}
      {action === "Sign Up" ? null : (
        <div className="forgot-password">
          Forgot your password? <span>Click Here!</span>
        </div>
      )}

      {/* Buttons to toggle between "Login" and "Sign Up" */}
      <div className="submit-container">
        {/* Button to switch to Sign Up mode */}
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => toggleAction("Sign Up")}
          role="button"
          tabIndex={0}
        >
          Sign up
        </div>

        {/* Button to switch to Login mode */}
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => toggleAction("Login")}
          role="button"
          tabIndex={0}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
