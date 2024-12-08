/**
 * LogoutButton.tsx
 * This component renders a logout button that triggers a logout request.
 * On success, it redirects the user to the home page and logs the user out.
 * If the request fails, it displays an error message.
 */

import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // Base API URL for backend requests
import { useAuth } from "../../context/AuthContext"; // Authentication context hook
import styles from "./LogoutButton.module.css"; // CSS module for styling
import logoutIcon from "../../assets/logout-button.png"; // Logout button icon

function LogoutButton() {
  // State for managing error messages during logout
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth(); // Logout function from the authentication context

  // Handles the logout button click
  const handleOnClick = async () => {
    try {
      // Sends a logout request to the backend with credentials
      await axios.get(`${API_BASE_URL}/users/logout`, {
        withCredentials: true,
      });

      // Redirects the user to the home page
      window.location.href = "/";

      // Logs the user out after a short delay
      setTimeout(() => {
        logout();
      }, 100);
    } catch (err) {
      // Logs the error and sets an error message for display
      console.error("Error logging out:", err);
      setError("Failed to log out.");
    }
  };

  return (
    <div>
      {/* Logout button with icon */}
      <button className={styles["logout-button"]} onClick={handleOnClick}>
        <img src={logoutIcon} alt="Logout" className={styles["logout-icon"]} />
      </button>

      {/* Error message displayed when logout fails */}
      {error && <p className={styles["logout-error"]}>{error}</p>}
    </div>
  );
}

export default LogoutButton;
