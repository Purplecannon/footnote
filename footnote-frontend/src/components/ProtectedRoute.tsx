import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Show an Access Denied page with a link to the login page
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          Please log in
        </Link>
      </div>
    );
  }

  // Render the protected content if logged in
  return children;
};
