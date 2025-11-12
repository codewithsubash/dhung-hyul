import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../store/authSlice";

export const useAuth = () => {
  const loggedInUser = useSelector(selectLoggedInUser);

  return React.useMemo(() => {
    if (!loggedInUser) return {};

    const isMember = loggedInUser?.role === "Member";
    const isAdmin = loggedInUser?.role === "System";
    const isSuperAdmin = loggedInUser?.role === "SuperAdmin";

    return {
      isMember,
      isAdmin,
      isSuperAdmin,
      loggedInUser,
    };
  }, [loggedInUser]);
};
