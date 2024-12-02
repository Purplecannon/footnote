import { ReactNode, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useAuth } from "../../context/AuthContext";
import styles from "./LogoutButton.module.css";
import logoutIcon from "../../assets/logout-button.png";

interface Props {
  children: ReactNode;
}

function LogoutButton({ children }: Props) {
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const handleOnClick = async () => {
    try {
      await axios.get(`${API_BASE_URL}/users/logout`, {
        withCredentials: true,
      });

      window.location.href = "/";

      setTimeout(() => {
        logout();
      }, 100);
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Failed to log out.");
    }
  };

  return (
    <div>
      <button className={styles["logout-button"]} onClick={handleOnClick}>
        {/* {children} */}
        <img src={logoutIcon} alt="Logout" className={styles["logout-icon"]} />
      </button>
      {error && <p className={styles["logout-error"]}>{error}</p>}
    </div>
  );
}

export default LogoutButton;
