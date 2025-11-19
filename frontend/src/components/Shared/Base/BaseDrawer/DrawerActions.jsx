import React from "react";
import { Box, Divider } from "@mui/material";
import { BASE_CONSTANTS } from "../../../../constants/baseConstant";

export const DrawerActions = ({ children }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        marginTop: "auto",
        flexShrink: 0,
      }}
    >
      <Divider component="div" />

      <Box
        paddingX={BASE_CONSTANTS.PADDING_MD}
        paddingY={BASE_CONSTANTS.PADDING_SM}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
      >
        {children}
      </Box>
    </Box>
  );
};
