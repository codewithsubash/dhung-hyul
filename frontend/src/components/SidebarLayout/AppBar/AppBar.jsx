import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  IconButton,
  AppBar as MuiAppBar,
  Paper,
  Toolbar,
  Tooltip,
} from "@mui/material";

import { Menu } from "@mui/icons-material";
import { useSidebarLayoutContext } from "../context/SidebarLayoutContext";

const NavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "none !important",
  borderBottom: theme.palette.divider,
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    marginLeft: `${drawerwidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ appBarContent: AppBarContent }) => {
  const { showSidebar, setShowSidebar, drawerWidth } =
    useSidebarLayoutContext();

  return (
    <Paper elevation={0}>
      <NavBar position="fixed" open={showSidebar} drawerwidth={drawerWidth}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setShowSidebar(true)}
            edge="start"
            sx={{ mr: 2, ...(showSidebar && { display: "none" }) }}
          >
            <Menu />
          </IconButton>

          {/* <div>{!showSidebar && <AppLogo />}</div> */}
          <div>{!showSidebar && "Subash"}</div>

          <Box
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* <div className="flex-grow">
              {validEntity && AppBarContent && <AppBarContent />}
            </div> */}

            {/* <Notifications /> */}

            <div className="flex shrink-0 items-center gap-4">
              {/* {isAdmin && !isSuperAdmin && <EntitySwitch />} */}
              {/* <UserMenu /> */}
            </div>
          </Box>
        </Toolbar>

        <Divider />
      </NavBar>
    </Paper>
  );
};

export default AppBar;
