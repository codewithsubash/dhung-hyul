import * as React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, styled } from "@mui/material/styles";
import {
  CssBaseline,
  Drawer,
  Divider,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import NetworkStatus from "../NetworkStatus";
import MainContent from "./MainContent";
import AppBar from "./AppBar/AppBar";
import SidebarLayoutContextProvider, {
  useSidebarLayoutContext,
} from "./context/SidebarLayoutContext";
import UserMenu from "./AppBar/UserMenu";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  color: theme.palette.text,
  justifyContent: "flex-end",
}));

const SLayout = ({
  sidebar: Sidebar = null,
  appBarContent: AppBarContent = null,
}) => {
  const {
    showSidebar,
    setShowSidebar,
    drawerWidth,
    drawerWidthCollapsed,
    theme,
  } = useSidebarLayoutContext();

  const currentWidth = showSidebar ? drawerWidth : drawerWidthCollapsed;

  return (
    <ThemeProvider theme={theme}>
      {/* <NotificationProvider> */}
      <Paper sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />

        <AppBar appBarContent={AppBarContent} />

        <Drawer
          sx={{
            width: currentWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: currentWidth,
              transition: "width 0.3s",
              overflowX: "hidden",
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={true}
        >
          <DrawerHeader>
            {showSidebar && (
              <div className="mx-auto">
                {/* <AppLogo /> */}
                Subash
              </div>
            )}

            <IconButton onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          {Sidebar && <Sidebar />}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              p: 1,
              borderTop: "1px solid rgba(0,0,0,0.12)",
              backgroundColor: "inherit",
            }}
          >
            <UserMenu />
          </Box>
        </Drawer>
        <MainContent
          sidebarWidth={currentWidth}
          style={{
            flexGrow: 1,
            marginTop: "-0.7rem",
            width: `calc(100% - ${currentWidth}px)`,
          }}
        >
          <>
            <DrawerHeader />

            <Outlet />

            <NetworkStatus />
          </>
        </MainContent>
      </Paper>
      {/* </NotificationProvider> */}
    </ThemeProvider>
  );
};

function SidebarLayout(props) {
  return (
    <SidebarLayoutContextProvider>
      <SLayout {...props} />
    </SidebarLayoutContextProvider>
  );
}

export default SidebarLayout;
