import Login from "../pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "../pages/UserHome/UserHome";
import SignUp from "../pages/SignUp/SignUp";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <UserHome />
      </ProtectedRoute>
    ),
  },
  {
    path: "/project",
    element: (
      <ProtectedRoute>
        <ProjectPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/project/:pid",
    element: (
      <ProtectedRoute>
        <ProjectPage />
      </ProtectedRoute>
    ),
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
