import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      {" "}
      {/* Wrap App with BrowserRouter */}
      <App />
=======
import { Routes } from "./routes/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
>>>>>>> Documentation
  </StrictMode>
);
