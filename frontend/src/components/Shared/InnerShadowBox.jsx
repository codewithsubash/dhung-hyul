import React from "react";
import { Box } from "@mui/material";
import { twMerge } from "tailwind-merge";

export const InnerShadowBox = ({ children, className, ...boxProps }) => {
  return (
    <Box
      className={twMerge(
        "flex-grow bg-blue-50 shadow-inner dark:bg-slate-900",
        className
      )}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default InnerShadowBox;
