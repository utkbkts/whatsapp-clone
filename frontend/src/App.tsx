import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";
import React from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <React.Fragment>
      <Toaster />
      <div className="dark">
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
};

export default App;
