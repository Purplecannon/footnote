import { ReactNode, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import styles from "./LogoutButton.module.css";

interface Props {
  children: ReactNode;
}

function LogoutButton({ children }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleOnClick = async () => {
    try {
      await axios.get(`${API_BASE_URL}/users/logout`, {
        withCredentials: true,
      });
      // Redirect to home page after successful logout
      window.location.href = "/";
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to log out.");
    }
  };

  return (
    <div>
      <button className={styles["logout-button"]} onClick={handleOnClick}>
        {children}
      </button>
      {error && <p className={styles["logout-error"]}>{error}</p>}
    </div>
  );
}

export default LogoutButton;
