import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const BaseCheckbox = ({ label, ...checkboxProps }) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          size="small"
          checked={!!checkboxProps.value}
          {...checkboxProps}
        />
      }
    />
  );
};

export default BaseCheckbox;
