import Login from "../pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "../pages/UserHome";
import CreateNewProject from "../pages/CreateNewProject";
import SignUp from "../pages/SignUp";
import HorizontalExample from "../pages/toy";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/user-home", element: <UserHome /> },
  { path: "/create-new", element: <CreateNewProject /> },
  { path: "/toy", element: <HorizontalExample /> }
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
