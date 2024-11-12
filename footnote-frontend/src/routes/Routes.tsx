import Login from "../pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserHome from "../pages/UserHome";
import SignUp from "../pages/SignUp";
import AnnotationPage from "../pages/AnnotationPage";
// import CreateNewProject from "../pages/CreateNewProject";
// import HorizontalExample from "../pages/toy";


export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/home", element: <UserHome /> },
  { path: "/project", element: <AnnotationPage /> },
  { path: "/project/:pid", element: <AnnotationPage /> },
  // { path: "/create-new", element: <CreateNewProject /> },
  // { path: "/toy", element: <HorizontalExample /> },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
