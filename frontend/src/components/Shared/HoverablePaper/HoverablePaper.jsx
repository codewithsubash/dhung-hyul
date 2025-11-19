import React from "react";
import { Paper } from "@mui/material";
import { twMerge } from "tailwind-merge";

import ActionTransition from "./ActionTransition";

export const HoverablePaper = ({
  children,
  className,
  isSelected = false,
  ...paperProps
}) => {
  return (
    <Paper
      elevation={0}
      className={twMerge(
        "group relative overflow-hidden bg-blue-300",
        isSelected
          ? "border-blue-300 bg-blue-300 dark:border-slate-500 dark:bg-slate-800"
          : "hover:border-blue-300 hover:bg-blue-50 dark:hover:border-slate-500 dark:hover:bg-slate-800",
        className
      )}
      {...paperProps}
    >
      {children}
    </Paper>
  );
};

export default HoverablePaper;

HoverablePaper.Actions = ActionTransition;
