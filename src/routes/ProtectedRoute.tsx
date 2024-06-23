import { Navigate, useLocation } from "react-router-dom";
import { isAuth } from "../layout/account/Appbar";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  if (isAuth) {
    return <>{children}</>;
  }
  return <Navigate to="/account" replace  state={{ referrer: pathname }} />;
}