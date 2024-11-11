import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
import Register from "@/pages/auth/Register";
import HomePage from "@/pages/home/HomePage";
import { Suspense } from "react";

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      ),
    },
  ],
};
