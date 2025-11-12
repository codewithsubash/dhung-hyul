import * as React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, styled } from "@mui/material/styles";
import { CssBaseline, Drawer, Divider, IconButton, Paper } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import NetworkStatus from "../NetworkStatus";
import MainContent from "./MainContent";
import AppBar from "./AppBar/AppBar";
import SidebarLayoutContextProvider, {
  useSidebarLayoutContext,
} from "./context/SidebarLayoutContext";

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
  const { showSidebar, setShowSidebar, drawerWidth, theme } =
    useSidebarLayoutContext();

  return (
    <ThemeProvider theme={theme}>
      {/* <NotificationProvider> */}
      <Paper sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />

        <AppBar appBarContent={AppBarContent} />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={showSidebar}
        >
          <DrawerHeader>
            <div className="mx-auto">
              {/* <AppLogo /> */}
              Subash
            </div>

            <IconButton onClick={() => setShowSidebar(false)}>
              {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          {Sidebar && <Sidebar />}
        </Drawer>

        <MainContent
          open={showSidebar}
          drawerwidth={drawerWidth}
          style={{
            flexGrow: 1,
            marginTop: "-0.7rem",
            maxWidth: !showSidebar ? "100%" : `calc(100% - ${drawerWidth}px)`,
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
