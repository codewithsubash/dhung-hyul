import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  IconButton,
  AppBar as MuiAppBar,
  Paper,
  Switch,
  Toolbar,
  Tooltip,
} from "@mui/material";

import {
  LightModeOutlined,
  Menu,
  NightsStayOutlined,
} from "@mui/icons-material";
import { useSidebarLayoutContext } from "../context/SidebarLayoutContext";

const NavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerwidth",
})(({ theme, drawerwidth }) => {
  const transitionConfig = theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });

  return {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: "none !important",
    borderBottom: theme.palette.divider,

    width: `calc(100% - ${drawerwidth}px)`,
    marginLeft: `${drawerwidth}px`,
    transition: transitionConfig,
  };
});

const AppBar = ({ appBarContent: AppBarContent }) => {
  const {
    darkMode,
    toggleDarkMode,
    showSidebar,
    setShowSidebar,
    drawerWidth,
    drawerWidthCollapsed,
  } = useSidebarLayoutContext();

  const currentWidth = showSidebar ? drawerWidth : drawerWidthCollapsed;

  return (
    <Paper elevation={0}>
      <NavBar position="fixed" drawerwidth={currentWidth}>
        <Toolbar>
          {/* <IconButton
            aria-label="open drawer"
            onClick={() => setShowSidebar(true)}
            edge="start"
            sx={{ mr: 2, ...(showSidebar && { display: "none" }) }}
          >
            <Menu />
          </IconButton> */}

          {/* <div>{!showSidebar && <AppLogo />}</div> */}
          <div>{!showSidebar && "Dhung Hyul"}</div>

          <Box
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="end"
          >
            {/* <div className="flex-grow">
              {validEntity && AppBarContent && <AppBarContent />}
            </div> */}

            {/* <Notifications /> */}

            <div className="flex shrink-0 items-center gap-4">
              <LightModeOutlined />

              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                size="small"
              />
              <NightsStayOutlined />
            </div>
          </Box>
        </Toolbar>

        <Divider />
      </NavBar>
    </Paper>
  );
};

export default AppBar;
