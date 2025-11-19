import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const GuestOnly = ({ children }) => {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default GuestOnly;
