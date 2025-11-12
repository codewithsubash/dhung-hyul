import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const CRMOnly = ({ children }) => {
  const { isMember } = useAuth();

  // If user is a member, redirect them to member area
  if (isMember) {
    return <Navigate to="/app/member" replace />;
  }

  return children;
};

export default CRMOnly;
