import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { AccountCircleOutlined, Logout } from "@mui/icons-material";

import { useSidebarLayoutContext } from "../context/SidebarLayoutContext";
import { removeUser, selectLoggedInUser } from "../../../store/authSlice";
import { baseApi } from "../../../store/services/baseApi";
import UserGreeting from "./UserGreeting";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectLoggedInUser);

  const { darkMode, toggleDarkMode, showSidebar } = useSidebarLayoutContext();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(baseApi.util.resetApiState());
    navigate("/");
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={opened ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={opened ? "true" : undefined}
      >
        <Avatar src={loggedInUser?.avatar?.url} sx={{ width: 32, height: 32 }}>
          {loggedInUser?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {showSidebar && <UserGreeting />}
      </IconButton>

      {/* 👇 Only show when sidebar is open */}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={opened}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/app/me">
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>

        {/* <MenuItem>
          <ListItemIcon>
            <DarkModeOutlined />
          </ListItemIcon>
          <Switch checked={darkMode} onChange={toggleDarkMode} size="small" />
        </MenuItem> */}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
