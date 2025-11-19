import React from "react";

import { DrawerHeader } from "./DrawerHeader";
import { DrawerContent } from "./DrawerContent";
import { DrawerActions } from "./DrawerActions";
import { Box, Drawer } from "@mui/material";

const BaseDrawerContext = React.createContext(null);

export const useBaseDrawerContext = () => {
  const context = React.useContext(BaseDrawerContext);

  if (!context) throw new Error("BaseDrawerContext not provided!");

  return context;
};

export const BaseDrawer = ({
  children,
  width = 500,
  isBusy = false,
  open = false,
  onClose = () => {},
  anchor = "right",
  ...drawerProps
}) => {
  return (
    <BaseDrawerContext.Provider value={{ open, onClose }}>
      <Drawer {...{ ...drawerProps, anchor, open, onClose }}>
        <Box
          sx={{
            width,
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {children}
        </Box>
      </Drawer>
    </BaseDrawerContext.Provider>
  );
};

BaseDrawer.Header = DrawerHeader;

BaseDrawer.Content = DrawerContent;

BaseDrawer.Actions = DrawerActions;
