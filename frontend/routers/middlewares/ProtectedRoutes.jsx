import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const loggedInUser = false; // Replace with real auth

  return loggedInUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoutes;
