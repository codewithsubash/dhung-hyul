import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const BaseSelect = ({
  label = "Select",
  fullWidth = false,
  required = false,
  error = false,
  helperText = "",
  options = [],
  getOptionLabel = (opt) => opt,
  getOptionValue = (opt) => opt,
  ...selectProps
}) => {
  return (
    <FormControl {...{ fullWidth, required, error }} size="small">
      <InputLabel id={`select-${label?.toLocaleLowerCase()}`}>
        {label}
      </InputLabel>

      <Select
        labelId={`select-${label?.toLocaleLowerCase()}`}
        size="small"
        {...{ ...selectProps, label }}
      >
        {options?.length ? (
          options?.map((opt, index) => (
            <MenuItem
              key={getOptionValue(opt) + index}
              value={getOptionValue(opt)}
            >
              {getOptionLabel(opt)}
            </MenuItem>
          ))
        ) : (
          <MenuItem>No Options</MenuItem>
        )}
      </Select>

      {!!helperText && (
        <FormHelperText error={error}> {helperText} </FormHelperText>
      )}
    </FormControl>
  );
};

export default BaseSelect;
