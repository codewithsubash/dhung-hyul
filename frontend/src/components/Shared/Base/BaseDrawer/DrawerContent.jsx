import React from "react";
import { Box } from "@mui/material";
import { BASE_CONSTANTS } from "../../../../constants/baseConstant";

export const DrawerContent = ({ children, disablePadding = false }) => {
  return (
    <Box
      padding={!disablePadding && BASE_CONSTANTS.PADDING_MD}
      sx={{ flex: 1, flexGrow: 1, overflowY: "scroll" }}
    >
      {children}
    </Box>
  );
};
