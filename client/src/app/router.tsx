import { createBrowserRouter } from "react-router";
import App from "./App";
import Profile from "../pages/profile/Profile";
import Users from "../pages/users/Users";
import Repositories from "../pages/repositories/Repositories";
import AuthCallback from "../pages/AuthCallback";

export const route: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/repository", element: <Repositories /> },
        { path: "/users", element: <Users /> },
        { path: "/auth/callback", element: <AuthCallback /> },
      ],
    },
  ]);
