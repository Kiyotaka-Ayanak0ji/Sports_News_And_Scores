import React, { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../ErrorBoundary.tsx";
import Preferences from "../pages/dashboard/Settings.tsx";
import NewsDetails from "../pages/news/NewsDetails.tsx";
import NewsContainer from "../pages/news/index.tsx";
import LiveMatch from "../pages/live_matches/index.tsx";

const Display = React.lazy(() =>  import("../pages/dashboard/index.tsx"));
const NotFound = React.lazy(() => import("./NotFound.tsx"));
const ResetPassword = React.lazy(() => import("../pages/reset/Reset.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: (
        <Signin />
    ),
  },
  {
    path: "/signup",
    element: (
        <Signup />
    ),
  },
  {
    path: "/logout",
    element: <Navigate to='/signin' replace/>,
  },
  {
    path: "/reset",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <ResetPassword />
          </Suspense>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    ErrorBoundary: () => <span className="font-bold text-black font-mono">There was some unexpected error</span>
  },
  {
    path: "/",
    element: <Display />,
    children: [
      {
        path: "",
        element: (
          <>
            <LiveMatch />
            <NewsContainer />
          </>
        ),
        children: [
          {
            path: "/articles/:articleID",
            element: <NewsDetails />,
          },
          {
            path: "/preferences",
            element: <Preferences />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />,
  },
  {
    path: "/notfound",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<div className=""><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
          <NotFound/>
        </Suspense>
      </ErrorBoundary>
    )
  }
]);

export default router;
