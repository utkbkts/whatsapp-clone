import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/user-store";
import Loading from "./components/Loading";

const App = () => {
  const { user, getUser, checkingAuth } = useUserStore();

  useEffect(() => {
    getUser();
  }, [getUser]);
  console.log("🚀 ~ App ~ user:", user);

  if (checkingAuth) return <Loading />;
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
