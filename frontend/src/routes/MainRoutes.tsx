/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "./PublicRoute";

const HomePage = React.lazy(() => import("@/pages/home/HomePage"));
const Login = React.lazy(() => import("@/pages/auth/Login"));
const Register = React.lazy(() => import("@/pages/auth/Register"));
export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        </ProtectedRoute>
      ),
    },
    {
      path: "register",
      element: (
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: "login",
      element: (
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        </PublicRoute>
      ),
    },
  ],
};
