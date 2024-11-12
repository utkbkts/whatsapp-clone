import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./MainRoutes";

export const router = createBrowserRouter([MainRoutes], {
  future: {
    v7_fetcherPersist: true,
  },
});
