import React from "react";
import { Box, Typography } from "@mui/material";

import { twMerge } from "tailwind-merge";
import { getMuiIcon } from "../../utils/getMuiIcon";

const InformationTile = ({
  title,
  subtitle,
  color = "primary",
  iconName,
  icon: Icon = null,
  small = false,
  children,
  blur = false,
}) => {
  return (
    <Box display="flex" alignItems={!small ? "start" : "end"} gap={1.5}>
      {(Icon || iconName) && (
        <Box marginTop={!small ? 0.35 : 0}>
          {!!Icon ? <Icon /> : getMuiIcon(iconName, { color })}
        </Box>
      )}

      <Box flexGrow={1}>
        {!small && <Typography variant="caption">{title}</Typography>}

        <div
          className={twMerge("max-w-[90%] break-words", blur ? "blur-sm" : "")}
        >
          {children ? <>{children}</> : !!subtitle ? subtitle : "N/A"}
        </div>
      </Box>
    </Box>
  );
};

export default InformationTile;
