import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Settings from "../components/Preferences/index.tsx";

const Notfound = React.lazy(() => import("../pages/Notfound"));

const ChangePassword = React.lazy(() => import("../components/Profile/index.tsx"));
const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const AccountLayout = React.lazy(() => import("../layout/account"));

const Logout = React.lazy(() => import("../pages/logout"));


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Navigate to='/account' replace/>,
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // Protected Routes
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      {
        path: "preferences",
        element: <Settings />
      },
      {
        path: "profile",
        element: 
          <>
            <ChangePassword />
          </>
      }
    ],
  },
  {
    path: "/notfound",
    element: <Notfound />
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />
  }
]);

export default router;
