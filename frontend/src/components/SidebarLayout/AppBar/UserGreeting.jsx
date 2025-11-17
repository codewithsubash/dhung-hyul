import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const UserGreeting = () => {
  const { loggedInUser } = useAuth();

  return (
    <div className="flex flex-col items-end">
      <div className="text-sm">
        <span className="font-medium">{loggedInUser?.name}</span>
      </div>
    </div>
  );
};

export default UserGreeting;
