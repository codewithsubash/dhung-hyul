import React from "react";
import { TextField } from "@mui/material";

const BaseTextField = ({ size = "small", type = "text", ...props }) => {
  return (
    <TextField
      {...{
        ...props,
        size,
        type,
        // to prevent overlapping of label with input
        ...(type === "date" && {
          InputLabelProps: {
            shrink: type === "date",
          },
        }),
      }}
    />
  );
};

export default BaseTextField;
