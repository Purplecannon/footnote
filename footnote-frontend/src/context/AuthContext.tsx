/**
 * AuthContext.tsx
 * Provides authentication state and methods using React Context.
 * Enables components to access login status and authentication functions.
 */

import { createContext, useContext, useState, ReactNode } from "react";

// Type definition for authentication context
interface AuthContextType {
  isLoggedIn: boolean; // Tracks if the user is logged in
  login: () => void; // Function to log in the user
  logout: () => void; // Function to log out the user
}

// Creates the AuthContext with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Wraps children components to provide authentication context.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manages login state

  // Updates login state when the user logs in
  const login = () => setIsLoggedIn(true);

  // Updates login state when the user logs out
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Hook
 * Provides access to authentication state and methods.
 * Throws an error if used outside an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
