import Login from "../pages/Login/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "../pages/UserHome/UserHome";
import SignUp from "../pages/SignUp/SignUp";
import ProjectPage from "../pages/ProjectPage/ProjectPage";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/home", element: <UserHome /> },
  { path: "/project", element: <ProjectPage /> },
  { path: "/project/:pid", element: <ProjectPage /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
