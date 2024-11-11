import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
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
  ],
};
