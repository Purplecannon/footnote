/**
 * ProtectedRoute Component
 *
 * This component is used to wrap content that should only be accessible
 * to authenticated users. If a user is not logged in, they will be redirected
 * to an "Access Denied" page with a link to the login page.
 *
 * Usage:
 * Wrap this component around any part of your application that should only
 * be accessible after login.
 *
 * Props:
 * - `children`: The content to display when the user is authenticated.
 *   This should be a valid JSX element.
 *
 * Context:
 * - This component uses `useAuth` from the `AuthContext` to determine
 *   whether the user is logged in (`isLoggedIn`).
 *
 * Behavior:
 * - If the user is not authenticated (`isLoggedIn` is false):
 *   - A message "Access Denied" is displayed.
 *   - A link is provided to navigate to the login page ("/").
 * - If the user is authenticated:
 *   - The child content (`children`) is rendered.
 */

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Define the props for the ProtectedRoute component
interface ProtectedRouteProps {
  children: JSX.Element; // The content to render when authenticated
}

// Define the ProtectedRoute component
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Retrieve authentication state from AuthContext

  if (!isLoggedIn) {
    // Render Access Denied message with a login link if user is not authenticated
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied</h2>
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          Please log in
        </Link>
      </div>
    );
  }

  // Render the protected content if the user is authenticated
  return children;
};
