import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

const Notfound = React.lazy(() => import("../pages/Notfound"));

const ArticleId = React.lazy(() => import("../components/Articles/Article.tsx"));
const MatchId = React.lazy(() => import("../components/Matches/Match.tsx"));
const Score = React.lazy(() => import("../components/Matches/score.tsx"));
const Preferences = React.lazy(() => import("../components/Preferences/index.tsx"));
const ViewLayout = React.lazy(() => import("../pages/landing/index.tsx"));
const ChangePassword = React.lazy(() => import("../components/Profile/index.tsx"));
const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const AccountLayout = React.lazy(() => import("../layout/account"));

const Logout = React.lazy(() => import("../pages/logout"));

let authenticated = !!localStorage.getItem("authToken");
const checkAuth = () => {
  authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <Navigate to="/account" replace />;    
    
  }else{
    return <Navigate to="/view" replace />;
  }
}


const router = createBrowserRouter([
  { 
    path: "/", 
    element: checkAuth(),
  },
  {
    path: "/view",
    element: (
        <ViewLayout />
    ),
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      {
        path: "articles/:articleId",
        element: <ArticleId />
      }, 
      {
        path: "matches/:matchId",
        element: <MatchId />
      },
      {
        path: "matches/score/:matchId",
        element: <Score />
      },
    ],
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
        path: "articles/:articleId",
        element: <ArticleId />
      }, 
      {
        path: "matches/:matchId",
        element: <MatchId />
      },
      {
        path: "matches/score/:matchId",
        element: <Score />
      },
      {
        path: "preferences",
        element: <Preferences />
      },
      {
        path: "profile",
        element: <><ChangePassword /></>
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
