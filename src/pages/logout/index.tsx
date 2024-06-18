import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// import Signin from "../signin";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }, []);

  return (
    <>
      <Navigate to="/signin" replace />
    </>
  );
};

export default Logout;
