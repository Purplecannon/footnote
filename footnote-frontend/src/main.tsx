import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./routes/Routes.tsx";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>
);
