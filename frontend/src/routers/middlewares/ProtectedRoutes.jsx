import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { loggedInUser } = useAuth();

  return loggedInUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoutes;
