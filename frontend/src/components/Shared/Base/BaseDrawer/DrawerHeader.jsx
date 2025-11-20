import React from "react";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { BASE_CONSTANTS } from "../../../../constants/baseConstant";

export const DrawerHeader = ({ children, onClose }) => {
  return (
    <Box flexShrink={0}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={BASE_CONSTANTS.PADDING_MD}
        paddingY={BASE_CONSTANTS.PADDING_SM}
      >
        <Box flexGrow={1}>
          <Typography variant="h6">{children}</Typography>
        </Box>

        {!!onClose && (
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </Box>

      <Divider />
    </Box>
  );
};
