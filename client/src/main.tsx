import { createRoot } from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router";
import { route } from "./app/router";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={route} />
);
