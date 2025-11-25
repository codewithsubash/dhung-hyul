import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";

const UserGreeting = () => {
  const { loggedInUser } = useAuth();

  return (
    <div className="flex flex-col items-end ml-2">
      <div className="text-sm">
        <span className="font-medium">
          {loggedInUser?.name} <KeyboardArrowDownOutlined />
        </span>
      </div>
    </div>
  );
};

export default UserGreeting;
