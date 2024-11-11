import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";
import React from "react";

const App = () => {
  return (
    <React.Fragment>
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
};

export default App;
